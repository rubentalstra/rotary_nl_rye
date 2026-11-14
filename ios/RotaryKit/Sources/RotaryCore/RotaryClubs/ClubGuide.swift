public import Foundation

/// The documents for one role in a club that hosts a student.
public enum ClubGuide: CaseIterable, Identifiable, Sendable {
    case youthCommissioner
    case hostFamily
    case counselor
    case allClubs

    public var id: Self { self }

    public var title: LocalizedStringResource {
        switch self {
        case .youthCommissioner: LocalizedStringResource("Jeugdcommissaris", bundle: #bundle, comment: "Rotary clubs: heading of the documents for the club's youth commissioner.")
        case .hostFamily: LocalizedStringResource("Gastgezin", bundle: #bundle, comment: "Rotary clubs: heading of the documents for host families.")
        case .counselor: LocalizedStringResource("Counselor", bundle: #bundle, comment: "Rotary clubs: heading of the documents for the student's counsellor.")
        case .allClubs: LocalizedStringResource("Voor alle clubs", bundle: #bundle, comment: "Rotary clubs: heading of the rules every club follows.")
        }
    }

    /// An SF Symbol for the role's row and page.
    public var systemImage: String {
        switch self {
        case .youthCommissioner: "person.text.rectangle"
        case .hostFamily: "figure.2.and.child.holdinghands"
        case .counselor: "person.2"
        case .allClubs: "building.columns"
        }
    }

    public var summary: LocalizedStringResource {
        switch self {
        case .youthCommissioner: LocalizedStringResource("Voor de jeugdcommissaris van de club die een student uitzendt en ontvangt.", bundle: #bundle, comment: "Rotary clubs: under the youth commissioner's documents.")
        case .hostFamily: LocalizedStringResource("Voor de gezinnen die de student een deel van het jaar in huis hebben.", bundle: #bundle, comment: "Rotary clubs: under the host family documents.")
        case .counselor: LocalizedStringResource("Voor de counselor die de student het hele jaar begeleidt.", bundle: #bundle, comment: "Rotary clubs: under the counsellor's documents.")
        case .allClubs: LocalizedStringResource("De regels en de gedragscode van het uitwisselingsprogramma.", bundle: #bundle, comment: "Rotary clubs: under the documents for every club.")
        }
    }

    public var documents: [ClubDocument] {
        switch self {
        case .youthCommissioner:
            [.youthCommissionerHandbook, .hostFamilyVisit, .conductCertificateForm, .youthVolunteerDeclaration, .trainingAttendanceList, .forSecondarySchools, .arrivalChecklist, .rulesForInbounds, .travelRules]
        case .hostFamily:
            [.hostFamilyHandbook, .firstNightQuestions, .travelRules]
        case .counselor:
            [.counselorHandbook, .firstNightQuestions, .travelRules]
        case .allClubs:
            [.codeOfPolicies, .codeOfConduct, .firstNightQuestions]
        }
    }
}
