// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.programmes

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R
import java.math.BigDecimal

/**
 * An exchange programme of Rotary Youth Exchange Netherlands. Its texts are
 * in Dutch only, on purpose, as on iOS.
 */
enum class ExchangeProgramme(
    @param:StringRes val title: Int,
    /** One line on what the programme is. */
    @param:StringRes val tagline: Int,
    /** The ages that may take part, as a guideline. */
    @param:StringRes val ageText: Int,
    /** How long, or when. */
    @param:StringRes val durationText: Int,
    val cost: Cost,
    /** The programme explained, in paragraphs. */
    val about: List<Int>,
    /** Why to take part, or who the programme suits. */
    val highlights: Highlights,
    /** Where the programme goes; empty for Family to Family. */
    val destinations: List<DestinationGroup>,
    /** How the selection goes, for the programmes that have one. */
    @param:StringRes val selection: Int?,
    /** Where to sign up. */
    val signUpEmail: String,
    /** How signing up goes. */
    @param:StringRes val signUpText: Int,
) {
    LongTerm(
        title = R.string.programme_long_term_title,
        tagline = R.string.programme_long_term_tagline,
        ageText = R.string.programme_long_term_age_text,
        durationText = R.string.programme_long_term_duration_text,
        cost = Cost(BigDecimal("2400"), isMinimum = true, note = R.string.programme_long_term_cost_note),
        about = listOf(R.string.programme_long_term_about_1),
        highlights = Highlights(R.string.programme_long_term_highlights, listOf(
            Point(symbol = "globe.europe.africa", title = R.string.programme_long_term_point_1, text = R.string.programme_long_term_point_1_text),
            Point(symbol = "person.fill.checkmark", title = R.string.programme_long_term_point_2, text = R.string.programme_long_term_point_2_text),
            Point(symbol = "character.bubble", title = R.string.programme_long_term_point_3, text = R.string.programme_long_term_point_3_text),
            Point(symbol = "graduationcap", title = R.string.programme_long_term_point_4, text = R.string.programme_long_term_point_4_text),
            Point(symbol = "person.3", title = R.string.programme_long_term_point_5, text = R.string.programme_long_term_point_5_text),
            Point(symbol = "heart", title = R.string.programme_long_term_point_6, text = R.string.programme_long_term_point_6_text),
        )),
        destinations = listOf(DestinationGroup(R.string.programme_long_term_destinations_1, listOf("US", "CA", "MX", "IN", "ID", "JP", "TH", "TW"), R.string.programme_long_term_destinations_1_note), DestinationGroup(R.string.programme_long_term_destinations_2, listOf("BR", "CL", "AR", "EC", "PE"), null)),
        selection = R.string.programme_long_term_selection,
        signUpEmail = "interesse@rotaryyep.nl",
        signUpText = R.string.programme_long_term_sign_up_text,
    ),
    FamilyToFamily(
        title = R.string.programme_family_to_family_title,
        tagline = R.string.programme_family_to_family_tagline,
        ageText = R.string.programme_family_to_family_age_text,
        durationText = R.string.programme_family_to_family_duration_text,
        cost = Cost(BigDecimal("181.50"), isMinimum = false, note = R.string.programme_family_to_family_cost_note),
        about = listOf(R.string.programme_family_to_family_about_1, R.string.programme_family_to_family_about_2),
        highlights = Highlights(R.string.programme_family_to_family_highlights, listOf(
            Point(symbol = "hand.wave", title = R.string.programme_family_to_family_point_1, text = null),
            Point(symbol = "lightbulb", title = R.string.programme_family_to_family_point_2, text = null),
            Point(symbol = "bubble.left.and.bubble.right", title = R.string.programme_family_to_family_point_3, text = null),
            Point(symbol = "figure.walk.departure", title = R.string.programme_family_to_family_point_4, text = null),
            Point(symbol = "person.2", title = R.string.programme_family_to_family_point_5, text = null),
        )),
        destinations = listOf(),
        selection = null,
        signUpEmail = "interesse@rotaryyep.nl",
        signUpText = R.string.programme_family_to_family_sign_up_text,
    ),
    SummerCamps(
        title = R.string.programme_summer_camps_title,
        tagline = R.string.programme_summer_camps_tagline,
        ageText = R.string.programme_summer_camps_age_text,
        durationText = R.string.programme_summer_camps_duration_text,
        cost = Cost(BigDecimal("121"), isMinimum = false, note = R.string.programme_summer_camps_cost_note),
        about = listOf(R.string.programme_summer_camps_about_1, R.string.programme_summer_camps_about_2),
        highlights = Highlights(R.string.programme_summer_camps_highlights, listOf(
            Point(symbol = "star", title = R.string.programme_summer_camps_point_1, text = R.string.programme_summer_camps_point_1_text),
        )),
        destinations = listOf(DestinationGroup(R.string.programme_summer_camps_destinations_1, listOf("CA", "US", "TW"), R.string.programme_summer_camps_destinations_1_note)),
        selection = null,
        signUpEmail = "zomerkamp@rotaryyep.nl",
        signUpText = R.string.programme_summer_camps_sign_up_text,
    );

    /** A price in euros; "from" when [isMinimum]. */
    data class Cost(val amount: BigDecimal, val isMinimum: Boolean, @param:StringRes val note: Int)

    /** A heading with points under it. */
    data class Highlights(@param:StringRes val title: Int, val points: List<Point>)

    /** A point: the SF Symbol iOS shows (the app maps it to a Material Symbol), a title and an optional text. */
    data class Point(val symbol: String, @param:StringRes val title: Int, @param:StringRes val text: Int?)

    /** A named group of countries (ISO 3166-1 codes), with an optional note. */
    data class DestinationGroup(@param:StringRes val name: Int, val countries: List<String>, @param:StringRes val note: Int?)
}
