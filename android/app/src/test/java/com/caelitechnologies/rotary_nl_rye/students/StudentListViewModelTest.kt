package com.caelitechnologies.rotary_nl_rye.students

import com.caelitechnologies.rotary_nl_rye.core.students.Destination
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeDirection
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import java.time.LocalDate
import java.util.Locale
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** How a list of students is grouped and searched, on the JVM. */
class StudentListViewModelTest {
    private val dutch = StudentListViewModel.Language(Locale.forLanguageTag("nl"), europe = "Europa")
    private val november2026 = LocalDate.of(2026, 11, 14)

    @Test
    fun `the rebounds are grouped by country in alphabetical order, each country once`() {
        val rebounds = StudentListViewModel.studentsOf(StudentListRoute.Rebounds, november2026)
        val state = StudentListViewModel.derive(rebounds, "", StudentGrouping.Country, dutch)
        val names = state.sections.map { (it as StudentSection.Country).country.name(dutch.locale, dutch.europe) }
        assertEquals(names.sortedWith(java.text.Collator.getInstance(dutch.locale)), names)
        assertEquals(rebounds.size, state.sections.sumOf { it.students.size })
        assertTrue(state.spansYears)
        assertEquals(StudentDetail.Year, state.detail)
    }

    @Test
    fun `by year the newest year comes first`() {
        val rebounds = StudentListViewModel.studentsOf(StudentListRoute.Rebounds, november2026)
        val state = StudentListViewModel.derive(rebounds, "", StudentGrouping.Year, dutch)
        assertEquals(listOf(2025, 2024, 2023, 2022), state.sections.map { (it as StudentSection.Year).year.startYear })
        assertEquals(StudentDetail.Country, state.detail)
    }

    @Test
    fun `a class is one year, so its rows show the bio`() {
        val state = StudentListViewModel.derive(
            StudentListViewModel.studentsOf(StudentListRoute.Class(ExchangeDirection.Outbound, 2026), november2026),
            "", StudentGrouping.Country, dutch,
        )
        assertFalse(state.spansYears)
        assertEquals(StudentDetail.Bio, state.detail)
    }

    @Test
    fun `search finds students by country in the app's language`() {
        val state = StudentListViewModel.derive(ExchangeStudent.outbound, "brazil", StudentGrouping.Country, dutch)
        assertTrue(state.sections.isNotEmpty())
        assertTrue(state.sections.all { (it as StudentSection.Country).country == Destination.Country("BR") })
    }

    @Test
    fun `search finds a student by name, and nothing for nonsense`() {
        val student = ExchangeStudent.outbound[0]
        val found = StudentListViewModel.derive(ExchangeStudent.outbound, student.name.family, StudentGrouping.Country, dutch)
        assertTrue(found.sections.flatMap { it.students }.contains(student))
        assertTrue(StudentListViewModel.derive(ExchangeStudent.outbound, "zzzz", StudentGrouping.Country, dutch).sections.isEmpty())
    }
}
