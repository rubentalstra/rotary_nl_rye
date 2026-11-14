// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.clubs

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** What a Rotary club should know before it hosts a student. */
enum class ClubTopic(
    @param:StringRes val title: Int,
    /** The topic's text, in paragraphs. */
    val paragraphs: List<Int>,
) {
    Sponsoring(
        title = R.string.club_topic_sponsoring,
        paragraphs = listOf(R.string.club_topic_sponsoring_1, R.string.club_topic_sponsoring_2),
    ),
    Exchange(
        title = R.string.club_topic_exchange,
        paragraphs = listOf(R.string.club_topic_exchange_1),
    ),
    Costs(
        title = R.string.club_topic_costs,
        paragraphs = listOf(R.string.club_topic_costs_1, R.string.club_topic_costs_2),
    ),
    HostFamilies(
        title = R.string.club_topic_host_families,
        paragraphs = listOf(R.string.club_topic_host_families_1, R.string.club_topic_host_families_2, R.string.club_topic_host_families_3),
    );

    companion object {
        /** The welcome above the topics. */
        @StringRes
        val introduction = R.string.club_introduction
    }
}
