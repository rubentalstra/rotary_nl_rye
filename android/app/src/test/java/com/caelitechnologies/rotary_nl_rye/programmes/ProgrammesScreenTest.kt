package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollToNode
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.hasScrollAction
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import com.caelitechnologies.rotary_nl_rye.core.programmes.PodcastEpisode
import com.caelitechnologies.rotary_nl_rye.core.programmes.PromoVideo
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The programmes, a programme's page and the podcast on the JVM, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class ProgrammesScreenTest {
    @get:Rule
    val compose = createComposeRule()

    /** The page's list, which scrolls up and down; the photo carousel scrolls sideways. */
    private val page = hasScrollAction() and SemanticsMatcher.keyIsDefined(SemanticsProperties.VerticalScrollAxisRange)

    @Test
    fun `the programmes, the podcast and the videos each open their page`() {
        var programme: ExchangeProgramme? = null
        var podcast = false
        var video: PromoVideo? = null
        compose.setContent {
            RotaryTheme { ProgrammesScreen({}, { programme = it }, { podcast = true }, { video = it }) }
        }
        compose.onNodeWithText("Uitwisselingen").assertIsDisplayed()
        compose.onNodeWithText("Family to Family").performClick()
        assertEquals(ExchangeProgramme.FamilyToFamily, programme)
        compose.onNodeWithText("Podcast").performClick()
        assertTrue(podcast)
        compose.onNodeWithText("Rotary Youth Exchange in het kort").performClick()
        assertEquals(PromoVideo.Promo, video)
    }

    @Test
    @Config(qualifiers = "en-w411dp-h891dp-xxhdpi")
    fun `the programme texts stay Dutch on an English phone`() {
        compose.setContent { RotaryTheme { ProgrammesScreen({}, {}, {}, {}) } }
        compose.onNodeWithText("Uitwisselingen").assertIsDisplayed()
        compose.onNodeWithText("Luister en kijk").assertIsDisplayed()
    }

    @Test
    fun `a programme's page has the facts with the price in euros, and how to sign up`() {
        compose.setContent { RotaryTheme { ProgrammeDetailScreen(ExchangeProgramme.LongTerm, {}, {}) } }
        compose.onNodeWithText("In het kort").assertIsDisplayed()
        compose.onNode(page).performScrollToNode(hasText("Vanaf €", substring = true) and hasText("2.400", substring = true))
        compose.onNode(page).performScrollToNode(hasText("Brazilië"))
        compose.onNode(page).performScrollToNode(hasText("interesse@rotaryyep.nl"))
    }

    @Test
    fun `the summer camps' page opens the camps`() {
        var camps = false
        compose.setContent { RotaryTheme { ProgrammeDetailScreen(ExchangeProgramme.SummerCamps, {}, { camps = true }) } }
        compose.onNode(page).performScrollToNode(hasText("Bekijk de zomerkampen"))
        compose.onNodeWithText("Bekijk de zomerkampen").performClick()
        assertTrue(camps)
    }

    @Test
    fun `the podcast lists its episodes and plays the one tapped`() {
        var played: PodcastEpisode? = null
        compose.setContent { RotaryTheme { PodcastScreen(PodcastUiState(), onToggle = { played = it }, onBack = {}) } }
        compose.onNodeWithText("Rotary Youth Exchange Podcast").assertIsDisplayed()
        compose.onNodeWithText("Ellen en Steven Stolp").performClick()
        assertEquals(PodcastEpisode.Stolp, played)
    }

    @Test
    fun `every highlight has a Material Symbol of its own`() {
        ExchangeProgramme.entries.flatMap { it.highlights.points }.filter { it.symbol != "star" }.forEach {
            assertNotEquals(it.symbol, highlightIcon("star"), highlightIcon(it.symbol))
        }
    }
}
