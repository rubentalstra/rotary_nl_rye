package com.caelitechnologies.rotary_nl_rye.students

import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasScrollAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollToNode
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeDirection
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import com.caelitechnologies.rotary_nl_rye.core.students.GuideItem
import com.caelitechnologies.rotary_nl_rye.core.students.InboundGuide
import com.caelitechnologies.rotary_nl_rye.core.students.OutboundGuide
import com.caelitechnologies.rotary_nl_rye.ui.components.materialSymbol
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import java.time.LocalDate
import java.util.Locale
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The students pages on the JVM, in Dutch, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class StudentScreensTest {
    @get:Rule
    val compose = createComposeRule()

    private val page = hasScrollAction() and SemanticsMatcher.keyIsDefined(SemanticsProperties.VerticalScrollAxisRange)

    @Test
    fun `going abroad shows this year's class and opens a programme`() {
        var opened: ExchangeProgramme? = null
        var openedClass: StudentListRoute.Class? = null
        compose.setContent { RotaryTheme { OutboundScreen({}, { openedClass = it }, { opened = it }) } }
        compose.onNodeWithText("Klas van 2026/2027").performClick()
        assertEquals(StudentListRoute.Class(ExchangeDirection.Outbound, 2026), openedClass)
        compose.onNodeWithText("26 studenten naar 14 landen").assertIsDisplayed()
        compose.onNodeWithText("Family to Family").performClick()
        assertEquals(ExchangeProgramme.FamilyToFamily, opened)
    }

    @Test
    @Config(qualifiers = "en-w411dp-h891dp-xxhdpi")
    fun `the class size reads in English`() {
        compose.setContent { RotaryTheme { InboundScreen({}, {}, {}, {}) } }
        compose.onNodeWithText("Class of 2026/2027").assertIsDisplayed()
        compose.onNodeWithText("students from", substring = true).assertIsDisplayed()
        compose.onNodeWithContentDescription("Earlier classes").assertIsDisplayed()
    }

    @Test
    fun `an outbound programme lists its pages`() {
        var guide: OutboundGuideRoute? = null
        compose.setContent { RotaryTheme { OutboundProgrammeScreen(ExchangeProgramme.LongTerm, {}, {}, { guide = it }, {}, {}) } }
        compose.onNode(page).performScrollToNode(hasText("Selectiedag"))
        compose.onNodeWithText("Selectiedag").performClick()
        assertEquals(OutboundGuideRoute(OutboundGuide.SelectionDay), guide)
    }

    @Test
    fun `a guide numbers its steps and keeps v13's language`() {
        compose.setContent { RotaryTheme { GuideScreen(OutboundGuide.SelectionWeekend, {}) } }
        compose.onNodeWithText("Elkaar beter leren kennen").assertIsDisplayed()
        compose.onNodeWithText("1").assertIsDisplayed()
        compose.onNodeWithText("2").assertIsDisplayed()
    }

    @Test
    fun `the rebounds list opens a student`() {
        var opened: ExchangeStudent? = null
        val today = LocalDate.of(2026, 11, 14)
        val state = StudentListViewModel.derive(
            StudentListViewModel.studentsOf(StudentListRoute.Rebounds, today), "", StudentGrouping.Year,
            StudentListViewModel.Language(Locale.forLanguageTag("nl"), "Europa"),
        )
        compose.setContent { RotaryTheme { StudentListScreen("Rebound", "footer", state, {}, {}, {}, { opened = it }) } }
        compose.onNodeWithContentDescription("Groeperen").assertIsDisplayed()
        val first = state.sections[0].students[0]
        compose.onNodeWithText(first.name.toString()).performClick()
        assertEquals(first, opened)
    }

    @Test
    fun `a student's page says where they went and that they are back`() {
        val student = ExchangeStudent.rebounds(LocalDate.of(2026, 11, 14)).first { it.destination is com.caelitechnologies.rotary_nl_rye.core.students.Destination.Country }
        compose.setContent { RotaryTheme { StudentDetailScreen(student, {}, today = LocalDate.of(2026, 11, 14)) } }
        compose.onNodeWithText("Rebound").assertIsDisplayed()
        compose.onNodeWithText(student.exchangeYear.toString()).assertIsDisplayed()
        compose.onNode(page).performScrollToNode(hasText("Over mij"))
    }

    @Test
    fun `every guide symbol has a Material Symbol of its own`() {
        val star = materialSymbol("star")
        val symbols = (OutboundGuide.entries + InboundGuide.entries).flatMap { guide ->
            listOf(guide.symbol) + guide.sections.flatMap { it.items }.mapNotNull {
                when (it) {
                    is GuideItem.Point -> it.symbol
                    is GuideItem.Fact -> it.symbol
                    else -> null
                }
            }
        }
        assertTrue(symbols.isNotEmpty())
        symbols.forEach { assertNotEquals(it, star, materialSymbol(it)) }
    }
}
