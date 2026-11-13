public import Foundation

/// A topic of the About tab: what Rotary Youth Exchange is and stands for.
public enum AboutTopic: CaseIterable, Identifiable, Sendable {
    case whoWeAre
    case mission
    case programmes
    case values

    public var id: Self { self }

    /// Rotary Youth Exchange's motto, shown under the topics.
    public static let motto = LocalizedStringResource("To build peace one young person at a time.", bundle: #bundle, comment: "Rotary Youth Exchange's motto. Usually kept in English.")

    public var title: LocalizedStringResource {
        switch self {
        case .whoWeAre: LocalizedStringResource("Wie zijn wij", bundle: #bundle, comment: "About tab: heading.")
        case .mission: LocalizedStringResource("Onze missie", bundle: #bundle, comment: "About tab: heading.")
        case .programmes: LocalizedStringResource("Uitwisselingsprogramma's", bundle: #bundle, comment: "About tab: heading.")
        case .values: LocalizedStringResource("Waarden", bundle: #bundle, comment: "About tab: heading.")
        }
    }

    /// An SF Symbol for the topic.
    public var systemImage: String {
        switch self {
        case .whoWeAre: "person.3"
        case .mission: "target"
        case .programmes: "airplane"
        case .values: "heart"
        }
    }

    public var body: LocalizedStringResource? {
        switch self {
        case .whoWeAre:
            LocalizedStringResource(
                "Rotary organiseert al 55 jaar internationale jeugduitwisselingen. Jeugduitwisseling zit in het DNA van Rotary: jongeren hebben de toekomst, voor Rotary en voor de wereld. Sinds 2010 is jeugdzaken met jeugduitwisseling de vijfde Avenue of Service van Rotary. Elk jaar zijn er wereldwijd 7.000 uitwisselingen. In Nederland organiseert de Multi District Jeugd Commissie (MDJC) ze.",
                bundle: #bundle, comment: "About tab: who Rotary Youth Exchange Netherlands is."
            )
        case .mission:
            LocalizedStringResource(
                "Rotary Youth Exchange geeft jongeren de kans om een jaar of korter in het buitenland te wonen, naar school te gaan en een nieuwe cultuur te ontdekken.",
                bundle: #bundle, comment: "About tab: the mission, followed by what the programme encourages."
            )
        case .programmes, .values:
            nil
        }
    }

    public var points: [LocalizedStringResource] {
        switch self {
        case .whoWeAre:
            []
        case .mission:
            [
                LocalizedStringResource("Internationaal begrip en vrede, door jongeren wereldwijd met elkaar te verbinden", bundle: #bundle, comment: "About tab: what the programme encourages."),
                LocalizedStringResource("Persoonlijke groei: uit je comfortzone stappen, zelfstandig worden en je aanpassen aan een nieuwe omgeving", bundle: #bundle, comment: "About tab: what the programme encourages."),
                LocalizedStringResource("Culturele uitwisseling: de taal, gebruiken en gewoonten van een ander land leren", bundle: #bundle, comment: "About tab: what the programme encourages."),
                LocalizedStringResource("Ambassadeurschap: je vertegenwoordigt je eigen land en cultuur in je gastland", bundle: #bundle, comment: "About tab: what the programme encourages."),
            ]
        case .programmes:
            [
                LocalizedStringResource("Long Term Exchange: 10 tot 11 maanden", bundle: #bundle, comment: "About tab: an exchange programme and its length."),
                LocalizedStringResource("Short Term Exchange: twee keer twee weken (noordelijk halfrond) of twee keer vier weken (zuidelijk halfrond)", bundle: #bundle, comment: "About tab: an exchange programme and its length."),
                LocalizedStringResource("Zomerkampen", bundle: #bundle, comment: "About tab: an exchange programme."),
            ]
        case .values:
            [
                LocalizedStringResource("Begrip en respect voor andere culturen", bundle: #bundle, comment: "About tab: a value of Rotary Youth Exchange."),
                LocalizedStringResource("Persoonlijke groei en ontwikkeling", bundle: #bundle, comment: "About tab: a value of Rotary Youth Exchange."),
                LocalizedStringResource("Vriendschap en vrede wereldwijd", bundle: #bundle, comment: "About tab: a value of Rotary Youth Exchange."),
                LocalizedStringResource("Service above self", bundle: #bundle, comment: "About tab: Rotary's motto as a value. Usually kept in English."),
            ]
        }
    }
}
