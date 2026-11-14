// Generated from ios/RotaryKit/Sources/RotaryStudents by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.students

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/**
 * The pages for students coming to the Netherlands for a school year, as v13
 * wrote them (in English, on purpose): welcome, flight and arrival,
 * language, insurance and travel.
 */
enum class InboundGuide(
    @param:StringRes override val title: Int,
    /** One line on what the page tells. */
    @param:StringRes override val subtitle: Int,
    /** The SF Symbol iOS shows; the app maps it to a Material Symbol. */
    override val symbol: String,
    override val sections: List<GuideSection>,
) : StudentGuide {
    Welcome(
        title = R.string.inbound_guide_welcome_title,
        subtitle = R.string.inbound_guide_welcome_subtitle,
        symbol = "hand.wave",
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.inbound_guide_welcome_section_1_item_1),
                    GuideItem.Fact("globe", R.string.inbound_guide_welcome_section_1_item_2_title, R.string.inbound_guide_welcome_section_1_item_2_value),
                    GuideItem.Point("heart", null, R.string.inbound_guide_welcome_section_1_item_3_text),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_welcome_section_2,
                listOf(
                    GuideItem.Point("sparkles", R.string.inbound_guide_welcome_section_2_item_1_title, R.string.inbound_guide_welcome_section_2_item_1_text),
                    GuideItem.Point("rosette", R.string.inbound_guide_welcome_section_2_item_2_title, R.string.inbound_guide_welcome_section_2_item_2_text),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_welcome_section_3,
                listOf(
                    GuideItem.Text(R.string.inbound_guide_welcome_section_3_item_1),
                    GuideItem.Point("checkmark.circle", R.string.inbound_guide_welcome_section_3_item_2_title, null),
                    GuideItem.Point("checkmark.circle", R.string.inbound_guide_welcome_section_3_item_3_title, null),
                    GuideItem.Point("checkmark.circle", R.string.inbound_guide_welcome_section_3_item_4_title, null),
                    GuideItem.Point("checkmark.circle", R.string.inbound_guide_welcome_section_3_item_5_title, null),
                    GuideItem.Point("checkmark.circle", R.string.inbound_guide_welcome_section_3_item_6_title, null),
                    GuideItem.Point("checkmark.circle", R.string.inbound_guide_welcome_section_3_item_7_title, null),
                ),
            ),
        ),
    ),
    FlightAndArrival(
        title = R.string.inbound_guide_flight_and_arrival_title,
        subtitle = R.string.inbound_guide_flight_and_arrival_subtitle,
        symbol = "airplane.arrival",
        sections = listOf(
            GuideSection(
                R.string.inbound_guide_flight_and_arrival_section_1,
                listOf(
                    GuideItem.Text(R.string.inbound_guide_flight_and_arrival_section_1_item_1),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_flight_and_arrival_section_2,
                listOf(
                    GuideItem.Text(R.string.inbound_guide_flight_and_arrival_section_2_item_1),
                ),
            ),
        ),
    ),
    Language(
        title = R.string.inbound_guide_language_title,
        subtitle = R.string.inbound_guide_language_subtitle,
        symbol = "character.bubble",
        sections = listOf(
            GuideSection(
                R.string.inbound_guide_language_section_1,
                listOf(
                    GuideItem.Text(R.string.inbound_guide_language_section_1_item_1),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_language_section_2,
                listOf(
                    GuideItem.Fact("calendar", R.string.inbound_guide_language_section_2_item_1_title, R.string.inbound_guide_language_section_2_item_1_value),
                    GuideItem.Fact("clock", R.string.inbound_guide_language_section_2_item_2_title, R.string.inbound_guide_language_section_2_item_2_value),
                    GuideItem.Fact("person.3", R.string.inbound_guide_language_section_2_item_3_title, R.string.inbound_guide_language_section_2_item_3_value),
                    GuideItem.Fact("globe", R.string.inbound_guide_language_section_2_item_4_title, R.string.inbound_guide_language_section_2_item_4_value),
                    GuideItem.Note(R.string.inbound_guide_language_section_2_item_5),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_language_section_3,
                listOf(
                    GuideItem.Point("house", R.string.inbound_guide_language_section_3_item_1_title, R.string.inbound_guide_language_section_3_item_1_text),
                ),
            ),
        ),
    ),
    Insurance(
        title = R.string.inbound_guide_insurance_title,
        subtitle = R.string.inbound_guide_insurance_subtitle,
        symbol = "cross.case",
        sections = listOf(
            GuideSection(
                R.string.inbound_guide_insurance_section_1,
                listOf(
                    GuideItem.Text(R.string.inbound_guide_insurance_section_1_item_1),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_insurance_section_2,
                listOf(
                    GuideItem.Step(R.string.inbound_guide_insurance_section_2_item_1_title, R.string.inbound_guide_insurance_section_2_item_1_text),
                    GuideItem.Step(R.string.inbound_guide_insurance_section_2_item_2_title, R.string.inbound_guide_insurance_section_2_item_2_text),
                    GuideItem.Step(R.string.inbound_guide_insurance_section_2_item_3_title, R.string.inbound_guide_insurance_section_2_item_3_text),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_insurance_section_3,
                listOf(
                    GuideItem.Point("envelope", null, R.string.inbound_guide_insurance_section_3_item_1_text),
                ),
            ),
        ),
    ),
    Travel(
        title = R.string.inbound_guide_travel_title,
        subtitle = R.string.inbound_guide_travel_subtitle,
        symbol = "map",
        sections = listOf(
            GuideSection(
                R.string.inbound_guide_travel_section_1,
                listOf(
                    GuideItem.Point("checkmark.circle", R.string.inbound_guide_travel_section_1_item_1_title, R.string.inbound_guide_travel_section_1_item_1_text),
                    GuideItem.Point("xmark.circle", R.string.inbound_guide_travel_section_1_item_2_title, R.string.inbound_guide_travel_section_1_item_2_text),
                ),
            ),
            GuideSection(
                R.string.inbound_guide_travel_section_2,
                listOf(
                    GuideItem.Point("signature", R.string.inbound_guide_travel_section_2_item_1_title, R.string.inbound_guide_travel_section_2_item_1_text),
                ),
            ),
        ),
    );
}
