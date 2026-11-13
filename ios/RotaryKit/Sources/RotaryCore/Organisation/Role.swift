public import Foundation

/// What someone does for Rotary Youth Exchange Netherlands. A closed set, so
/// each title is written once and translated once in the String Catalog.
public enum Role: Hashable, Sendable {
    case chair
    case chairYouthExchange
    case chairLongTerm
    case secretary
    case secretaryMDJC
    case treasurer
    case nationalCounselor
    case administratorLongTerm
    case outboundCoordinator
    case inboundCoordinator
    case inboundCoordinatorSummerCamps
    case coordinatorSummerCampsAbroad
    case coordinatorFamilyToFamily
    case coordinatorOrientationCourse
    case coordinatorAmericasAsiaEurope
    case coordinatorLatinAmerica
    case coordinatorLatinAmericaEurope
    /// DJC: the youth commissioner of one Rotary district.
    case districtYouthCommissioner(district: Int)
    case headOfActivities
    case activitiesInbounds
    case committeeHeadExternal
    case committeeHeadInbounds
    case committeeHeadPreRebounds
    case committeeMemberExternal
    case committeeMemberInbounds
    case committeeMemberPreRebounds
    case webAppMaster
    case lawyer
    case doctorsOffice

    public var title: LocalizedStringResource {
        switch self {
        case .chair: LocalizedStringResource("Voorzitter", bundle: #bundle, comment: "Role: chair of a team or of ROTEX.")
        case .chairYouthExchange: LocalizedStringResource("Voorzitter Rotary Youth Exchange", bundle: #bundle, comment: "Role: chair of Rotary Youth Exchange Netherlands.")
        case .chairLongTerm: LocalizedStringResource("Voorzitter Long Term", bundle: #bundle, comment: "Role: chair of the Long Term Exchange team.")
        case .secretary: LocalizedStringResource("Secretaris", bundle: #bundle, comment: "Role: secretary.")
        case .secretaryMDJC: LocalizedStringResource("Secretaris MDJC", bundle: #bundle, comment: "Role: secretary of the Multi-District Youth Committee (MDJC).")
        case .treasurer: LocalizedStringResource("Penningmeester", bundle: #bundle, comment: "Role: treasurer.")
        case .nationalCounselor: LocalizedStringResource("Landelijk counselor", bundle: #bundle, comment: "Role: national counsellor who supports exchange students.")
        case .administratorLongTerm: LocalizedStringResource("Administrateur Long Term", bundle: #bundle, comment: "Role: administrator of the Long Term Exchange.")
        case .outboundCoordinator: LocalizedStringResource("Coördinator outbound", bundle: #bundle, comment: "Role: coordinates Dutch students going abroad.")
        case .inboundCoordinator: LocalizedStringResource("Coördinator inbound", bundle: #bundle, comment: "Role: coordinates foreign students coming to the Netherlands.")
        case .inboundCoordinatorSummerCamps: LocalizedStringResource("Coördinator inbound zomerkampen", bundle: #bundle, comment: "Role: coordinates foreign students at summer camps in the Netherlands.")
        case .coordinatorSummerCampsAbroad: LocalizedStringResource("Coördinator zomerkampen buitenland", bundle: #bundle, comment: "Role: coordinates summer camps abroad.")
        case .coordinatorFamilyToFamily: LocalizedStringResource("Coördinator Family to Family", bundle: #bundle, comment: "Role: coordinates the Family to Family programme.")
        case .coordinatorOrientationCourse: LocalizedStringResource("Coördinator Dutch Orientation Course", bundle: #bundle, comment: "Role: coordinates the Dutch Orientation Course (DOC) for inbound students.")
        case .coordinatorAmericasAsiaEurope: LocalizedStringResource("Coördinator Amerika, Canada, Azië en Europa", bundle: #bundle, comment: "Role: coordinates exchanges with the United States, Canada, Asia and Europe.")
        case .coordinatorLatinAmerica: LocalizedStringResource("Coördinator Midden- en Zuid-Amerika", bundle: #bundle, comment: "Role: coordinates exchanges with Central and South America.")
        case .coordinatorLatinAmericaEurope: LocalizedStringResource("Coördinator Midden- en Zuid-Amerika en Europa", bundle: #bundle, comment: "Role: coordinates exchanges with Central and South America and Europe.")
        case .districtYouthCommissioner(let district): LocalizedStringResource("Districtsjeugdcommissaris \(String(district))", bundle: #bundle, comment: "Role: youth commissioner of the Rotary district with this number, such as 1590. The number is an identifier, never formatted.")
        case .headOfActivities: LocalizedStringResource("Hoofd activiteiten", bundle: #bundle, comment: "Role: head of activities at ROTEX.")
        case .activitiesInbounds: LocalizedStringResource("Activiteiten inbounds", bundle: #bundle, comment: "Role: organises activities for inbound students.")
        case .committeeHeadExternal: LocalizedStringResource("Commissiehoofd extern", bundle: #bundle, comment: "Role: head of the ROTEX committee for external relations.")
        case .committeeHeadInbounds: LocalizedStringResource("Commissiehoofd inbounds", bundle: #bundle, comment: "Role: head of the ROTEX committee for inbound students.")
        case .committeeHeadPreRebounds: LocalizedStringResource("Commissiehoofd pre-rebounds", bundle: #bundle, comment: "Role: head of the ROTEX committee for students about to go abroad.")
        case .committeeMemberExternal: LocalizedStringResource("Commissielid extern", bundle: #bundle, comment: "Role: member of the ROTEX committee for external relations.")
        case .committeeMemberInbounds: LocalizedStringResource("Commissielid inbounds", bundle: #bundle, comment: "Role: member of the ROTEX committee for inbound students.")
        case .committeeMemberPreRebounds: LocalizedStringResource("Commissielid pre-rebounds", bundle: #bundle, comment: "Role: member of the ROTEX committee for students about to go abroad.")
        case .webAppMaster: LocalizedStringResource("Beheerder website en app", bundle: #bundle, comment: "Role: maintains the website and this app.")
        case .lawyer: LocalizedStringResource("Advocaat", bundle: #bundle, comment: "Role of an independent confidant: lawyer.")
        case .doctorsOffice: LocalizedStringResource("Huisartsenpraktijk", bundle: #bundle, comment: "Role of an independent confidant: a GP's practice.")
        }
    }
}
