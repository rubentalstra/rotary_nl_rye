"""scripts/release/google-play.py: the Android app's release on Google Play.

The Android counterpart of app-store-connect.swift: the release lane's calls
to the Google Play Developer API (androidpublisher v3), made with Python's
standard library. The service account's token is a JWT signed RS256 with
openssl, as Google's OAuth 2.0 for service accounts describes; nothing is
installed. The service account's key file is PLAY_SERVICE_ACCOUNT_FILE.

    python3 -I scripts/release/google-play.py check
        The account can reach the app: its tracks and their version codes,
        and the listing's languages. Makes an edit and deletes it.

    python3 -I scripts/release/google-play.py text notes.md
        The release notes as Google Play will show them.

    python3 -I scripts/release/google-play.py upload --bundle app.aab
            --track internal|production --status completed|draft
            --name "14.0.0 (123)" --notes notes.md [--mapping mapping.txt]
        Uploads the bundle (and R8's mapping, for readable crash reports),
        puts it on the track with the notes in every language of the
        listing, and commits the edit. A production release stays a draft
        for the maintainer to roll out in the Play Console.
"""
import argparse
import base64
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

PACKAGE = "com.caelitechnologies.rotary_nl_rye"
API = f"https://androidpublisher.googleapis.com/androidpublisher/v3/applications/{PACKAGE}"
UPLOAD = f"https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications/{PACKAGE}"
SCOPE = "https://www.googleapis.com/auth/androidpublisher"
# Google Play's limit for the release notes of one language.
NOTES_LIMIT = 500


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def access_token() -> str:
    """An OAuth access token for the service account, from a JWT signed with its key."""
    key_file = os.environ.get("PLAY_SERVICE_ACCOUNT_FILE")
    if not key_file:
        sys.exit("PLAY_SERVICE_ACCOUNT_FILE is not set: the path of the service account's JSON key")
    account = json.loads(Path(key_file).read_text())
    now = int(time.time())
    header = b64url(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    claims = b64url(json.dumps({
        "iss": account["client_email"],
        "scope": SCOPE,
        "aud": account["token_uri"],
        "iat": now,
        "exp": now + 3600,
    }).encode())
    signing_input = f"{header}.{claims}".encode()
    # The private key goes to openssl through a file only the owner can read, never on a command line.
    with tempfile.NamedTemporaryFile("w", suffix=".pem", delete=True) as pem:
        os.chmod(pem.name, 0o600)
        pem.write(account["private_key"])
        pem.flush()
        signature = subprocess.run(
            ["openssl", "dgst", "-sha256", "-sign", pem.name],
            input=signing_input, capture_output=True, check=True,
        ).stdout
    assertion = f"{header}.{claims}.{b64url(signature)}"
    body = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": assertion,
    }).encode()
    response = request("POST", account["token_uri"], body, {"Content-Type": "application/x-www-form-urlencoded"}, token=None)
    return response["access_token"]


def request(method: str, url: str, body: bytes | None = None, headers: dict | None = None, token: str | None = "") -> dict:
    headers = dict(headers or {})
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=600) as response:
            text = response.read().decode()
    except urllib.error.HTTPError as error:
        detail = error.read().decode(errors="replace")
        sys.exit(f"{method} {url.split('?')[0]}: HTTP {error.code}\n{detail}")
    return json.loads(text) if text else {}


def call(token: str, method: str, path: str, payload: dict | None = None) -> dict:
    body = json.dumps(payload).encode() if payload is not None else None
    headers = {"Content-Type": "application/json"} if body is not None else {}
    return request(method, f"{API}{path}", body, headers, token)


def play_text(markdown: str) -> str:
    """The changelog's list as Google Play text: "• " items, issue references left out, at most 500 characters."""
    items: list[str] = []
    for line in markdown.splitlines():
        if line.startswith("- "):
            items.append(line[2:])
        elif line.startswith("  ") and items:
            items[-1] += " " + line.strip()
        elif line.strip() and not line.startswith("### "):
            items.append(line.strip())
    items = ["• " + re.sub(r"\s*\(#\d+\)", "", item) for item in items]
    # Whole items while they fit; the first is cut at a word when it alone is too long.
    text = ""
    for item in items:
        candidate = f"{text}\n{item}" if text else item
        if len(candidate) > NOTES_LIMIT:
            break
        text = candidate
    if not text and items:
        text = items[0][:NOTES_LIMIT - 1].rsplit(" ", 1)[0] + "…"
    return text


def check() -> None:
    token = access_token()
    edit = call(token, "POST", "/edits", {})["id"]
    try:
        for track in call(token, "GET", f"/edits/{edit}/tracks").get("tracks", []):
            codes = [code for release in track.get("releases", []) for code in release.get("versionCodes", [])]
            print(f"track {track['track']}: version codes {', '.join(codes) or 'none'}")
        languages = [listing["language"] for listing in call(token, "GET", f"/edits/{edit}/listings").get("listings", [])]
        print(f"listing languages: {', '.join(languages)}")
    finally:
        call(token, "DELETE", f"/edits/{edit}")


def upload(args: argparse.Namespace) -> None:
    notes = play_text(Path(args.notes).read_text())
    if not notes:
        sys.exit(f"{args.notes} has no Android notes")
    token = access_token()
    edit = call(token, "POST", "/edits", {})["id"]
    bundle = request(
        "POST", f"{UPLOAD}/edits/{edit}/bundles?uploadType=media",
        Path(args.bundle).read_bytes(), {"Content-Type": "application/octet-stream"}, token,
    )
    code = bundle["versionCode"]
    print(f"uploaded {args.bundle}: version code {code}")
    if args.mapping:
        request(
            "POST", f"{UPLOAD}/edits/{edit}/apks/{code}/deobfuscationFiles/proguard?uploadType=media",
            Path(args.mapping).read_bytes(), {"Content-Type": "application/octet-stream"}, token,
        )
        print("uploaded R8's mapping")
    languages = [listing["language"] for listing in call(token, "GET", f"/edits/{edit}/listings").get("listings", [])]
    release = {
        "name": args.name,
        "versionCodes": [str(code)],
        "status": args.status,
        # The changelog is in English, as on the App Store: the same notes in every language of the listing.
        "releaseNotes": [{"language": language, "text": notes} for language in languages],
    }
    call(token, "PUT", f"/edits/{edit}/tracks/{args.track}", {"track": args.track, "releases": [release]})
    call(token, "POST", f"/edits/{edit}:commit")
    print(f"{args.name} is on the {args.track} track ({args.status}), with notes in {', '.join(languages)}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("check")
    text = sub.add_parser("text")
    text.add_argument("notes")
    up = sub.add_parser("upload")
    up.add_argument("--bundle", required=True)
    up.add_argument("--track", required=True, choices=["internal", "production"])
    up.add_argument("--status", required=True, choices=["completed", "draft"])
    up.add_argument("--name", required=True)
    up.add_argument("--notes", required=True)
    up.add_argument("--mapping")
    args = parser.parse_args()
    if args.command == "check":
        check()
    elif args.command == "text":
        print(play_text(Path(args.notes).read_text()))
    else:
        upload(args)


if __name__ == "__main__":
    main()
