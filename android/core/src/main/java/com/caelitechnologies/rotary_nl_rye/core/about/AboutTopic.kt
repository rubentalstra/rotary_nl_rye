// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.about

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** A topic of the About tab: what Rotary Youth Exchange is and stands for. */
enum class AboutTopic(
    @param:StringRes val title: Int,
    @param:StringRes val body: Int?,
    val points: List<Int>,
) {
    WhoWeAre(
        title = R.string.about_who_we_are_title,
        body = R.string.about_who_we_are_body,
        points = listOf(R.string.about_who_we_are_point_1, R.string.about_who_we_are_point_2, R.string.about_who_we_are_point_3, R.string.about_who_we_are_point_4),
    ),
    Mission(
        title = R.string.about_mission_title,
        body = R.string.about_mission_body,
        points = listOf(R.string.about_mission_point_1, R.string.about_mission_point_2, R.string.about_mission_point_3, R.string.about_mission_point_4),
    ),
    Programmes(
        title = R.string.about_programmes_title,
        body = null,
        points = listOf(R.string.about_programmes_point_1, R.string.about_programmes_point_2, R.string.about_programmes_point_3),
    ),
    Values(
        title = R.string.about_values_title,
        body = null,
        points = listOf(R.string.about_values_point_1, R.string.about_values_point_2, R.string.about_values_point_3, R.string.about_values_point_4),
    );

    companion object {
        /** Rotary Youth Exchange's motto, shown under the topics. */
        @StringRes
        val motto = R.string.about_motto
    }
}
