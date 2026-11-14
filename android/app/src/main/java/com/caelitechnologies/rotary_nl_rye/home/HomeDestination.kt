package com.caelitechnologies.rotary_nl_rye.home

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.navigation3.runtime.NavKey
import com.caelitechnologies.rotary_nl_rye.R
import kotlinx.serialization.Serializable

/**
 * The places the home page opens, one tile each, in the order they show.
 * Each is a route on Home's back stack.
 */
@Serializable
enum class HomeDestination(
    @param:StringRes val label: Int,
    @param:DrawableRes val icon: Int,
) : NavKey {
    Programmes(R.string.home_programmes, R.drawable.ic_dest_programmes),
    News(R.string.home_news, R.drawable.ic_dest_news),
    Calendar(R.string.home_calendar, R.drawable.ic_dest_calendar),
    Outbound(R.string.home_outbound, R.drawable.ic_dest_outbound),
    Inbound(R.string.home_inbound, R.drawable.ic_dest_inbound),
    Rebound(R.string.home_rebound, R.drawable.ic_dest_rebound),
    SummerCamps(R.string.home_summer_camps, R.drawable.ic_dest_summer_camps),

    /** Its tile shows the Rotary wheel in Rotary gold instead of a symbol. */
    RotaryClubs(R.string.home_rotary_clubs, R.drawable.ic_rotary_wheel),
}
