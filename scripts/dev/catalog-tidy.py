"""scripts/dev/catalog-tidy.py

Called by sync-strings.sh after `xcstringstool sync`, without arguments: it
finds every String Catalog in this repository and the .stringsdata files the
build in build/DerivedData extracted for it, both from its own location, so
it never opens a path it was handed. For each catalog it removes every entry
the compiler did not extract in this build (so text that left the code leaves
the catalog), keeps entries marked "shouldTranslate": false, and writes the
catalog with sorted keys in this repository's JSON style.
"""
import glob
import json
import os
import platform
import sys

ROOT = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", ".."))
INTERMEDIATES = os.path.join(ROOT, "build", "DerivedData", "Build", "Intermediates.noindex")
# Only this Mac's architecture, the one sync-strings.sh built: files from an
# earlier build for another architecture would keep text alive that left the code.
ARCH = platform.machine()


def catalogs():
    """Each catalog with the build folder of its target."""
    yield os.path.join(ROOT, "ios", "RotaryYEP", "Localizable.xcstrings"), os.path.join("RotaryYEP.build", "Debug-iphonesimulator", "RotaryYEP.build")
    for catalog in sorted(glob.glob(os.path.join(ROOT, "ios", "RotaryKit", "Sources", "*", "Localizable.xcstrings"))):
        module = os.path.basename(os.path.dirname(catalog))
        yield catalog, os.path.join("RotaryKit.build", "Debug-iphonesimulator", f"{module}-t.build")


def tidy(catalog, built):
    data = glob.glob(os.path.join(INTERMEDIATES, built, "**", "Objects-normal", ARCH, "*.stringsdata"), recursive=True)
    if not data:
        sys.exit(f"catalog-tidy: no extracted text for {os.path.relpath(catalog, ROOT)} in {built}")

    used = set()
    for path in data:
        with open(path, encoding="utf-8") as f:
            for entries in json.load(f).get("tables", {}).values():
                used.update(entry["key"] for entry in entries)

    with open(catalog, encoding="utf-8") as f:
        d = json.load(f)
    strings = d["strings"]
    unused = sorted(k for k, v in strings.items() if k not in used and v.get("shouldTranslate") is not False)
    # A build that extracted nothing (or far less than before) means the input is
    # wrong, not that the text is gone: change nothing.
    if not used or len(unused) > len(strings) / 4:
        sys.exit(f"catalog-tidy: {len(unused)} of {len(strings)} entries look unused in {catalog}; refusing to remove them")
    for key in unused:
        del strings[key]
        print(f"removed: {key}")
    d["strings"] = dict(sorted(strings.items()))
    with open(catalog, "w", encoding="utf-8") as f:
        f.write(json.dumps(d, indent=2, ensure_ascii=False) + "\n")
    print(f"{len(strings)} strings in {os.path.relpath(catalog, ROOT)}")


for catalog, built in catalogs():
    tidy(catalog, built)
