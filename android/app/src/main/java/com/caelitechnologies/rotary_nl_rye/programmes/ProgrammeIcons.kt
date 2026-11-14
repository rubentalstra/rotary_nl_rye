package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.annotation.DrawableRes
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme

/** The Material Symbol for a programme, where it has no photo. */
@get:DrawableRes
val ExchangeProgramme.icon: Int
    get() = when (this) {
        ExchangeProgramme.LongTerm -> R.drawable.ic_school
        ExchangeProgramme.FamilyToFamily -> R.drawable.ic_family
        ExchangeProgramme.SummerCamps -> R.drawable.ic_dest_summer_camps
    }

/**
 * The Material Symbol for a highlight, from the SF Symbol RotaryCore names
 * for iOS; a star for a symbol not mapped yet.
 */
@DrawableRes
fun highlightIcon(symbol: String): Int = when (symbol) {
    "globe.europe.africa" -> R.drawable.ic_public
    "person.fill.checkmark" -> R.drawable.ic_how_to_reg
    "character.bubble" -> R.drawable.ic_translate
    "graduationcap" -> R.drawable.ic_school
    "person.3" -> R.drawable.ic_groups
    "heart" -> R.drawable.ic_favorite
    "hand.wave" -> R.drawable.ic_waving_hand
    "lightbulb" -> R.drawable.ic_lightbulb
    "bubble.left.and.bubble.right" -> R.drawable.ic_forum
    "figure.walk.departure" -> R.drawable.ic_flight_takeoff
    "person.2" -> R.drawable.ic_group
    else -> R.drawable.ic_star
}
