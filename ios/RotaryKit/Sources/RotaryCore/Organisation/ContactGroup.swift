public import Foundation

/// A group of people under one heading: a team in the Contact tab, or a group
/// in the Emergency tab. Members are references to `Person` values, so a
/// person in two groups is still one person with one phone number.
public enum ContactGroup: CaseIterable, Identifiable, Sendable {
    case mdjc
    case longTerm
    case shortTerm
    case rotex
    case emergency
    case confidants

    public var id: Self { self }

    /// The teams of Rotary Youth Exchange Netherlands, in the order the Contact tab shows them.
    public static let teams: [ContactGroup] = [.mdjc, .longTerm, .shortTerm, .rotex]

    /// Who to call in an emergency, in the order the Emergency tab shows them.
    public static let emergencyGroups: [ContactGroup] = [.emergency, .confidants]

    public var name: LocalizedStringResource {
        switch self {
        case .mdjc: LocalizedStringResource("MDJC", bundle: #bundle, comment: "Name of the Multi-District Youth Committee, a team in the Contact tab.")
        case .longTerm: LocalizedStringResource("Long Term", bundle: #bundle, comment: "Name of the Long Term Exchange team in the Contact tab.")
        case .shortTerm: LocalizedStringResource("Short Term", bundle: #bundle, comment: "Name of the Short Term Exchange team in the Contact tab.")
        case .rotex: LocalizedStringResource("ROTEX", bundle: #bundle, comment: "Name of ROTEX, the association of returned exchange students, in the Contact tab.")
        case .emergency: LocalizedStringResource("Rotary Youth Exchange", bundle: #bundle, comment: "Heading of the emergency contacts within Rotary Youth Exchange.")
        case .confidants: LocalizedStringResource("Onafhankelijke vertrouwenspersonen", bundle: #bundle, comment: "Heading of the confidants who are not part of Rotary.")
        }
    }

    public var summary: LocalizedStringResource? {
        switch self {
        case .mdjc: LocalizedStringResource("Multi District Jeugd Commissie", bundle: #bundle, comment: "What the MDJC team is, under its name.")
        case .longTerm: LocalizedStringResource("Het team van de Long Term Exchange", bundle: #bundle, comment: "What the Long Term team is, under its name.")
        case .shortTerm: LocalizedStringResource("Het team van de Short Term Exchange", bundle: #bundle, comment: "What the Short Term team is, under its name.")
        case .rotex: LocalizedStringResource("Oud-uitwisselingsstudenten", bundle: #bundle, comment: "What ROTEX is, under its name.")
        case .emergency: nil
        case .confidants: LocalizedStringResource("Niet verbonden aan Rotary. Voor als je iets vertrouwelijk wilt bespreken, zoals seksuele intimidatie.", bundle: #bundle, comment: "Explains when to call an independent confidant.")
        }
    }

    public var members: [Person] {
        switch self {
        case .mdjc:
            [.barbaraTusveld, .clasineScheepers, .evertMarseille, .margaOosterveld, .ernstZiengs, .stevenStolp, .ernaVanDijk, .marioMeeuwse, .judithSiebring, .ericKamst, .thijsKaas]
        case .longTerm:
            [.margaOosterveld, .toonTerEllen, .sandraCoolsWemer, .jitteWigbold, .jetBebseler, .judithSiebring, .benMureau, .bettyRijkmansSiemens, .basSiebring, .stevenStolp, .hillekeVanDerVeer, .christianVanDam, .rubenTalstra]
        case .shortTerm:
            [.janVanAller, .willemijnVanWaes, .marjaHofland, .bettyRijkmansSiemens]
        case .rotex:
            [.anoukIJdema, .quintenVanAar, .marreKroese, .sanderVanDam, .emilyOdink, .brittGroeneboer, .madykeDeGroot, .lysanneSmits, .merleBreijer, .philipienVanWaverenHogervorst, .marcellaJorgeVaz, .floorDeGraaf, .cathelijneVanDerPluijm, .mathildeVanDenBerg, .boHeijns, .tomPellicaan]
        case .emergency:
            // The same people as in the teams, so an emergency number never drifts from the Contact tab.
            [.barbaraTusveld, .margaOosterveld, .clasineScheepers, .hillekeVanDerVeer]
        case .confidants:
            [.paulineMemelink, .reinoutVriesendorp]
        }
    }

    /// The members that match a search, in the group's order; all of them for an empty search.
    public func members(matching query: String) -> [Person] {
        members.filter { $0.matches(query) }
    }
}
