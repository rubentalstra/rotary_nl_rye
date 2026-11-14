// Generated from ios/RotaryKit/Sources/RotaryStudents by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.students

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme

/**
 * The pages for Dutch students who want to go abroad, as v13 wrote them (in
 * Dutch, on purpose), per programme: the year exchange, the summer camps and
 * Family to Family.
 */
enum class OutboundGuide(
    @param:StringRes override val title: Int,
    /** One line on what the page tells. */
    @param:StringRes override val subtitle: Int,
    /** The SF Symbol iOS shows; the app maps it to a Material Symbol. */
    override val symbol: String,
    /** The programme the page is about. */
    val programme: ExchangeProgramme,
    override val sections: List<GuideSection>,
) : StudentGuide {
    SignUp(
        title = R.string.outbound_guide_sign_up_title,
        subtitle = R.string.outbound_guide_sign_up_subtitle,
        symbol = "envelope",
        programme = ExchangeProgramme.LongTerm,
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_sign_up_section_1_item_1),
                    GuideItem.Mail("interesse@rotaryyep.nl", "Interesse in lange termijn uitwisseling"),
                ),
            ),
        ),
    ),
    Requirements(
        title = R.string.outbound_guide_requirements_title,
        subtitle = R.string.outbound_guide_requirements_subtitle,
        symbol = "checkmark.seal",
        programme = ExchangeProgramme.LongTerm,
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_requirements_section_1_item_1),
                    GuideItem.Text(R.string.outbound_guide_requirements_section_1_item_2),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_requirements_section_2,
                listOf(
                    GuideItem.Fact("person", R.string.outbound_guide_requirements_section_2_item_1_title, R.string.outbound_guide_requirements_section_2_item_1_value),
                    GuideItem.Fact("graduationcap", R.string.outbound_guide_requirements_section_2_item_2_title, R.string.outbound_guide_requirements_section_2_item_2_value),
                    GuideItem.Fact("person.3", R.string.outbound_guide_requirements_section_2_item_3_title, R.string.outbound_guide_requirements_section_2_item_3_value),
                    GuideItem.Note(R.string.outbound_guide_requirements_section_2_item_4),
                ),
            ),
        ),
    ),
    SelectionDay(
        title = R.string.outbound_guide_selection_day_title,
        subtitle = R.string.outbound_guide_selection_day_subtitle,
        symbol = "person.2",
        programme = ExchangeProgramme.LongTerm,
        sections = listOf(
            GuideSection(
                R.string.outbound_guide_selection_day_section_1,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_selection_day_section_1_item_1),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_selection_day_section_2,
                listOf(
                    GuideItem.Point("bubble.left.and.bubble.right", null, R.string.outbound_guide_selection_day_section_2_item_1_text),
                    GuideItem.Text(R.string.outbound_guide_selection_day_section_2_item_2),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_selection_day_section_3,
                listOf(
                    GuideItem.Question(R.string.outbound_guide_selection_day_section_3_item_1),
                    GuideItem.Question(R.string.outbound_guide_selection_day_section_3_item_2),
                    GuideItem.Question(R.string.outbound_guide_selection_day_section_3_item_3),
                    GuideItem.Question(R.string.outbound_guide_selection_day_section_3_item_4),
                    GuideItem.Question(R.string.outbound_guide_selection_day_section_3_item_5),
                ),
            ),
        ),
    ),
    SelectionWeekend(
        title = R.string.outbound_guide_selection_weekend_title,
        subtitle = R.string.outbound_guide_selection_weekend_subtitle,
        symbol = "tent.2",
        programme = ExchangeProgramme.LongTerm,
        sections = listOf(
            GuideSection(
                R.string.outbound_guide_selection_weekend_section_1,
                listOf(
                    GuideItem.Step(R.string.outbound_guide_selection_weekend_section_1_item_1_title, R.string.outbound_guide_selection_weekend_section_1_item_1_text),
                    GuideItem.Step(R.string.outbound_guide_selection_weekend_section_1_item_2_title, null),
                    GuideItem.Step(R.string.outbound_guide_selection_weekend_section_1_item_3_title, R.string.outbound_guide_selection_weekend_section_1_item_3_text),
                    GuideItem.Step(R.string.outbound_guide_selection_weekend_section_1_item_4_title, R.string.outbound_guide_selection_weekend_section_1_item_4_text),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_selection_weekend_section_2,
                listOf(
                    GuideItem.Point("envelope.badge", null, R.string.outbound_guide_selection_weekend_section_2_item_1_text),
                ),
            ),
        ),
    ),
    TopThree(
        title = R.string.outbound_guide_top_three_title,
        subtitle = R.string.outbound_guide_top_three_subtitle,
        symbol = "globe.europe.africa",
        programme = ExchangeProgramme.LongTerm,
        sections = listOf(
            GuideSection(
                R.string.outbound_guide_top_three_section_1,
                listOf(
                    GuideItem.Step(null, R.string.outbound_guide_top_three_section_1_item_1_text),
                    GuideItem.Step(null, R.string.outbound_guide_top_three_section_1_item_2_text),
                    GuideItem.Step(null, R.string.outbound_guide_top_three_section_1_item_3_text),
                ),
            ),
        ),
    ),
    CampsAbout(
        title = R.string.outbound_guide_camps_about_title,
        subtitle = R.string.outbound_guide_camps_about_subtitle,
        symbol = "sun.max",
        programme = ExchangeProgramme.SummerCamps,
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_camps_about_section_1_item_1),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_camps_about_section_2,
                listOf(
                    GuideItem.Fact("calendar", R.string.outbound_guide_camps_about_section_2_item_1_title, R.string.outbound_guide_camps_about_section_2_item_1_value),
                    GuideItem.Fact("person", R.string.outbound_guide_camps_about_section_2_item_2_title, R.string.outbound_guide_camps_about_section_2_item_2_value),
                    GuideItem.Fact("sun.max", R.string.outbound_guide_camps_about_section_2_item_3_title, R.string.outbound_guide_camps_about_section_2_item_3_value),
                ),
            ),
        ),
    ),
    CampsWho(
        title = R.string.outbound_guide_camps_who_title,
        subtitle = R.string.outbound_guide_camps_who_subtitle,
        symbol = "person.3",
        programme = ExchangeProgramme.SummerCamps,
        sections = listOf(
            GuideSection(
                R.string.outbound_guide_camps_who_section_1,
                listOf(
                    GuideItem.Point("person", R.string.outbound_guide_camps_who_section_1_item_1_title, R.string.outbound_guide_camps_who_section_1_item_1_text),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_camps_who_section_2,
                listOf(
                    GuideItem.Point("person.2", R.string.outbound_guide_camps_who_section_2_item_1_title, R.string.outbound_guide_camps_who_section_2_item_1_text),
                    GuideItem.Point("heart", R.string.outbound_guide_camps_who_section_2_item_2_title, R.string.outbound_guide_camps_who_section_2_item_2_text),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_camps_who_section_3,
                listOf(
                    GuideItem.Point("globe", R.string.outbound_guide_camps_who_section_3_item_1_title, R.string.outbound_guide_camps_who_section_3_item_1_text),
                    GuideItem.Point("figure.walk", R.string.outbound_guide_camps_who_section_3_item_2_title, R.string.outbound_guide_camps_who_section_3_item_2_text),
                    GuideItem.Point("camera", R.string.outbound_guide_camps_who_section_3_item_3_title, R.string.outbound_guide_camps_who_section_3_item_3_text),
                ),
            ),
        ),
    ),
    CampsCountries(
        title = R.string.outbound_guide_camps_countries_title,
        subtitle = R.string.outbound_guide_camps_countries_subtitle,
        symbol = "globe",
        programme = ExchangeProgramme.SummerCamps,
        sections = listOf(
            GuideSection(
                R.string.outbound_guide_camps_countries_section_1,
                listOf(
                    GuideItem.Point("flag", R.string.outbound_guide_camps_countries_section_1_item_1_title, R.string.outbound_guide_camps_countries_section_1_item_1_text),
                    GuideItem.Point("flag", R.string.outbound_guide_camps_countries_section_1_item_2_title, R.string.outbound_guide_camps_countries_section_1_item_2_text),
                    GuideItem.Point("flag", R.string.outbound_guide_camps_countries_section_1_item_3_title, R.string.outbound_guide_camps_countries_section_1_item_3_text),
                    GuideItem.Point("flag", R.string.outbound_guide_camps_countries_section_1_item_4_title, R.string.outbound_guide_camps_countries_section_1_item_4_text),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_camps_countries_section_2,
                listOf(
                    GuideItem.Point("book", R.string.outbound_guide_camps_countries_section_2_item_1_title, R.string.outbound_guide_camps_countries_section_2_item_1_text),
                    GuideItem.Point("mountain.2", R.string.outbound_guide_camps_countries_section_2_item_2_title, R.string.outbound_guide_camps_countries_section_2_item_2_text),
                    GuideItem.Point("person.2", R.string.outbound_guide_camps_countries_section_2_item_3_title, R.string.outbound_guide_camps_countries_section_2_item_3_text),
                ),
            ),
        ),
    ),
    CampsSignUp(
        title = R.string.outbound_guide_camps_sign_up_title,
        subtitle = R.string.outbound_guide_camps_sign_up_subtitle,
        symbol = "envelope",
        programme = ExchangeProgramme.SummerCamps,
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_camps_sign_up_section_1_item_1),
                    GuideItem.Mail("zomerkamp@rotaryyep.nl", "Interesse in een zomerkamp"),
                ),
            ),
        ),
    ),
    FamilyAbout(
        title = R.string.outbound_guide_family_about_title,
        subtitle = R.string.outbound_guide_family_about_subtitle,
        symbol = "house",
        programme = ExchangeProgramme.FamilyToFamily,
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_family_about_section_1_item_1),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_family_about_section_2,
                listOf(
                    GuideItem.Fact("calendar", R.string.outbound_guide_family_about_section_2_item_1_title, R.string.outbound_guide_family_about_section_2_item_1_value),
                    GuideItem.Fact("person", R.string.outbound_guide_family_about_section_2_item_2_title, R.string.outbound_guide_family_about_section_2_item_2_value),
                    GuideItem.Fact("house", R.string.outbound_guide_family_about_section_2_item_3_title, R.string.outbound_guide_family_about_section_2_item_3_value),
                ),
            ),
        ),
    ),
    FamilyRequirements(
        title = R.string.outbound_guide_family_requirements_title,
        subtitle = R.string.outbound_guide_family_requirements_subtitle,
        symbol = "checkmark.seal",
        programme = ExchangeProgramme.FamilyToFamily,
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_family_requirements_section_1_item_1),
                    GuideItem.Fact("person", R.string.outbound_guide_family_requirements_section_1_item_2_title, R.string.outbound_guide_family_requirements_section_1_item_2_value),
                ),
            ),
        ),
    ),
    CountryPreference(
        title = R.string.outbound_guide_country_preference_title,
        subtitle = R.string.outbound_guide_country_preference_subtitle,
        symbol = "map",
        programme = ExchangeProgramme.FamilyToFamily,
        sections = listOf(
            GuideSection(
                R.string.outbound_guide_country_preference_section_1,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_country_preference_section_1_item_1),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_country_preference_section_2,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_country_preference_section_2_item_1),
                ),
            ),
            GuideSection(
                R.string.outbound_guide_country_preference_section_3,
                listOf(
                    GuideItem.Step(R.string.outbound_guide_country_preference_section_3_item_1_title, R.string.outbound_guide_country_preference_section_3_item_1_text),
                    GuideItem.Step(R.string.outbound_guide_country_preference_section_3_item_2_title, R.string.outbound_guide_country_preference_section_3_item_2_text),
                    GuideItem.Step(R.string.outbound_guide_country_preference_section_3_item_3_title, R.string.outbound_guide_country_preference_section_3_item_3_text),
                ),
            ),
        ),
    ),
    FamilySignUp(
        title = R.string.outbound_guide_family_sign_up_title,
        subtitle = R.string.outbound_guide_family_sign_up_subtitle,
        symbol = "envelope",
        programme = ExchangeProgramme.FamilyToFamily,
        sections = listOf(
            GuideSection(
                null,
                listOf(
                    GuideItem.Text(R.string.outbound_guide_family_sign_up_section_1_item_1),
                    GuideItem.Mail("interesse@rotaryyep.nl", "Interesse in Family to Family"),
                ),
            ),
        ),
    );
}
