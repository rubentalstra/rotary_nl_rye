// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.clubs

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
) {
    YouthCommissionerHandbook(R.string.club_document_youth_commissioner_handbook, BASE + "26-27/handboek-jeugdcommissaris-versie-2026-2027-def-sccs.pdf"),
    HostFamilyVisit(R.string.club_document_host_family_visit, BASE + "2024/huisbezoek-gastgezinnen-24-25-def.pdf"),
    ConductCertificateForm(R.string.club_document_conduct_certificate_form, BASE + "formulier-aanlevering-vog-aanvragen-2022-2023.pdf"),
    YouthVolunteerDeclaration(R.string.club_document_youth_volunteer_declaration, BASE + "24-25/verklaring-jeugd-vrijwilliger-gedragscode-mdjc-jan23-definitieve-versie.pdf"),
    TrainingAttendanceList(R.string.club_document_training_attendance_list, BASE + "2024/presentielijst-training-clubs-gastouders-24-25.pdf"),
    ForSecondarySchools(R.string.club_document_for_secondary_schools, BASE + "25-26/rotary-exchange-voor-middelbare-scholen-2026-2027.pdf"),
    ArrivalChecklist(R.string.club_document_arrival_checklist, BASE + "24-25/actielijst-rotary-clubs-2025-2026-voorbereiding-ontvangst-inbound-student-def.pdf"),
    RulesForInbounds(R.string.club_document_rules_for_inbounds, BASE + "25-26/def-25-26-rules-and-information-for-inbounds-to-the-netherlands1.pdf"),
    TravelRules(R.string.club_document_travel_rules, BASE + "25-26/travel-rules-within-and-outside-the-netherlands-2024-2025.pdf"),
    HostFamilyHandbook(R.string.club_document_host_family_handbook, BASE + "26-27/handboek-gastgezin-versie-2026-2027def-sccs.pdf"),
    FirstNightQuestions(R.string.club_document_first_night_questions, BASE + "25-26/first-nights-questions-aangepast.pdf"),
    CounselorHandbook(R.string.club_document_counselor_handbook, BASE + "26-27/handboek-counselor-versie-2026-2027-def.pdf"),
    CodeOfPolicies(R.string.club_document_code_of_policies, BASE + "jaaruitwisseling-regels-en-interventies-v7-1-2020.pdf"),
    CodeOfConduct(R.string.club_document_code_of_conduct, BASE + "25-26/def.-gedragscode-vrijwilligers-mdjc-26-27.pdf");
}

private const val BASE = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/"
