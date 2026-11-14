public import Foundation

/// What a Rotary club should know before it hosts a student.
public enum ClubTopic: CaseIterable, Identifiable, Sendable {
    case sponsoring
    case exchange
    case costs
    case hostFamilies

    public var id: Self { self }

    /// The welcome above the topics.
    public static let introduction = LocalizedStringResource(
        "Wat leuk dat jullie als Rotary-club een jaarstudent willen supporten, en daarmee ook een jaar lang een student uit het buitenland in jullie club ontvangen en begeleiden. Misschien heeft een scholier jullie benaderd, of komt de wens van een van jullie clubleden.",
        bundle: #bundle, comment: "Rotary clubs: the welcome at the top of the page."
    )

    public var title: LocalizedStringResource {
        switch self {
        case .sponsoring: LocalizedStringResource("Supporten: wat houdt het in?", bundle: #bundle, comment: "Rotary clubs: topic heading.")
        case .exchange: LocalizedStringResource("De uitwisseling", bundle: #bundle, comment: "Rotary clubs: topic heading.")
        case .costs: LocalizedStringResource("Kosten", bundle: #bundle, comment: "Rotary clubs: topic heading.")
        case .hostFamilies: LocalizedStringResource("Gastgezinnen", bundle: #bundle, comment: "Rotary clubs: topic heading.")
        }
    }

    public var systemImage: String {
        switch self {
        case .sponsoring: "hand.thumbsup"
        case .exchange: "arrow.left.arrow.right"
        case .costs: "eurosign.circle"
        case .hostFamilies: "house"
        }
    }

    /// The topic's text, in paragraphs.
    public var paragraphs: [LocalizedStringResource] {
        switch self {
        case .sponsoring:
            [
                LocalizedStringResource("Een Rotary-club treedt op als support voor een scholier die als ambassadeur van Rotary International een schooljaar naar het buitenland wil. Dat kan voor alle jongeren, uit Rotary-gezinnen en daarbuiten. In hetzelfde jaar ontvangt de club een buitenlandse scholier. Die gaat hier naar school met leeftijdsgenoten en woont het jaar bij twee tot hooguit vier gastgezinnen.", bundle: #bundle, comment: "Rotary clubs, sponsoring: what it means."),
                LocalizedStringResource("Voor het uitzenden en ontvangen gelden als richtlijn leeftijden van 15½ tot 18½ jaar.", bundle: #bundle, comment: "Rotary clubs, sponsoring: the age guideline."),
            ]
        case .exchange:
            [
                LocalizedStringResource("De uitwisseling gaat uit van wederkerigheid: elke Rotary-club die een scholier uitzendt, ontvangt in hetzelfde jaar een jaarstudent. Die woont het jaar bij verschillende gastgezinnen, die de club van tevoren bezoekt.", bundle: #bundle, comment: "Rotary clubs, the exchange."),
            ]
        case .costs:
            [
                LocalizedStringResource("Een Nederlandse scholier supporten kost jullie club niets. Een jaarstudent ontvangen wel, en het een kan niet zonder het ander.", bundle: #bundle, comment: "Rotary clubs, costs: sponsoring is free, hosting is not."),
                LocalizedStringResource("Voor een heel schooljaar kost het ontvangen jullie club hooguit € 2.000. De landelijke organisatie MDJC vindt het programma zo belangrijk dat ze elke club die host € 1.250 subsidie geeft. Jullie club betaalt dan hooguit € 750 voor het hele jaar.", bundle: #bundle, comment: "Rotary clubs, costs: the amounts. Keep the amounts exactly."),
            ]
        case .hostFamilies:
            [
                LocalizedStringResource("De clubjeugdcommissaris zoekt samen met de scholier die uitgezonden wil worden drie gastgezinnen en een reservegezin. Kinderen van dezelfde leeftijd in het gezin zijn fijn maar niet nodig: daarmee vindt een student sneller aansluiting, maar oudere echtparen zijn vaak fantastische gastouders, en in gezinnen met kleine kinderen leert een student vaak sneller Nederlands.", bundle: #bundle, comment: "Rotary clubs, host families: finding them."),
                LocalizedStringResource("Samenwerken met een andere Rotary-club kan een goede keuze zijn en geeft meer mogelijkheden om gastgezinnen te vinden.", bundle: #bundle, comment: "Rotary clubs, host families: working with another club."),
                LocalizedStringResource("Oud-uitwisselingsstudenten komen graag vertellen over hun ervaringen, om jullie club te informeren of enthousiast te maken. Meer informatie krijgen jullie bij de leden van de MDJC of bij jullie districtsjeugdcommissaris.", bundle: #bundle, comment: "Rotary clubs, host families: where to learn more."),
            ]
        }
    }
}
