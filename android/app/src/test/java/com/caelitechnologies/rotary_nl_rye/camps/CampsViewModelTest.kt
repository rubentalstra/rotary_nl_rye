package com.caelitechnologies.rotary_nl_rye.camps

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.math.BigDecimal
import java.time.LocalDate
import java.time.YearMonth
import java.util.Locale

/** What the camps screen shows for a search and filters, on the published sheet, on 14 November 2026. */
class CampsViewModelTest {
    private val camps = CampFeed.read(checkNotNull(javaClass.getResourceAsStream("/zomerkampen.xlsx")).readBytes())
    private val today = LocalDate.of(2026, 11, 14)
    private val dutch = Locale.forLanguageTag("nl")

    private fun derive(filters: CampFilters = CampFilters()) =
        CampsViewModel.derive(camps, filters, CampsUiState.Load.Loaded, today, dutch)

    private val CampsUiState.shown get() = sections.flatMap { it.camps }

    @Test
    fun `past camps are left out until asked for, and counted`() {
        val state = derive()
        assertTrue(state.shown.none { it.hasEnded(today) })
        assertEquals(camps.count { it.hasEnded(today) }, state.pastCampCount)
        assertEquals(camps.size, derive(CampFilters(showsPastCamps = true)).shown.size)
    }

    @Test
    fun `camps are in sections per month of their first day`() {
        derive(CampFilters(showsPastCamps = true)).sections.forEach { section ->
            assertTrue(section.camps.all { YearMonth.from(it.start) == section.month })
        }
    }

    @Test
    fun `the age filter keeps only camps that accept that age`() {
        assertTrue(derive(CampFilters(age = 15, showsPastCamps = true)).shown.all { it.accepts(15) })
    }

    @Test
    fun `full camps can be hidden`() {
        assertTrue(derive(CampFilters(hidesFullCamps = true, showsPastCamps = true)).shown.none { it.isFull })
    }

    @Test
    fun `the country filter and the search narrow the list`() {
        assertTrue(derive(CampFilters(countries = setOf("IN"), showsPastCamps = true)).shown.all { it.country == "IN" })
        assertTrue(derive(CampFilters(query = "india", showsPastCamps = true)).shown.isNotEmpty())
        assertTrue(derive(CampFilters(query = "zzz", showsPastCamps = true)).sections.isEmpty())
    }

    @Test
    fun `by price, the cheapest first and camps without an amount last`() {
        val shown = derive(CampFilters(order = CampOrder.Price, showsPastCamps = true)).shown
        val amounts = shown.map { it.contribution?.amount ?: BigDecimal(Long.MAX_VALUE) }
        assertEquals(amounts.sorted(), amounts)
    }

    @Test
    fun `the countries are in alphabetical order in the app's language`() {
        val names = derive().availableCountries.map { countryName(it, dutch) }
        assertEquals(names.sortedWith(java.text.Collator.getInstance(dutch)), names)
    }
}
