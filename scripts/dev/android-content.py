"""scripts/dev/android-content.py: the Android app's content, from the iOS app's.

The organisation (people, roles, teams), the About topics and the Rotary clubs'
guides, documents and topics are written once,
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
dutch_only: set[str] = set()


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
    if entry.get("shouldTranslate") is False:
        # Kept in Dutch on purpose on iOS (the programme pages): the same on Android.
        nl = unescape_swift(re.sub(r"\\\((?:String\()?[^)]*\)?\)", "%1$s", swift_literal))
        strings_nl.append((name, nl, comment))
        dutch_only.add(name)
        return name
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

# --- Rotary clubs ---------------------------------------------------------------------
def enum_cases(swift: str) -> list[str]:
    body = swift[swift.index("{", swift.index("public enum")):]
    return re.findall(r"^    case (\w+)$", body, re.M)


def camel(case: str) -> str:
    return case[0].upper() + case[1:]


clubs_dir = src / "RotaryClubs"
(pkg_dir / "clubs").mkdir(parents=True, exist_ok=True)

doc_swift = (clubs_dir / "ClubDocument.swift").read_text()
doc_cases = enum_cases(doc_swift)
doc_titles = {c: (l, cm) for c, l, cm in cases_with_resources(property_body(doc_swift, "title"))}
doc_base = re.search(r'let base = "([^"]+)"', doc_swift).group(1)
url_body = property_body(doc_swift, "url")
doc_paths = dict(re.findall(r'case \.(\w+): "([^"]+)"', url_body))
doc_lines = []
for case in doc_cases:
    literal, comment = doc_titles[case]
    res = add_string(f"club_document_{snake(case)}", literal, comment)
    doc_lines.append(f'    {camel(case)}(R.string.{res}, BASE + "{doc_paths[case]}")')
(pkg_dir / "clubs/ClubDocument.kt").write_text(HEADER + f"""package com.caelitechnologies.rotary_nl_rye.core.clubs

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/**
 * A document for the Rotary clubs that host a student, published as a PDF on
 * rotary.nl. Each is defined once; a guide lists the ones it needs, so a
 * document in several guides is still one document with one link.
 */
enum class ClubDocument(
    @param:StringRes val title: Int,
    val url: String,
) {{
""" + ",\n".join(doc_lines) + """;
}

private const val BASE = \"""" + doc_base + """\"
""")

guide_swift = (clubs_dir / "ClubGuide.swift").read_text()
guide_cases = enum_cases(guide_swift)
guide_titles = {c: (l, cm) for c, l, cm in cases_with_resources(property_body(guide_swift, "title"))}
guide_summaries = {c: (l, cm) for c, l, cm in cases_with_resources(property_body(guide_swift, "summary"))}
docs_body = property_body(guide_swift, "documents")
guide_lines, guide_docs = [], []
for case in guide_cases:
    t = add_string(f"club_guide_{snake(case)}", *guide_titles[case])
    su = add_string(f"club_guide_{snake(case)}_summary", *guide_summaries[case])
    guide_lines.append(f"    {camel(case)}(R.string.{t}, R.string.{su})")
    docs = re.search(rf"case \.{case}:\s*\[(.*?)\]", docs_body, re.S).group(1)
    guide_docs.append(f"            {camel(case)} -> listOf({', '.join('ClubDocument.' + camel(d.strip()[1:]) for d in docs.split(',') if d.strip())})")
(pkg_dir / "clubs/ClubGuide.kt").write_text(HEADER + """package com.caelitechnologies.rotary_nl_rye.core.clubs

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** The documents for one role in a club that hosts a student. */
enum class ClubGuide(
    @param:StringRes val title: Int,
    @param:StringRes val summary: Int,
) {
""" + ",\n".join(guide_lines) + """;

    /** The role's documents, each a reference to the one definition. */
    val documents: List<ClubDocument>
        get() = when (this) {
""" + "\n".join(guide_docs) + """
        }
}
""")

topic_swift = (clubs_dir / "ClubTopic.swift").read_text()
topic_cases = enum_cases(topic_swift)
intro = LSR.search(topic_swift[topic_swift.index("static let introduction"):])
add_string("club_introduction", intro.group(1), unescape_swift(intro.group(2)))
topic_titles = {c: (l, cm) for c, l, cm in cases_with_resources(property_body(topic_swift, "title"))}
para_body = property_body(topic_swift, "paragraphs")
topic_lines = []
for case in topic_cases:
    t = add_string(f"club_topic_{snake(case)}", *topic_titles[case])
    block = re.search(rf"case \.{case}:\s*\[(.*?)\n\s*\]", para_body, re.S).group(1)
    paras = ["R.string." + add_string(f"club_topic_{snake(case)}_{i}", m.group(1), unescape_swift(m.group(2))) for i, m in enumerate(LSR.finditer(block), 1)]
    topic_lines.append(f"    {camel(case)}(\n        title = R.string.{t},\n        paragraphs = listOf({', '.join(paras)}),\n    )")
(pkg_dir / "clubs/ClubTopic.kt").write_text(HEADER + """package com.caelitechnologies.rotary_nl_rye.core.clubs

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** What a Rotary club should know before it hosts a student. */
enum class ClubTopic(
    @param:StringRes val title: Int,
    /** The topic's text, in paragraphs. */
    val paragraphs: List<Int>,
) {
""" + ",\n".join(topic_lines) + """;

    companion object {
        /** The welcome above the topics. */
        @StringRes
        val introduction = R.string.club_introduction
    }
}
""")

# --- Programmes ---------------------------------------------------------------------------
prog_dir = src / "Programmes"
(pkg_dir / "programmes").mkdir(parents=True, exist_ok=True)
prog_swift = (prog_dir / "ExchangeProgramme.swift").read_text()
prog_cases = enum_cases(prog_swift)


def lsr_value(text: str, name: str) -> str:
    m = LSR.search(text)
    return "R.string." + add_string(name, m.group(1), unescape_swift(m.group(2)))


def case_block(body: str, case: str) -> str:
    """The text of `case .x:` up to the next case of the switch."""
    m = re.search(rf"\n\s*case (?:\.\w+, )*\.{case}(?:, \.\w+)*:(.*?)(?=\n\s*case \.|\n\s*}}\n\s*}})", body + "\n        }\n    }", re.S)
    return m.group(1) if m else ""


prog_entries = []
for case in prog_cases:
    n = snake(case)
    f = {}
    for prop in ("title", "tagline", "ageText", "durationText", "signUpText"):
        f[prop] = lsr_value(case_block(property_body(prog_swift, prop), case), f"programme_{n}_{snake(prop)}")
    cost = case_block(property_body(prog_swift, "cost"), case)
    amount = re.search(r'amount: (?:Decimal\(string: "([\d.]+)"\)!|([\d_]+))', cost)
    amount = amount.group(1) or amount.group(2).replace("_", "")
    minimum = "true" in re.search(r"isMinimum: (\w+)", cost).group(1)
    f["cost"] = f'Cost(BigDecimal("{amount}"), isMinimum = {str(minimum).lower()}, note = {lsr_value(cost, f"programme_{n}_cost_note")})'
    about = case_block(property_body(prog_swift, "about"), case)
    f["about"] = "listOf(" + ", ".join("R.string." + add_string(f"programme_{n}_about_{k}", m.group(1), unescape_swift(m.group(2))) for k, m in enumerate(LSR.finditer(about), 1)) + ")"
    hl = case_block(property_body(prog_swift, "highlights"), case)
    hl_title = lsr_value(hl, f"programme_{n}_highlights")
    points = []
    for k, pm in enumerate(re.finditer(r'Point\(systemImage: "([^"]+)", title: (LocalizedStringResource\(.*?\)), text: (nil|LocalizedStringResource\(.*?\))\)\s*,?\n', hl), 1):
        t = lsr_value(pm.group(2), f"programme_{n}_point_{k}")
        tx = "null" if pm.group(3) == "nil" else lsr_value(pm.group(3), f"programme_{n}_point_{k}_text")
        points.append(f'Point(symbol = "{pm.group(1)}", title = {t}, text = {tx})')
    f["highlights"] = f"Highlights({hl_title}, listOf(\n            " + ",\n            ".join(points) + ",\n        ))"
    dest = case_block(property_body(prog_swift, "destinations"), case)
    groups = []
    for k, gm in enumerate(re.finditer(r'DestinationGroup\(name: (LocalizedStringResource\(.*?\)), countries: \[([^\]]*)\]\.map \{ Locale\.Region\(\$0\) \}, note: (nil|LocalizedStringResource\(.*?\))\)', dest), 1):
        nm = lsr_value(gm.group(1), f"programme_{n}_destinations_{k}")
        countries = ", ".join(c.strip() for c in gm.group(2).split(","))
        note = "null" if gm.group(3) == "nil" else lsr_value(gm.group(3), f"programme_{n}_destinations_{k}_note")
        groups.append(f"DestinationGroup({nm}, listOf({countries}), {note})")
    f["destinations"] = "listOf(" + ", ".join(groups) + ")"
    sel = case_block(property_body(prog_swift, "selection"), case)
    f["selection"] = lsr_value(sel, f"programme_{n}_selection") if "LocalizedStringResource" in sel else "null"
    mail = case_block(property_body(prog_swift, "signUpEmail"), case)
    f["signUpEmail"] = re.search(r'"([^"]+)"', mail).group(0)
    prog_entries.append((case, f))

(pkg_dir / "programmes/ExchangeProgramme.kt").write_text(HEADER + """package com.caelitechnologies.rotary_nl_rye.core.programmes

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R
import java.math.BigDecimal

/**
 * An exchange programme of Rotary Youth Exchange Netherlands. Its texts are
 * in Dutch only, on purpose, as on iOS.
 */
enum class ExchangeProgramme(
    @param:StringRes val title: Int,
    /** One line on what the programme is. */
    @param:StringRes val tagline: Int,
    /** The ages that may take part, as a guideline. */
    @param:StringRes val ageText: Int,
    /** How long, or when. */
    @param:StringRes val durationText: Int,
    val cost: Cost,
    /** The programme explained, in paragraphs. */
    val about: List<Int>,
    /** Why to take part, or who the programme suits. */
    val highlights: Highlights,
    /** Where the programme goes; empty for Family to Family. */
    val destinations: List<DestinationGroup>,
    /** How the selection goes, for the programmes that have one. */
    @param:StringRes val selection: Int?,
    /** Where to sign up. */
    val signUpEmail: String,
    /** How signing up goes. */
    @param:StringRes val signUpText: Int,
) {
""" + ",\n".join(
    f"""    {camel(c)}(
        title = {f['title']},
        tagline = {f['tagline']},
        ageText = {f['ageText']},
        durationText = {f['durationText']},
        cost = {f['cost']},
        about = {f['about']},
        highlights = {f['highlights']},
        destinations = {f['destinations']},
        selection = {f['selection']},
        signUpEmail = {f['signUpEmail']},
        signUpText = {f['signUpText']},
    )""" for c, f in prog_entries) + """;

    /** A price in euros; "from" when [isMinimum]. */
    data class Cost(val amount: BigDecimal, val isMinimum: Boolean, @param:StringRes val note: Int)

    /** A heading with points under it. */
    data class Highlights(@param:StringRes val title: Int, val points: List<Point>)

    /** A point: the SF Symbol iOS shows (the app maps it to a Material Symbol), a title and an optional text. */
    data class Point(val symbol: String, @param:StringRes val title: Int, @param:StringRes val text: Int?)

    /** A named group of countries (ISO 3166-1 codes), with an optional note. */
    data class DestinationGroup(@param:StringRes val name: Int, val countries: List<String>, @param:StringRes val note: Int?)
}
""")

promo_swift = (prog_dir / "Promo.swift").read_text()
ep_src = promo_swift[promo_swift.index("enum PodcastEpisode"):promo_swift.index("enum PromoVideo")]
vid_src = promo_swift[promo_swift.index("enum PromoVideo"):]
ep_cases = re.findall(r"^    case (\w+)$", ep_src, re.M)
ep_base = re.search(r'let base = "([^"]+)"', ep_src).group(1)
eps = []
for case in ep_cases:
    number = re.search(rf"case \.{case}: (\d+)", property_body(ep_src, "number")).group(1)
    guests = re.search(rf'case \.{case}: "([^"]+)"', property_body(ep_src, "guests")).group(1)
    summary = lsr_value(case_block(property_body(ep_src, "summary"), case), f"podcast_{snake(case)}_summary")
    path = re.search(rf'case \.{case}: URL\(string: base \+ "([^"]+)"\)', property_body(ep_src, "audioURL")).group(1)
    eps.append(f'    {camel(case)}(number = {number}, guests = {kt_string(guests)}, summary = {summary}, audioUrl = PODCAST + "{path}")')
vid_cases = re.findall(r"^    case (\w+)$", vid_src, re.M)
vid_base = re.search(r'let base = "([^"]+)"', vid_src).group(1)
vids = []
for case in vid_cases:
    title = lsr_value(case_block(property_body(vid_src, "title"), case), f"video_{snake(case)}_title")
    summary = lsr_value(case_block(property_body(vid_src, "summary"), case), f"video_{snake(case)}_summary")
    path = re.search(rf'case \.{case}: URL\(string: base \+ "([^"]+)"\)', property_body(vid_src, "url")).group(1)
    vids.append(f'    {camel(case)}(title = {title}, summary = {summary}, url = VIDEOS + "{path}")')
(pkg_dir / "programmes/Promo.kt").write_text(HEADER + """package com.caelitechnologies.rotary_nl_rye.core.programmes

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** An episode of the Rotary Youth Exchange podcast: host parents tell about their exchange student. */
enum class PodcastEpisode(
    /** The episode's place in the series. */
    val number: Int,
    /** Who speak in it, as their names are written. */
    val guests: String,
    @param:StringRes val summary: Int,
    val audioUrl: String,
) {
""" + ",\n".join(eps) + """;
}

/** A promotional video of Rotary Youth Exchange. */
enum class PromoVideo(
    @param:StringRes val title: Int,
    @param:StringRes val summary: Int,
    val url: String,
) {
""" + ",\n".join(vids) + """;
}

private const val PODCAST = \"""" + ep_base + """\"
private const val VIDEOS = \"""" + vid_base + """\"
""")

# --- strings.xml -------------------------------------------------------------------
def xml(entries, english):
    lines = ['<?xml version="1.0" encoding="utf-8"?>']
    if not english:
        lines.append("<!-- Generated by scripts/dev/android-content.py from RotaryCore (Dutch);\n     values-en/ has the English. Strings marked translatable=\"false\" stay Dutch on purpose\n     (shouldTranslate: false on iOS: the programme pages). Edit the Swift, never this file. -->")
    lines.append('<resources xmlns:tools="http://schemas.android.com/tools" tools:locale="nl">' if not english else "<resources>")
    for name, nl, comment in entries:
        if english and name in dutch_only:
            continue
        text = strings_en[name] if english else nl
        formatted = "%1$s" in text
        attrs = f' description="{comment.replace(chr(34), "&quot;").replace("&", "&amp;")}"' if not english else ""
        if not english and name in dutch_only:
            attrs += ' translatable="false"'
        lines.append(f'    <string name="{name}"{attrs}>{android_escape(text, formatted).replace("&", "&amp;").replace("<", "&lt;")}</string>')
    lines.append("</resources>")
    return "\n".join(lines) + "\n"

(out / "res/values").mkdir(parents=True, exist_ok=True)
(out / "res/values-en").mkdir(parents=True, exist_ok=True)
(out / "res/values/strings.xml").write_text(xml(strings_nl, False))
(out / "res/values-en/strings.xml").write_text(xml(strings_nl, True))
print(f"{count} people, {len(role_cases)} roles, {len(entries)} groups, {len(about_entries)} topics, {len(doc_cases)} club documents, {len(guide_cases)} guides, {len(topic_cases)} club topics, {len(prog_entries)} programmes, {len(eps)} episodes, {len(vids)} videos, {len(strings_nl)} strings ({len(dutch_only)} Dutch only)")
