public import Foundation

/// An exchange programme of Rotary Youth Exchange Netherlands.
public enum ExchangeProgramme: CaseIterable, Identifiable, Hashable, Sendable {
    case longTerm
    case familyToFamily
    case summerCamps

    public var id: Self { self }

    public var title: LocalizedStringResource {
        switch self {
        case .longTerm: LocalizedStringResource("Long Term Exchange", bundle: #bundle, comment: "Programmes: the year exchange's name.")
        case .familyToFamily: LocalizedStringResource("Family to Family", bundle: #bundle, comment: "Programmes: the short exchange between two families.")
        case .summerCamps: LocalizedStringResource("Zomerkampen", bundle: #bundle, comment: "Programmes: summer camps abroad.")
        }
    }

    /// One line on what the programme is.
    public var tagline: LocalizedStringResource {
        switch self {
        case .longTerm: LocalizedStringResource("Een schooljaar op een high school in het buitenland", bundle: #bundle, comment: "Programmes: the year exchange in one line.")
        case .familyToFamily: LocalizedStringResource("Een korte uitwisseling met een leeftijdgenoot en zijn of haar gezin", bundle: #bundle, comment: "Programmes: Family to Family in one line.")
        case .summerCamps: LocalizedStringResource("Internationale themakampen in de zomer", bundle: #bundle, comment: "Programmes: summer camps in one line.")
        }
    }

    public var systemImage: String {
        switch self {
        case .longTerm: "graduationcap"
        case .familyToFamily: "figure.2.and.child.holdinghands"
        case .summerCamps: "tent"
        }
    }

    /// The ages that may take part, as a guideline. The year exchange's are
    /// 15½ to 18½, shown by `ageText`.
    public var ageText: LocalizedStringResource {
        switch self {
        case .longTerm: LocalizedStringResource("15½–18½ jaar", bundle: #bundle, comment: "Programmes: the year exchange's age guideline.")
        case .familyToFamily: LocalizedStringResource("15–19 jaar", bundle: #bundle, comment: "Programmes: Family to Family's ages.")
        case .summerCamps: LocalizedStringResource("15–21 jaar", bundle: #bundle, comment: "Programmes: the summer camps' ages.")
        }
    }

    /// How long, or when.
    public var durationText: LocalizedStringResource {
        switch self {
        case .longTerm: LocalizedStringResource("Een schooljaar", bundle: #bundle, comment: "Programmes: the year exchange's length.")
        case .familyToFamily: LocalizedStringResource("2 keer 3 of 2 keer 4 weken in de zomer", bundle: #bundle, comment: "Programmes: Family to Family's length: three or four weeks abroad, then as long at home.")
        case .summerCamps: LocalizedStringResource("Juni tot en met september", bundle: #bundle, comment: "Programmes: the period in which summer camps take place.")
        }
    }

    /// What taking part costs.
    public var cost: Cost {
        switch self {
        case .longTerm:
            Cost(amount: 2_400, isMinimum: true, note: LocalizedStringResource("Exclusief btw, verzekering, vliegticket en andere kosten.", bundle: #bundle, comment: "Programmes: what the year exchange's price does not include."))
        case .familyToFamily:
            Cost(amount: Decimal(string: "181.50")!, isMinimum: false, note: LocalizedStringResource("Inclusief btw. Exclusief verzekering, vliegticket, zakgeld en ziektekosten.", bundle: #bundle, comment: "Programmes: what Family to Family's price does and does not include."))
        case .summerCamps:
            Cost(amount: 121, isMinimum: false, note: LocalizedStringResource("Inclusief btw: de aanmeldingskosten. Reken daarnaast op reiskosten naar het kamp, zakgeld en soms een klein deelnamebedrag.", bundle: #bundle, comment: "Programmes: the summer camps' registration fee and other costs."))
        }
    }

    /// A price in euros.
    public struct Cost: Hashable, Sendable {
        public let amount: Decimal
        /// "From €2,400": the amount is the least it costs.
        public let isMinimum: Bool
        public let note: LocalizedStringResource

        public static func == (lhs: Cost, rhs: Cost) -> Bool {
            lhs.amount == rhs.amount && lhs.isMinimum == rhs.isMinimum && lhs.note.key == rhs.note.key
        }

        public func hash(into hasher: inout Hasher) {
            hasher.combine(amount)
            hasher.combine(isMinimum)
        }
    }

    /// The programme explained, in paragraphs.
    public var about: [LocalizedStringResource] {
        switch self {
        case .longTerm:
            [
                LocalizedStringResource("Dit programma van Rotary International is er voor alle geïnteresseerde scholieren in het voortgezet onderwijs. Je volgt een schooljaar een high school in het buitenland en woont bij gastgezinnen die Rotary zorgvuldig kiest.", bundle: #bundle, comment: "Programmes: what the year exchange is."),
            ]
        case .familyToFamily:
            [
                LocalizedStringResource("Een uitwisseling met een leeftijdgenoot in het buitenland, in de zomervakantie. Eerst woon je drie of vier weken bij het gezin van je maatje, daarna komt je maatje net zo lang bij jullie in Nederland wonen.", bundle: #bundle, comment: "Programmes: what Family to Family is."),
                LocalizedStringResource("Het heet ook wel het Short Term Exchange Program (STEP).", bundle: #bundle, comment: "Programmes: Family to Family's other name."),
            ]
        case .summerCamps:
            [
                LocalizedStringResource("In veel landen organiseren Rotary-clubs van juni tot en met september zomerkampen rond een thema: cultuur, sport, water, bergen, fietsen en meer. De kosten worden vaak laag gehouden, zodat iedereen mee kan, al geldt dat niet voor elk kamp.", bundle: #bundle, comment: "Programmes: what the summer camps are."),
                LocalizedStringResource("De kampen zijn internationaal en de voertaal is Engels. Vaak is er per land plaats voor één meisje en één jongen. Jongeren van Rotarians en van niet-Rotarians kunnen meedoen.", bundle: #bundle, comment: "Programmes: who meets at a summer camp and who can join."),
            ]
        }
    }

    /// Why to take part, or who the programme suits.
    public var highlights: Highlights {
        switch self {
        case .longTerm:
            Highlights(title: LocalizedStringResource("Waarom Rotary Youth Exchange?", bundle: #bundle, comment: "Programmes: heading of the reasons to go on a year exchange."), points: [
                Point(systemImage: "globe.europe.africa", title: LocalizedStringResource("Internationale ervaring", bundle: #bundle, comment: "Programmes: a reason."), text: LocalizedStringResource("Je leert een nieuwe cultuur, taal en manier van leven kennen, en je kijkt met meer respect naar verschillen.", bundle: #bundle, comment: "Programmes: a reason explained.")),
                Point(systemImage: "person.fill.checkmark", title: LocalizedStringResource("Persoonlijke ontwikkeling", bundle: #bundle, comment: "Programmes: a reason."), text: LocalizedStringResource("Je wordt zelfstandiger en zekerder, neemt verantwoordelijkheid en leert omgaan met nieuwe situaties.", bundle: #bundle, comment: "Programmes: a reason explained.")),
                Point(systemImage: "character.bubble", title: LocalizedStringResource("Een nieuwe taal", bundle: #bundle, comment: "Programmes: a reason."), text: LocalizedStringResource("Door de taal van je gastland elke dag te spreken, leer je die snel en goed.", bundle: #bundle, comment: "Programmes: a reason explained.")),
                Point(systemImage: "graduationcap", title: LocalizedStringResource("School en cultuur", bundle: #bundle, comment: "Programmes: a reason."), text: LocalizedStringResource("Je gaat naar school in je gastland en vertelt daar vaak over je eigen land en cultuur.", bundle: #bundle, comment: "Programmes: a reason explained.")),
                Point(systemImage: "person.3", title: LocalizedStringResource("Het Rotary-netwerk", bundle: #bundle, comment: "Programmes: a reason."), text: LocalizedStringResource("Rotary kiest je gastgezinnen zorgvuldig, en lokale Rotary-clubs en een wereldwijd netwerk staan achter je.", bundle: #bundle, comment: "Programmes: a reason explained.")),
                Point(systemImage: "heart", title: LocalizedStringResource("Vriendschappen voor het leven", bundle: #bundle, comment: "Programmes: a reason."), text: LocalizedStringResource("Met mensen uit je gastland en met uitwisselingsstudenten van over de hele wereld.", bundle: #bundle, comment: "Programmes: a reason explained.")),
            ])
        case .familyToFamily:
            Highlights(title: LocalizedStringResource("Past dit bij jou?", bundle: #bundle, comment: "Programmes: heading of who Family to Family suits."), points: [
                Point(systemImage: "hand.wave", title: LocalizedStringResource("Je staat open voor anderen", bundle: #bundle, comment: "Programmes: who it suits."), text: nil),
                Point(systemImage: "lightbulb", title: LocalizedStringResource("Je wilt van anderen leren", bundle: #bundle, comment: "Programmes: who it suits."), text: nil),
                Point(systemImage: "bubble.left.and.bubble.right", title: LocalizedStringResource("Je wilt ervaringen uitwisselen", bundle: #bundle, comment: "Programmes: who it suits."), text: nil),
                Point(systemImage: "figure.walk.departure", title: LocalizedStringResource("Je durft uit je vertrouwde omgeving te stappen", bundle: #bundle, comment: "Programmes: who it suits."), text: nil),
                Point(systemImage: "person.2", title: LocalizedStringResource("Je ontmoet anderen zonder vooroordelen", bundle: #bundle, comment: "Programmes: who it suits."), text: nil),
            ])
        case .summerCamps:
            Highlights(title: LocalizedStringResource("Onze missie", bundle: #bundle, comment: "Programmes: heading of the mission."), points: [
                Point(systemImage: "star", title: LocalizedStringResource("Jongeren in staat stellen om persoonlijk leiderschap te ontwikkelen", bundle: #bundle, comment: "Programmes: the mission."), text: LocalizedStringResource("Leiderschap begint met leiding geven aan jezelf, zodat je uiteindelijk anderen helpt zich te ontwikkelen.", bundle: #bundle, comment: "Programmes: the mission explained.")),
            ])
        }
    }

    /// A heading with points under it.
    public struct Highlights: Sendable {
        public let title: LocalizedStringResource
        public let points: [Point]
    }

    public struct Point: Identifiable, Sendable {
        public let systemImage: String
        public let title: LocalizedStringResource
        public let text: LocalizedStringResource?
        public var id: String { title.key }
    }

    /// Where the programme goes.
    public var destinations: Destinations {
        switch self {
        case .longTerm:
            Destinations(groups: [
                DestinationGroup(name: LocalizedStringResource("Noordelijk halfrond", bundle: #bundle, comment: "Programmes: countries north of the equator."), countries: ["US", "CA", "MX", "IN", "ID", "JP", "TH", "TW"].map { Locale.Region($0) }, note: LocalizedStringResource("En verschillende Europese landen.", bundle: #bundle, comment: "Programmes: besides the listed countries.")),
                DestinationGroup(name: LocalizedStringResource("Zuidelijk halfrond", bundle: #bundle, comment: "Programmes: countries south of the equator."), countries: ["BR", "CL", "AR", "EC", "PE"].map { Locale.Region($0) }, note: nil),
            ])
        case .familyToFamily:
            Destinations(groups: [])
        case .summerCamps:
            Destinations(groups: [
                DestinationGroup(name: LocalizedStringResource("Waar", bundle: #bundle, comment: "Programmes: where summer camps take place."), countries: ["CA", "US", "TW"].map { Locale.Region($0) }, note: LocalizedStringResource("En veel Europese landen.", bundle: #bundle, comment: "Programmes: besides the listed countries.")),
            ])
        }
    }

    public struct Destinations: Sendable {
        public let groups: [DestinationGroup]
    }

    public struct DestinationGroup: Identifiable, Sendable {
        public let name: LocalizedStringResource
        public let countries: [Locale.Region]
        public let note: LocalizedStringResource?
        public var id: String { name.key }
    }

    /// How the selection goes, for the programmes that have one.
    public var selection: LocalizedStringResource? {
        switch self {
        case .longTerm: LocalizedStringResource("Een selectiedag in oktober en een selectieweekend in november.", bundle: #bundle, comment: "Programmes: the year exchange's selection.")
        case .familyToFamily, .summerCamps: nil
        }
    }

    /// Where to sign up.
    public var signUpEmail: String {
        switch self {
        case .longTerm, .familyToFamily: "interesse@rotaryyep.nl"
        case .summerCamps: "zomerkamp@rotaryyep.nl"
        }
    }

    /// How signing up goes.
    public var signUpText: LocalizedStringResource {
        switch self {
        case .longTerm: LocalizedStringResource("Heb je interesse of een vraag? Stuur een mail, dan hoor je hoe je je aanmeldt voor de selectie.", bundle: #bundle, comment: "Programmes: how to sign up for the year exchange.")
        case .familyToFamily: LocalizedStringResource("Je meldt je aan voor Family to Family via de mail.", bundle: #bundle, comment: "Programmes: how to sign up for Family to Family.")
        case .summerCamps: LocalizedStringResource("Rond december en januari komen de kampen van het nieuwe jaar in de app. Heb je interesse, stuur dan een mail.", bundle: #bundle, comment: "Programmes: when the camps appear and how to show interest.")
        }
    }
}
