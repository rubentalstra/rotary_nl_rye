"""scripts/dev/android-content.py: the Android app's content, from the iOS app's.

The organisation (people, roles, teams) and the About topics are written once,
in Swift, in ios/RotaryKit/Sources/RotaryCore. This script reads those sources
and the iOS String Catalog (for the English) and writes the matching Kotlin
files and the Dutch and English strings.xml of android/core. Edit the Swift,
then run it:

    python3 -I scripts/dev/android-content.py

CI runs it and fails when android/core is not in step with the Swift.
"""
import json
import re
import sys
from pathlib import Path

repo = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[2]
src = repo / "ios/RotaryKit/Sources/RotaryCore"
out = repo / "android/core/src/main"
pkg_dir = out / "java/com/caelitechnologies/rotary_nl_rye/core"
catalog = json.loads((src / "Localizable.xcstrings").read_text())["strings"]

strings_nl: list[tuple[str, str, str]] = []  # (name, dutch, description)
strings_en: dict[str, str] = {}


def snake(name: str) -> str:
    return re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()


def catalog_key(swift_literal: str) -> str:
    return re.sub(r"\\\((?:String\()?[^)]*\)?\)", "%@", swift_literal)


def unescape_swift(s: str) -> str:
    return s.replace('\\"', '"').replace("\\n", "\n").replace("\\\\", "\\")


def android_escape(s: str, formatted: bool) -> str:
    s = s.replace("\\", "\\\\").replace("'", "\\'").replace('"', '\\"').replace("\n", "\\n")
    if s.startswith("@") or s.startswith("?"):
        s = "\\" + s
    if not formatted:
        s = s.replace("%", "%%")
    return s


def add_string(name: str, swift_literal: str, comment: str) -> str:
    key = catalog_key(swift_literal)
    entry = catalog.get(key)
    if entry is None:
        raise SystemExit(f"no catalog entry for {key!r}")
    en = entry.get("localizations", {}).get("en", {}).get("stringUnit", {}).get("value")
    if en is None:
        raise SystemExit(f"no English for {key!r}")
    nl = unescape_swift(re.sub(r"\\\((?:String\()?[^)]*\)?\)", "%1$s", swift_literal))
    en = en.replace("%@", "%1$s").replace("%lld", "%1$s")
    strings_nl.append((name, nl, comment))
    strings_en[name] = en
    return name


LSR = re.compile(r'LocalizedStringResource\(\s*"((?:[^"\\]|\\.)*)",\s*bundle: #bundle,\s*comment: "((?:[^"\\]|\\.)*)"\s*\)', re.S)


def cases_with_resources(body: str) -> list[tuple[str, str | None, str | None]]:
    """(case, literal, comment) for each `case .x: LocalizedStringResource(...)` or `case .x: nil`."""
    result = []
    for m in re.finditer(r"case \.(\w+)(?:\(let \w+\))?:\s*(nil|LocalizedStringResource\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))", body):
        if m.group(2) == "nil":
            result.append((m.group(1), None, None))
        else:
            r = LSR.search(m.group(2))
            result.append((m.group(1), r.group(1), unescape_swift(r.group(2))))
    return result


def property_body(swift: str, name: str) -> str:
    start = swift.index(f"var {name}:")
    depth, i = 0, swift.index("{", start)
    for j in range(i, len(swift)):
        if swift[j] == "{":
            depth += 1
        elif swift[j] == "}":
            depth -= 1
            if depth == 0:
                return swift[i:j]
    raise SystemExit(name)


def kt_string(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n").replace("$", "\\$") + '"'


HEADER = "// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:\n// edit the Swift and run the script, never this file.\n"

# --- Role -------------------------------------------------------------------
role_swift = (src / "Organisation/Role.swift").read_text()
role_cases = cases_with_resources(property_body(role_swift, "title"))
role_lines = []
for case, literal, comment in role_cases:
    res = add_string(f"role_{snake(case)}", literal, comment)
    obj = case[0].upper() + case[1:]
    if case == "districtYouthCommissioner":
        role_lines.append(f'''    /** DJC: the youth commissioner of one Rotary district. */
    data class DistrictYouthCommissioner(val district: Int) : Role {{
        override val title get() = R.string.{res}
        // The district number is an identifier, never formatted as a number.
        override val titleArgs get() = listOf<Any>(district.toString())
    }}''')
    else:
        role_lines.append(f"    data object {obj} : Role {{ override val title get() = R.string.{res} }}")
(pkg_dir / "organisation").mkdir(parents=True, exist_ok=True)
(pkg_dir / "organisation/Role.kt").write_text(HEADER + '''package com.caelitechnologies.rotary_nl_rye.core.organisation

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/**
 * What someone does for Rotary Youth Exchange Netherlands. A closed set, so
 * each title is written once and translated once in the string resources.
 */
sealed interface Role {
    /** The title, a string resource; [titleArgs] fill its placeholders. */
    @get:StringRes
    val title: Int
    val titleArgs: List<Any> get() = emptyList()

''' + "\n".join(role_lines) + "\n}\n")

# --- People ------------------------------------------------------------------
PERSON = re.compile(r"static let (\w+) = Person\((.*?)\n    \)", re.S)
FIELD = lambda body, f: (m.group(1) if (m := re.search(rf'\n\s+{f}: "((?:[^"\\]|\\.)*)"', body)) else None)
people_files = {
    "Person+MDJC.swift": ("PeopleMdjc.kt", "The members of the MDJC, the Multi-District Youth Committee. A person in more than one team is defined in the first team they belong to and referenced by the others (`ContactGroup.members`)."),
    "Person+LongTerm.swift": ("PeopleLongTerm.kt", "The members of the Long Term Exchange team who are not in the MDJC."),
    "Person+ShortTerm.swift": ("PeopleShortTerm.kt", "The members of the Short Term Exchange team who are in no team before it."),
    "Person+ROTEX.swift": ("PeopleRotex.kt", "The members of ROTEX, the association of returned exchange students."),
    "Person+Confidants.swift": ("PeopleConfidants.kt", "The independent confidants: not part of Rotary and not in the Contact tab, so they are defined here with the emergency group they belong to."),
}
count = 0
for swift_name, (kt_name, doc) in people_files.items():
    swift = (src / "Organisation" / swift_name).read_text()
    blocks = []
    for m in PERSON.finditer(swift):
        var, body = m.group(1), m.group(2)
        given = re.search(r'givenName: "([^"]*)"', body).group(1)
        family = re.search(r'familyName: "([^"]*)"', body).group(1)
        roles = []
        for r in re.search(r"roles: \[(.*?)\]", body).group(1).split(","):
            r = r.strip()
            if not r:
                continue
            d = re.match(r"\.districtYouthCommissioner\(district: (\d+)\)", r)
            roles.append(f"Role.DistrictYouthCommissioner({d.group(1)})" if d else "Role." + r[1].upper() + r[2:])
        url = re.search(r'photoURL: URL\(string: "([^"]*)"\)', body)
        args = [f"name = PersonName({kt_string(given)}, {kt_string(family)})", f"roles = listOf({', '.join(roles)})"]
        for f in ("phone", "email", "club", "district"):
            v = FIELD(body, f)
            if v is not None:
                args.append(f"{f} = {kt_string(unescape_swift(v))}")
        if url:
            args.append(f"photoUrl = {kt_string(url.group(1))}")
        bio = FIELD(body, "bio")
        if bio is not None:
            args.append(f"bio = {kt_string(unescape_swift(bio))}")
        blocks.append(f"internal val {var} = Person(\n" + "".join(f"    {a},\n" for a in args) + ")")
        count += 1
    (pkg_dir / "organisation" / kt_name).write_text(HEADER + "package com.caelitechnologies.rotary_nl_rye.core.organisation\n\n/*\n * " + doc + "\n */\n\n" + "\n\n".join(blocks) + "\n")

# --- ContactGroup --------------------------------------------------------------
cg_swift = (src / "Organisation/ContactGroup.swift").read_text()
names = cases_with_resources(property_body(cg_swift, "name"))
summaries = {c: (l, cm) for c, l, cm in cases_with_resources(property_body(cg_swift, "summary"))}
members_body = property_body(cg_swift, "members")
entries = []
for case, literal, comment in names:
    n = add_string(f"group_{snake(case)}", literal, comment)
    sl, sc = summaries[case]
    s = f"R.string.{add_string(f'group_{snake(case)}_summary', sl, sc)}" if sl else "null"
    members = re.search(rf"case \.{case}:(?:\s*//[^\n]*)?\s*\[(.*?)\]", members_body, re.S).group(1)
    member_list = ", ".join(m.strip()[1:] for m in members.split(",") if m.strip())
    entries.append((case, n, s, member_list))
cg_kt = HEADER + '''package com.caelitechnologies.rotary_nl_rye.core.organisation

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/**
 * A group of people under one heading: a team in the Contact tab, or a group
 * in the Emergency tab. Members are references to [Person] values, so a
 * person in two groups is still one person with one phone number.
 */
enum class ContactGroup(
    @param:StringRes val title: Int,
    @param:StringRes val summary: Int?,
) {
''' + "".join(f"    {c[0].upper() + c[1:]}(R.string.{n}, {s}),\n" for c, n, s, _ in entries).rstrip(",\n") + ''';

    /** The people in the group, in the order it shows them. */
    val members: List<Person>
        get() = when (this) {
''' + "".join(f"            {c[0].upper() + c[1:]} -> listOf({m})\n" for c, _, _, m in entries) + '''        }

    companion object {
        /** The teams of Rotary Youth Exchange Netherlands, in the order the Contact tab shows them. */
        val teams = listOf(Mdjc, LongTerm, ShortTerm, Rotex)

        /** Who to call in an emergency, in the order the Emergency tab shows them. */
        val emergencyGroups = listOf(Emergency, Confidants)
    }
}
'''
(pkg_dir / "organisation/ContactGroup.kt").write_text(cg_kt)

# --- AboutTopic ------------------------------------------------------------------
about_swift = (src / "About/AboutTopic.swift").read_text()
motto = LSR.search(about_swift[about_swift.index("static let motto"):])
add_string("about_motto", motto.group(1), unescape_swift(motto.group(2)))
titles = cases_with_resources(property_body(about_swift, "title"))
bodies_src = property_body(about_swift, "body")
points_src = property_body(about_swift, "points")
about_entries = []
for case, literal, comment in titles:
    t = add_string(f"about_{snake(case)}_title", literal, comment)
    b = re.search(rf"case \.{case}:\s*LocalizedStringResource\((.*?)\n\s*\)", bodies_src, re.S)
    body_res = "null"
    if b:
        r = LSR.search("LocalizedStringResource(" + b.group(1) + ")")
        body_res = "R.string." + add_string(f"about_{snake(case)}_body", r.group(1), unescape_swift(r.group(2)))
    p = re.search(rf"case \.{case}:\s*\[(.*?)\n\s*\]", points_src, re.S)
    points = []
    if p:
        for i, r in enumerate(LSR.finditer(p.group(1)), 1):
            points.append("R.string." + add_string(f"about_{snake(case)}_point_{i}", r.group(1), unescape_swift(r.group(2))))
    about_entries.append((case, t, body_res, points))
(pkg_dir / "about").mkdir(parents=True, exist_ok=True)
(pkg_dir / "about/AboutTopic.kt").write_text(HEADER + '''package com.caelitechnologies.rotary_nl_rye.core.about

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** A topic of the About tab: what Rotary Youth Exchange is and stands for. */
enum class AboutTopic(
    @param:StringRes val title: Int,
    @param:StringRes val body: Int?,
    val points: List<Int>,
) {
''' + ",\n".join(f"    {c[0].upper() + c[1:]}(\n        title = R.string.{t},\n        body = {b},\n        points = listOf({', '.join(p)}),\n    )" for c, t, b, p in about_entries) + ''';

    companion object {
        /** Rotary Youth Exchange's motto, shown under the topics. */
        @StringRes
        val motto = R.string.about_motto
    }
}
''')

# --- strings.xml -------------------------------------------------------------------
def xml(entries, english):
    lines = ['<?xml version="1.0" encoding="utf-8"?>']
    if not english:
        lines.append("<!-- Generated by scripts/dev/android-content.py from RotaryCore (Dutch);\n     values-en/ has the English. Edit the Swift, never this file. -->")
    lines.append('<resources xmlns:tools="http://schemas.android.com/tools" tools:locale="nl">' if not english else "<resources>")
    for name, nl, comment in entries:
        text = strings_en[name] if english else nl
        formatted = "%1$s" in text
        attrs = f' description="{comment.replace(chr(34), "&quot;").replace("&", "&amp;")}"' if not english else ""
        lines.append(f'    <string name="{name}"{attrs}>{android_escape(text, formatted).replace("&", "&amp;").replace("<", "&lt;")}</string>')
    lines.append("</resources>")
    return "\n".join(lines) + "\n"

(out / "res/values").mkdir(parents=True, exist_ok=True)
(out / "res/values-en").mkdir(parents=True, exist_ok=True)
(out / "res/values/strings.xml").write_text(xml(strings_nl, False))
(out / "res/values-en/strings.xml").write_text(xml(strings_nl, True))
print(f"{count} people, {len(role_cases)} roles, {len(entries)} groups, {len(about_entries)} topics, {len(strings_nl)} strings")
