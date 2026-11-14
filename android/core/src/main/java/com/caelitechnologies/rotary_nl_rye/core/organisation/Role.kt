// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.organisation

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/**
 * What someone does for Rotary Youth Exchange Netherlands. A closed set, so
 * each title is written once and translated once in the string resources.
 */
sealed interface Role {
    /** The title, a string resource; [titleArgs] fill its placeholders. */
    @get:StringRes
    val title: Int
    val titleArgs: List<Any> get() = emptyList()

    data object Chair : Role { override val title get() = R.string.role_chair }
    data object ChairYouthExchange : Role { override val title get() = R.string.role_chair_youth_exchange }
    data object ChairLongTerm : Role { override val title get() = R.string.role_chair_long_term }
    data object Secretary : Role { override val title get() = R.string.role_secretary }
    data object SecretaryMDJC : Role { override val title get() = R.string.role_secretary_m_d_j_c }
    data object Treasurer : Role { override val title get() = R.string.role_treasurer }
    data object NationalCounselor : Role { override val title get() = R.string.role_national_counselor }
    data object AdministratorLongTerm : Role { override val title get() = R.string.role_administrator_long_term }
    data object OutboundCoordinator : Role { override val title get() = R.string.role_outbound_coordinator }
    data object InboundCoordinator : Role { override val title get() = R.string.role_inbound_coordinator }
    data object InboundCoordinatorSummerCamps : Role { override val title get() = R.string.role_inbound_coordinator_summer_camps }
    data object CoordinatorSummerCampsAbroad : Role { override val title get() = R.string.role_coordinator_summer_camps_abroad }
    data object CoordinatorFamilyToFamily : Role { override val title get() = R.string.role_coordinator_family_to_family }
    data object CoordinatorOrientationCourse : Role { override val title get() = R.string.role_coordinator_orientation_course }
    data object CoordinatorAmericasAsiaEurope : Role { override val title get() = R.string.role_coordinator_americas_asia_europe }
    data object CoordinatorLatinAmerica : Role { override val title get() = R.string.role_coordinator_latin_america }
    data object CoordinatorLatinAmericaEurope : Role { override val title get() = R.string.role_coordinator_latin_america_europe }
    /** DJC: the youth commissioner of one Rotary district. */
    data class DistrictYouthCommissioner(val district: Int) : Role {
        override val title get() = R.string.role_district_youth_commissioner
        // The district number is an identifier, never formatted as a number.
        override val titleArgs get() = listOf<Any>(district.toString())
    }
    data object HeadOfActivities : Role { override val title get() = R.string.role_head_of_activities }
    data object ActivitiesInbounds : Role { override val title get() = R.string.role_activities_inbounds }
    data object CommitteeHeadExternal : Role { override val title get() = R.string.role_committee_head_external }
    data object CommitteeHeadInbounds : Role { override val title get() = R.string.role_committee_head_inbounds }
    data object CommitteeHeadPreRebounds : Role { override val title get() = R.string.role_committee_head_pre_rebounds }
    data object CommitteeMemberExternal : Role { override val title get() = R.string.role_committee_member_external }
    data object CommitteeMemberInbounds : Role { override val title get() = R.string.role_committee_member_inbounds }
    data object CommitteeMemberPreRebounds : Role { override val title get() = R.string.role_committee_member_pre_rebounds }
    data object WebAppMaster : Role { override val title get() = R.string.role_web_app_master }
    data object Lawyer : Role { override val title get() = R.string.role_lawyer }
    data object DoctorsOffice : Role { override val title get() = R.string.role_doctors_office }
}
