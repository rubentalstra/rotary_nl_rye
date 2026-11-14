public import Foundation

/// The pages for Dutch students who want to go abroad, as v13 wrote them
/// (in Dutch), per programme: the year exchange, the summer camps and
/// Family to Family.
public enum OutboundGuide: CaseIterable, Identifiable, Hashable, Sendable {
    case signUp
    case requirements
    case selectionDay
    case selectionWeekend
    case topThree
    case campsAbout
    case campsWho
    case campsCountries
    case campsSignUp
    case familyAbout
    case familyRequirements
    case countryPreference
    case familySignUp

    public var id: Self { self }

    public var title: LocalizedStringResource {
        switch self {
        case .signUp: LocalizedStringResource("Hoe meld ik me aan?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .requirements: LocalizedStringResource("Waar moet ik aan voldoen?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .selectionDay: LocalizedStringResource("Selectiedag", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .selectionWeekend: LocalizedStringResource("Selectieweekend", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .topThree: LocalizedStringResource("Een goede top 3 van landen", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .campsAbout: LocalizedStringResource("Wat zijn zomerkampen?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .campsWho: LocalizedStringResource("Voor wie?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .campsCountries: LocalizedStringResource("Met welke landen?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .campsSignUp: LocalizedStringResource("Hoe schrijf ik mezelf in?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .familyAbout: LocalizedStringResource("Wat is Family to Family?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .familyRequirements: LocalizedStringResource("Waar moet ik aan voldoen?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .countryPreference: LocalizedStringResource("Landenvoorkeur", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        case .familySignUp: LocalizedStringResource("Hoe schrijf ik mezelf in?", bundle: #bundle, comment: "OutboundGuide: the title of a page.")
        }
    }

    /// One line on what the page tells.
    public var subtitle: LocalizedStringResource {
        switch self {
        case .signUp: LocalizedStringResource("Volledige aanmeldprocedure en vereisten", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .requirements: LocalizedStringResource("Regels en richtlijnen voor uitwisselingsstudenten", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .selectionDay: LocalizedStringResource("Wat je kunt verwachten tijdens het selectieproces", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .selectionWeekend: LocalizedStringResource("Activiteiten en verwachtingen van het selectieweekend", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .topThree: LocalizedStringResource("Hoe kies je jouw voorkeursbestemmingen", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .campsAbout: LocalizedStringResource("Andere culturen beleven in de zomervakantie", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .campsWho: LocalizedStringResource("Leeftijd en wie er mee kan doen", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .campsCountries: LocalizedStringResource("De bestemmingen en soorten kampen", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .campsSignUp: LocalizedStringResource("Aanmelden voor een zomerkamp", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .familyAbout: LocalizedStringResource("Verblijven bij een gastgezin in het buitenland", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .familyRequirements: LocalizedStringResource("Wie geschikt is voor Family to Family", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .countryPreference: LocalizedStringResource("Je voorkeursbestemmingen kiezen", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        case .familySignUp: LocalizedStringResource("Aanmelden voor Family to Family", bundle: #bundle, comment: "OutboundGuide: what a page tells, under its title in the list.")
        }
    }

    public var systemImage: String {
        switch self {
        case .signUp: "envelope"
        case .requirements: "checkmark.seal"
        case .selectionDay: "person.2"
        case .selectionWeekend: "tent.2"
        case .topThree: "globe.europe.africa"
        case .campsAbout: "sun.max"
        case .campsWho: "person.3"
        case .campsCountries: "globe"
        case .campsSignUp: "envelope"
        case .familyAbout: "house"
        case .familyRequirements: "checkmark.seal"
        case .countryPreference: "map"
        case .familySignUp: "envelope"
        }
    }

    public var sections: [GuideSection] {
        switch self {
        case .signUp:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("Je stuurt een gezellig e-mailbericht naar interesse@rotaryyep.nl. Dan krijg je van ons een bevestiging dat we je mail hebben ontvangen.", bundle: #bundle, comment: "OutboundGuide signUp: a paragraph.")),
                    .mail(address: "interesse@rotaryyep.nl", subject: "Interesse in lange termijn uitwisseling"),
                ]),
            ]
        case .requirements:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("Zit je op het vmbo, de havo of het vwo, dan kun je na selectie voor deze uitwisseling in aanmerking komen. Je hebt wel een Rotaryclub nodig die jou wil voordragen: een support club. Dat betekent niet dat de club jouw kosten betaalt, maar de club is verantwoordelijk voor de ontvangst van een jaarkind uit het buitenland. Als jij weggaat, komt er ook een buitenlandse scholier terug.", bundle: #bundle, comment: "OutboundGuide requirements: a paragraph.")),
                    .text(LocalizedStringResource("Een diploma is geen vereiste om je op te geven; je kunt ook je schoolprogramma onderbreken. Soms is dat zelfs een voordeel. In het buitenland worden namelijk vaak strenge leeftijdsgrenzen gesteld om tot een school te worden toegelaten. En om deel te kunnen nemen aan de schoolsporten is het soms beter om nog geen diploma te hebben.", bundle: #bundle, comment: "OutboundGuide requirements: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("In het kort", bundle: #bundle, comment: "OutboundGuide requirements: a section heading."), [
                    .fact(systemImage: "person", title: LocalizedStringResource("Leeftijd", bundle: #bundle, comment: "OutboundGuide requirements: what a fact is about."), value: LocalizedStringResource("15 tot 18 jaar", bundle: #bundle, comment: "OutboundGuide requirements: the fact.")),
                    .fact(systemImage: "graduationcap", title: LocalizedStringResource("Opleiding", bundle: #bundle, comment: "OutboundGuide requirements: what a fact is about."), value: LocalizedStringResource("Vmbo, havo of vwo", bundle: #bundle, comment: "OutboundGuide requirements: the fact.")),
                    .fact(systemImage: "person.3", title: LocalizedStringResource("Support club", bundle: #bundle, comment: "OutboundGuide requirements: what a fact is about."), value: LocalizedStringResource("Een Rotaryclub die je voordraagt", bundle: #bundle, comment: "OutboundGuide requirements: the fact.")),
                    .note(LocalizedStringResource("Dit zijn indicatieve leeftijdsgrenzen voor overheidsscholen. Soms is enige flexibiliteit mogelijk.", bundle: #bundle, comment: "OutboundGuide requirements: a remark.")),
                ]),
            ]
        case .selectionDay:
            [
                GuideSection(LocalizedStringResource("Wat moet ik doen voor de selectiedag?", bundle: #bundle, comment: "OutboundGuide selectionDay: a section heading."), [
                    .text(LocalizedStringResource("Gewoon je best doen en jezelf zijn.", bundle: #bundle, comment: "OutboundGuide selectionDay: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("Wat kun je deze dag verwachten?", bundle: #bundle, comment: "OutboundGuide selectionDay: a section heading."), [
                    .point(systemImage: "bubble.left.and.bubble.right", title: nil, text: LocalizedStringResource("Je krijgt een interview, een groepsgesprek, een discussie en een test over je kennis van Nederland.", bundle: #bundle, comment: "OutboundGuide selectionDay: a point explained.")),
                    .text(LocalizedStringResource("Dit zijn een paar voorbeeldvragen uit het interview tijdens de selectiedag. We gaan je niet alles vertellen, maar zo krijg je een beetje een idee.", bundle: #bundle, comment: "OutboundGuide selectionDay: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("Voorbeeldvragen", bundle: #bundle, comment: "OutboundGuide selectionDay: a section heading."), [
                    .question(LocalizedStringResource("Wat betekent volgens jou het zijn van ambassadeur voor Rotary?", bundle: #bundle, comment: "OutboundGuide selectionDay: an example question of the selection day interview.")),
                    .question(LocalizedStringResource("Wie is je rolmodel, voor wie heb je bewondering?", bundle: #bundle, comment: "OutboundGuide selectionDay: an example question of the selection day interview.")),
                    .question(LocalizedStringResource("Wat was de gelukkigste of mooiste dag in je leven?", bundle: #bundle, comment: "OutboundGuide selectionDay: an example question of the selection day interview.")),
                    .question(LocalizedStringResource("Op welke eigenschap ben je het meest trots?", bundle: #bundle, comment: "OutboundGuide selectionDay: an example question of the selection day interview.")),
                    .question(LocalizedStringResource("Wat denk je dat het moeilijkste is als je een jaar in het buitenland bent?", bundle: #bundle, comment: "OutboundGuide selectionDay: an example question of the selection day interview.")),
                ]),
            ]
        case .selectionWeekend:
            [
                GuideSection(LocalizedStringResource("Het weekend dient een aantal doelen", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a section heading."), [
                    .step(title: LocalizedStringResource("Elkaar beter leren kennen", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a step or tip."), text: LocalizedStringResource("De groep leert elkaar beter kennen en wij leren jullie beter kennen. Zo kunnen wij beter inschatten waar jullie als toekomstige outbounds naartoe zouden kunnen gaan.", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a step or tip explained.")),
                    .step(title: LocalizedStringResource("Jezelf presenteren", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a step or tip."), text: nil),
                    .step(title: LocalizedStringResource("Je top drie van landen", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a step or tip."), text: LocalizedStringResource("Je oriënteren op een top drie van landen waarnaar je het liefst wilt worden uitgezonden, zowel internationaal als Europees.", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a step or tip explained.")),
                    .step(title: LocalizedStringResource("Selectie", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a step or tip."), text: LocalizedStringResource("Je kunt laten zien dat je uit het goede uitwisselingshout bent gesneden. Aanwezigheid is verplicht: het weekend is onderdeel van de uiteindelijke selectie.", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a step or tip explained.")),
                ]),
                GuideSection(LocalizedStringResource("Belangrijk om te weten", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a section heading."), [
                    .point(systemImage: "envelope.badge", title: nil, text: LocalizedStringResource("Je krijgt een mail van ons voor het weekend, waarin staat wat je moet meenemen en wat je moet voorbereiden. Het is altijd een topweekend.", bundle: #bundle, comment: "OutboundGuide selectionWeekend: a point explained.")),
                ]),
            ]
        case .topThree:
            [
                GuideSection(LocalizedStringResource("Tips voor een goede keuze", bundle: #bundle, comment: "OutboundGuide topThree: a section heading."), [
                    .step(title: nil, text: LocalizedStringResource("Lees in deze app de verhalen van uitwisselingsstudenten.", bundle: #bundle, comment: "OutboundGuide topThree: a step or tip explained.")),
                    .step(title: nil, text: LocalizedStringResource("Kijk op YouTube en zoek op \"Rotary Youth Exchange\"; dan kom je ook heel veel te weten.", bundle: #bundle, comment: "OutboundGuide topThree: a step or tip explained.")),
                    .step(title: nil, text: LocalizedStringResource("Praat met voormalige uitwisselingsstudenten over hun ervaringen in verschillende landen.", bundle: #bundle, comment: "OutboundGuide topThree: a step or tip explained.")),
                ]),
            ]
        case .campsAbout:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("Rotary-zomerkampen zijn korte uitwisselingsprogramma's die meestal 2 tot 6 weken duren, in de schoolvakanties. Je beleeft andere culturen, sluit internationale vriendschappen en doet mee aan spannende activiteiten, terwijl je bij gastgezinnen of in georganiseerde accommodaties verblijft.", bundle: #bundle, comment: "OutboundGuide campsAbout: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("In het kort", bundle: #bundle, comment: "OutboundGuide campsAbout: a section heading."), [
                    .fact(systemImage: "calendar", title: LocalizedStringResource("Duur", bundle: #bundle, comment: "OutboundGuide campsAbout: what a fact is about."), value: LocalizedStringResource("2 tot 6 weken", bundle: #bundle, comment: "OutboundGuide campsAbout: the fact.")),
                    .fact(systemImage: "person", title: LocalizedStringResource("Leeftijd", bundle: #bundle, comment: "OutboundGuide campsAbout: what a fact is about."), value: LocalizedStringResource("15 tot 21 jaar", bundle: #bundle, comment: "OutboundGuide campsAbout: the fact.")),
                    .fact(systemImage: "sun.max", title: LocalizedStringResource("Wanneer", bundle: #bundle, comment: "OutboundGuide campsAbout: what a fact is about."), value: LocalizedStringResource("In de schoolvakanties", bundle: #bundle, comment: "OutboundGuide campsAbout: the fact.")),
                ]),
            ]
        case .campsWho:
            [
                GuideSection(LocalizedStringResource("Leeftijd", bundle: #bundle, comment: "OutboundGuide campsWho: a section heading."), [
                    .point(systemImage: "person", title: LocalizedStringResource("15 tot 21 jaar", bundle: #bundle, comment: "OutboundGuide campsWho: a point."), text: LocalizedStringResource("De perfecte leeftijd voor internationale ervaringen en persoonlijke groei.", bundle: #bundle, comment: "OutboundGuide campsWho: a point explained.")),
                ]),
                GuideSection(LocalizedStringResource("Wie kan deelnemen?", bundle: #bundle, comment: "OutboundGuide campsWho: a section heading."), [
                    .point(systemImage: "person.2", title: LocalizedStringResource("Rotary-families", bundle: #bundle, comment: "OutboundGuide campsWho: a point."), text: LocalizedStringResource("Kinderen en kleinkinderen van Rotary-leden.", bundle: #bundle, comment: "OutboundGuide campsWho: a point explained.")),
                    .point(systemImage: "heart", title: LocalizedStringResource("Ook zonder Rotary", bundle: #bundle, comment: "OutboundGuide campsWho: a point."), text: LocalizedStringResource("Alle gemotiveerde jongeren uit de gemeenschap.", bundle: #bundle, comment: "OutboundGuide campsWho: a point explained.")),
                ]),
                GuideSection(LocalizedStringResource("Wat kun je verwachten?", bundle: #bundle, comment: "OutboundGuide campsWho: a section heading."), [
                    .point(systemImage: "globe", title: LocalizedStringResource("Internationale ervaring", bundle: #bundle, comment: "OutboundGuide campsWho: a point."), text: LocalizedStringResource("Ontdek nieuwe culturen en maak vrienden over de hele wereld.", bundle: #bundle, comment: "OutboundGuide campsWho: a point explained.")),
                    .point(systemImage: "figure.walk", title: LocalizedStringResource("Persoonlijke ontwikkeling", bundle: #bundle, comment: "OutboundGuide campsWho: a point."), text: LocalizedStringResource("Ontwikkel zelfvertrouwen en leiderschapsvaardigheden.", bundle: #bundle, comment: "OutboundGuide campsWho: a point explained.")),
                    .point(systemImage: "camera", title: LocalizedStringResource("Onvergetelijke herinneringen", bundle: #bundle, comment: "OutboundGuide campsWho: a point."), text: LocalizedStringResource("Herinneringen voor het leven en verhalen om te delen.", bundle: #bundle, comment: "OutboundGuide campsWho: a point explained.")),
                ]),
            ]
        case .campsCountries:
            [
                GuideSection(LocalizedStringResource("Bestemmingen", bundle: #bundle, comment: "OutboundGuide campsCountries: a section heading."), [
                    .point(systemImage: "flag", title: LocalizedStringResource("Europa", bundle: #bundle, comment: "OutboundGuide campsCountries: a point."), text: LocalizedStringResource("Verschillende Europese landen met een rijke cultuur en geschiedenis.", bundle: #bundle, comment: "OutboundGuide campsCountries: a point explained.")),
                    .point(systemImage: "flag", title: LocalizedStringResource("Canada", bundle: #bundle, comment: "OutboundGuide campsCountries: a point."), text: LocalizedStringResource("Prachtige natuur en een vriendelijke cultuur in Noord-Amerika.", bundle: #bundle, comment: "OutboundGuide campsCountries: a point explained.")),
                    .point(systemImage: "flag", title: LocalizedStringResource("Verenigde Staten", bundle: #bundle, comment: "OutboundGuide campsCountries: a point."), text: LocalizedStringResource("Verschillende staten met elk hun eigen ervaringen en cultuur.", bundle: #bundle, comment: "OutboundGuide campsCountries: a point explained.")),
                    .point(systemImage: "flag", title: LocalizedStringResource("Taiwan", bundle: #bundle, comment: "OutboundGuide campsCountries: a point."), text: LocalizedStringResource("Een fascinerende Aziatische cultuur en moderne technologie.", bundle: #bundle, comment: "OutboundGuide campsCountries: a point explained.")),
                ]),
                GuideSection(LocalizedStringResource("Soorten kampen", bundle: #bundle, comment: "OutboundGuide campsCountries: a section heading."), [
                    .point(systemImage: "book", title: LocalizedStringResource("Educatieve tours", bundle: #bundle, comment: "OutboundGuide campsCountries: a point."), text: LocalizedStringResource("Leren over geschiedenis, cultuur en taal.", bundle: #bundle, comment: "OutboundGuide campsCountries: a point explained.")),
                    .point(systemImage: "mountain.2", title: LocalizedStringResource("Avonturenkampen", bundle: #bundle, comment: "OutboundGuide campsCountries: a point."), text: LocalizedStringResource("Buitenactiviteiten en de natuur verkennen.", bundle: #bundle, comment: "OutboundGuide campsCountries: a point explained.")),
                    .point(systemImage: "person.2", title: LocalizedStringResource("Culturele uitwisseling", bundle: #bundle, comment: "OutboundGuide campsCountries: a point."), text: LocalizedStringResource("Onderdompeling in lokale gewoonten en tradities.", bundle: #bundle, comment: "OutboundGuide campsCountries: a point explained.")),
                ]),
            ]
        case .campsSignUp:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("Je stuurt een gezellig e-mailbericht naar zomerkamp@rotaryyep.nl. Dan krijg je van ons een bevestiging dat we je mail hebben ontvangen.", bundle: #bundle, comment: "OutboundGuide campsSignUp: a paragraph.")),
                    .mail(address: "zomerkamp@rotaryyep.nl", subject: "Interesse in een zomerkamp"),
                ]),
            ]
        case .familyAbout:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("Het Family to Family programma biedt jongeren de mogelijkheid om het leven in een andere cultuur te ervaren door een paar weken bij een gastgezin te verblijven. Je dompelt je helemaal onder in het dagelijkse leven, de lokale gewoonten en de familietradities.", bundle: #bundle, comment: "OutboundGuide familyAbout: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("In het kort", bundle: #bundle, comment: "OutboundGuide familyAbout: a section heading."), [
                    .fact(systemImage: "calendar", title: LocalizedStringResource("Duur", bundle: #bundle, comment: "OutboundGuide familyAbout: what a fact is about."), value: LocalizedStringResource("2 tot 6 weken", bundle: #bundle, comment: "OutboundGuide familyAbout: the fact.")),
                    .fact(systemImage: "person", title: LocalizedStringResource("Leeftijd", bundle: #bundle, comment: "OutboundGuide familyAbout: what a fact is about."), value: LocalizedStringResource("15 tot 19 jaar", bundle: #bundle, comment: "OutboundGuide familyAbout: the fact.")),
                    .fact(systemImage: "house", title: LocalizedStringResource("Onderdak", bundle: #bundle, comment: "OutboundGuide familyAbout: what a fact is about."), value: LocalizedStringResource("Bij gastgezinnen", bundle: #bundle, comment: "OutboundGuide familyAbout: the fact.")),
                ]),
            ]
        case .familyRequirements:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("Alle jongens en meisjes van 15 tot en met 19 jaar die openstaan voor anderen, van hen willen leren, met hen ervaringen willen uitwisselen, uit hun eigen vertrouwde omgeving willen stappen en anderen zonder vooroordelen willen ontmoeten, zijn geschikt om aan dit programma deel te nemen.", bundle: #bundle, comment: "OutboundGuide familyRequirements: a paragraph.")),
                    .fact(systemImage: "person", title: LocalizedStringResource("Leeftijd", bundle: #bundle, comment: "OutboundGuide familyRequirements: what a fact is about."), value: LocalizedStringResource("15 tot en met 19 jaar", bundle: #bundle, comment: "OutboundGuide familyRequirements: the fact.")),
                ]),
            ]
        case .countryPreference:
            [
                GuideSection(LocalizedStringResource("Hoe kies je je voorkeur?", bundle: #bundle, comment: "OutboundGuide countryPreference: a section heading."), [
                    .text(LocalizedStringResource("Als je mee wilt doen aan het Family to Family programma, geef je op of je voor het noordelijk of zuidelijk halfrond gaat. Bij de landenkeuze geef je drie landen op twee continenten op. Hierbij gelden de Verenigde Staten en Canada als één bestemming. De reden hiervoor is dat we niet alle kandidaten in de VS en Canada kunnen plaatsen. Daarbij komt dat als jij de juiste instelling hebt voor een Family to Family uitwisseling, het uiteindelijk niet uitmaakt naar welk land je gaat.", bundle: #bundle, comment: "OutboundGuide countryPreference: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("Europa", bundle: #bundle, comment: "OutboundGuide countryPreference: a section heading."), [
                    .text(LocalizedStringResource("Binnen Europa, ook al ligt dit naast de deur, vinden de mooiste uitwisselingen plaats en ontstaan de mooiste vriendschappen, met het voordeel dat je deze vrienden makkelijker kunt herbezoeken. De reiskosten zijn veel lager.", bundle: #bundle, comment: "OutboundGuide countryPreference: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("Tips voor een goede keuze", bundle: #bundle, comment: "OutboundGuide countryPreference: a section heading."), [
                    .step(title: LocalizedStringResource("Taal", bundle: #bundle, comment: "OutboundGuide countryPreference: a step or tip."), text: LocalizedStringResource("Overweeg landen waar je de taal spreekt of wilt leren.", bundle: #bundle, comment: "OutboundGuide countryPreference: a step or tip explained.")),
                    .step(title: LocalizedStringResource("Cultuur", bundle: #bundle, comment: "OutboundGuide countryPreference: a step or tip."), text: LocalizedStringResource("Kies landen waarvan de cultuur en geschiedenis je echt interesseren.", bundle: #bundle, comment: "OutboundGuide countryPreference: a step or tip explained.")),
                    .step(title: LocalizedStringResource("Reiskosten", bundle: #bundle, comment: "OutboundGuide countryPreference: a step or tip."), text: LocalizedStringResource("Houd rekening met reiskosten en afstand, vooral bij kortere programma's.", bundle: #bundle, comment: "OutboundGuide countryPreference: a step or tip explained.")),
                ]),
            ]
        case .familySignUp:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("Je stuurt een gezellig e-mailbericht naar interesse@rotaryyep.nl. Dan krijg je van ons een bevestiging dat we je mail hebben ontvangen.", bundle: #bundle, comment: "OutboundGuide familySignUp: a paragraph.")),
                    .mail(address: "interesse@rotaryyep.nl", subject: "Interesse in Family to Family"),
                ]),
            ]
        }
    }
}
