// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.clubs

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** The documents for one role in a club that hosts a student. */
enum class ClubGuide(
    @param:StringRes val title: Int,
    @param:StringRes val summary: Int,
) {
    YouthCommissioner(R.string.club_guide_youth_commissioner, R.string.club_guide_youth_commissioner_summary),
    HostFamily(R.string.club_guide_host_family, R.string.club_guide_host_family_summary),
    Counselor(R.string.club_guide_counselor, R.string.club_guide_counselor_summary),
    AllClubs(R.string.club_guide_all_clubs, R.string.club_guide_all_clubs_summary);

    /** The role's documents, each a reference to the one definition. */
    val documents: List<ClubDocument>
        get() = when (this) {
            YouthCommissioner -> listOf(ClubDocument.YouthCommissionerHandbook, ClubDocument.HostFamilyVisit, ClubDocument.ConductCertificateForm, ClubDocument.YouthVolunteerDeclaration, ClubDocument.TrainingAttendanceList, ClubDocument.ForSecondarySchools, ClubDocument.ArrivalChecklist, ClubDocument.RulesForInbounds, ClubDocument.TravelRules)
            HostFamily -> listOf(ClubDocument.HostFamilyHandbook, ClubDocument.FirstNightQuestions, ClubDocument.TravelRules)
            Counselor -> listOf(ClubDocument.CounselorHandbook, ClubDocument.FirstNightQuestions, ClubDocument.TravelRules)
            AllClubs -> listOf(ClubDocument.CodeOfPolicies, ClubDocument.CodeOfConduct, ClubDocument.FirstNightQuestions)
        }
}
