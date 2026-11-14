public import Foundation

/// A document for the Rotary clubs that host a student, published as a PDF on
/// rotary.nl. Each is defined once; a guide lists the ones it needs, so a
/// document in several guides is still one document with one link.
public enum ClubDocument: CaseIterable, Identifiable, Sendable {
    case youthCommissionerHandbook
    case hostFamilyVisit
    case conductCertificateForm
    case youthVolunteerDeclaration
    case trainingAttendanceList
    case forSecondarySchools
    case arrivalChecklist
    case rulesForInbounds
    case travelRules
    case hostFamilyHandbook
    case firstNightQuestions
    case counselorHandbook
    case codeOfPolicies
    case codeOfConduct

    public var id: Self { self }

    public var title: LocalizedStringResource {
        switch self {
        case .youthCommissionerHandbook: LocalizedStringResource("Handboek jeugdcommissaris", bundle: #bundle, comment: "Rotary clubs: a document's title.")
        case .hostFamilyVisit: LocalizedStringResource("Huisbezoek gastgezinnen", bundle: #bundle, comment: "Rotary clubs: a document's title, the form for visiting host families.")
        case .conductCertificateForm: LocalizedStringResource("Verzamelformulier VOG-gegevens", bundle: #bundle, comment: "Rotary clubs: a document's title. VOG is the Dutch certificate of conduct.")
        case .youthVolunteerDeclaration: LocalizedStringResource("Verklaring Jeugd Vrijwilliger (VJV)", bundle: #bundle, comment: "Rotary clubs: a document's title.")
        case .trainingAttendanceList: LocalizedStringResource("Presentielijst DJC-training", bundle: #bundle, comment: "Rotary clubs: a document's title, the attendance list of the district youth commissioner's training.")
        case .forSecondarySchools: LocalizedStringResource("Voor middelbare scholen", bundle: #bundle, comment: "Rotary clubs: a document's title, information for secondary schools.")
        case .arrivalChecklist: LocalizedStringResource("Actielijst voorbereiding komst jaarstudent", bundle: #bundle, comment: "Rotary clubs: a document's title, the checklist for preparing the exchange student's arrival.")
        case .rulesForInbounds: LocalizedStringResource("Rules and Information for Inbounds", bundle: #bundle, comment: "Rotary clubs: a document's title; the document is in English.")
        case .travelRules: LocalizedStringResource("Reisregels in en buiten Nederland", bundle: #bundle, comment: "Rotary clubs: a document's title.")
        case .hostFamilyHandbook: LocalizedStringResource("Handboek gastgezin", bundle: #bundle, comment: "Rotary clubs: a document's title.")
        case .firstNightQuestions: LocalizedStringResource("First Night Questions", bundle: #bundle, comment: "Rotary clubs: a document's title; the questions to discuss on a student's first night with a host family.")
        case .counselorHandbook: LocalizedStringResource("Handboek counselor", bundle: #bundle, comment: "Rotary clubs: a document's title.")
        case .codeOfPolicies: LocalizedStringResource("Code of Policies: regels en interventies", bundle: #bundle, comment: "Rotary clubs: a document's title.")
        case .codeOfConduct: LocalizedStringResource("Gedragscode vrijwilligers MDJC", bundle: #bundle, comment: "Rotary clubs: a document's title, the code of conduct for volunteers.")
        }
    }

    /// An SF Symbol for the document's row.
    public var systemImage: String {
        switch self {
        case .youthCommissionerHandbook, .hostFamilyHandbook, .counselorHandbook: "book.closed"
        case .hostFamilyVisit: "house"
        case .conductCertificateForm: "checkmark.seal"
        case .youthVolunteerDeclaration: "signature"
        case .trainingAttendanceList: "list.clipboard"
        case .forSecondarySchools: "graduationcap"
        case .arrivalChecklist: "checklist"
        case .rulesForInbounds: "text.book.closed"
        case .travelRules: "suitcase.rolling"
        case .firstNightQuestions: "moon.stars"
        case .codeOfPolicies: "doc.text"
        case .codeOfConduct: "hand.raised"
        }
    }

    public var url: URL {
        let base = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/"
        let path = switch self {
        case .youthCommissionerHandbook: "26-27/handboek-jeugdcommissaris-versie-2026-2027-def-sccs.pdf"
        case .hostFamilyVisit: "2024/huisbezoek-gastgezinnen-24-25-def.pdf"
        case .conductCertificateForm: "formulier-aanlevering-vog-aanvragen-2022-2023.pdf"
        case .youthVolunteerDeclaration: "24-25/verklaring-jeugd-vrijwilliger-gedragscode-mdjc-jan23-definitieve-versie.pdf"
        case .trainingAttendanceList: "2024/presentielijst-training-clubs-gastouders-24-25.pdf"
        case .forSecondarySchools: "25-26/rotary-exchange-voor-middelbare-scholen-2026-2027.pdf"
        case .arrivalChecklist: "24-25/actielijst-rotary-clubs-2025-2026-voorbereiding-ontvangst-inbound-student-def.pdf"
        case .rulesForInbounds: "25-26/def-25-26-rules-and-information-for-inbounds-to-the-netherlands1.pdf"
        case .travelRules: "25-26/travel-rules-within-and-outside-the-netherlands-2024-2025.pdf"
        case .hostFamilyHandbook: "26-27/handboek-gastgezin-versie-2026-2027def-sccs.pdf"
        case .firstNightQuestions: "25-26/first-nights-questions-aangepast.pdf"
        case .counselorHandbook: "26-27/handboek-counselor-versie-2026-2027-def.pdf"
        case .codeOfPolicies: "jaaruitwisseling-regels-en-interventies-v7-1-2020.pdf"
        case .codeOfConduct: "25-26/def.-gedragscode-vrijwilligers-mdjc-26-27.pdf"
        }
        return URL(string: base + path)!
    }
}
