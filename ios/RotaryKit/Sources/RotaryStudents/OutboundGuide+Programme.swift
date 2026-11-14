public import RotaryCore

extension OutboundGuide {
    /// The programme a page is about.
    public var programme: ExchangeProgramme {
        switch self {
        case .signUp, .requirements, .selectionDay, .selectionWeekend, .topThree: .longTerm
        case .campsAbout, .campsWho, .campsCountries, .campsSignUp: .summerCamps
        case .familyAbout, .familyRequirements, .countryPreference, .familySignUp: .familyToFamily
        }
    }

    /// A programme's pages, in the order to read them.
    public static func guides(for programme: ExchangeProgramme) -> [OutboundGuide] {
        allCases.filter { $0.programme == programme }
    }
}
