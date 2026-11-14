package com.caelitechnologies.rotary_nl_rye.clubs

import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubDocument
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubGuide
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubTopic

/*
 * The Material Symbol of each topic, role and document: the counterparts of
 * the SF Symbols iOS shows for them.
 */

val ClubTopic.icon: Int
    get() = when (this) {
        ClubTopic.Sponsoring -> R.drawable.ic_thumb_up
        ClubTopic.Exchange -> R.drawable.ic_swap
        ClubTopic.Costs -> R.drawable.ic_euro
        ClubTopic.HostFamilies -> R.drawable.ic_home
    }

val ClubGuide.icon: Int
    get() = when (this) {
        ClubGuide.YouthCommissioner -> R.drawable.ic_badge
        ClubGuide.HostFamily -> R.drawable.ic_family
        ClubGuide.Counselor -> R.drawable.ic_topic_who
        ClubGuide.AllClubs -> R.drawable.ic_account_balance
    }

val ClubDocument.icon: Int
    get() = when (this) {
        ClubDocument.YouthCommissionerHandbook, ClubDocument.HostFamilyHandbook, ClubDocument.CounselorHandbook, ClubDocument.RulesForInbounds -> R.drawable.ic_menu_book
        ClubDocument.HostFamilyVisit -> R.drawable.ic_home
        ClubDocument.ConductCertificateForm -> R.drawable.ic_task
        ClubDocument.YouthVolunteerDeclaration -> R.drawable.ic_signature
        ClubDocument.TrainingAttendanceList -> R.drawable.ic_assignment
        ClubDocument.ForSecondarySchools -> R.drawable.ic_school
        ClubDocument.ArrivalChecklist -> R.drawable.ic_checklist
        ClubDocument.TravelRules -> R.drawable.ic_luggage
        ClubDocument.FirstNightQuestions -> R.drawable.ic_nights
        ClubDocument.CodeOfPolicies -> R.drawable.ic_description
        ClubDocument.CodeOfConduct -> R.drawable.ic_front_hand
    }
