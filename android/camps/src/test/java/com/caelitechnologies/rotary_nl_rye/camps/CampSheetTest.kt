package com.caelitechnologies.rotary_nl_rye.camps

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertThrows
import org.junit.Assert.assertTrue
import org.junit.Test
import java.math.BigDecimal
import java.time.LocalDate
import java.util.Currency
import java.util.Locale

/** RotaryCamps' CampSheetTests, ported: the published sheet of 16 September 2026 and the lenient rules. */
class CampSheetTest {
    private val camps: List<Camp> = CampSheet.camps(
        Spreadsheet.read(checkNotNull(javaClass.getResourceAsStream("/zomerkampen.xlsx")).readBytes()),
    )

    private fun camp(title: String) = camps.first { it.title == title }

    private fun cell(text: String, isNumber: Boolean = false) = Spreadsheet.Cell(text, isNumber)

    @Test
    fun `every one of the 74 rows becomes a camp`() = assertEquals(74, camps.size)

    @Test
    fun `camps are in order of their first day`() = assertEquals(camps.map { it.start }.sorted(), camps.map { it.start })

    @Test
    fun `a date written as dd slash mm slash yyyy is read`() {
        val taiwan = camps.first { it.start == LocalDate.of(2025, 12, 26) }
        assertEquals(LocalDate.of(2026, 1, 8), taiwan.end)
    }

    @Test
    fun `a date written as dd-mm-yyyy is read`() {
        assertTrue(camps.any { it.start == LocalDate.of(2026, 8, 1) && it.end == LocalDate.of(2026, 8, 15) })
    }

    @Test
    fun `an Excel serial number is a day since 1899-12-30`() {
        assertEquals(LocalDate.of(2026, 6, 21), CampSheet.day(cell("46194", isNumber = true)))
        assertEquals(LocalDate.of(2025, 1, 1), CampSheet.day(cell("45658", isNumber = true)))
    }

    @Test
    fun `a date that does not exist is no date`() {
        listOf("31/02/2026", "2026", "", "soon").forEach { assertNull(it, CampSheet.day(cell(it))) }
    }

    @Test
    fun `districts are read as written, lists and floats included`() {
        assertEquals(listOf(3521, 3522, 3523), CampSheet.districts("3521,3522,3523"))
        assertEquals(listOf(5950, 5960), CampSheet.districts("5950, 5960"))
        assertEquals(listOf(3481), CampSheet.districts("3481.3481999999999"))
        assertEquals(listOf(2042), CampSheet.districts("2042"))
        assertEquals(emptyList<Int>(), CampSheet.districts(""))
    }

    @Test
    fun `a currency with a trailing space is still the currency`() {
        assertEquals(Camp.Contribution(BigDecimal("450"), Currency.getInstance("EUR")), CampSheet.contribution("450", "EUR "))
    }

    @Test
    fun `no amount or an unknown currency is no contribution`() {
        assertNull(CampSheet.contribution("0", "EUR"))
        assertNull(CampSheet.contribution("", "EUR"))
        assertNull(CampSheet.contribution("450", "XYZ"))
    }

    @Test
    fun `fully booked is an x`() {
        assertTrue(camp("Exploring Finnish Lapland in the Spring").isFull)
        assertFalse(camp("Discover India International cultural Youth Camp").isFull)
        assertEquals(18, camps.count { it.isFull })
    }

    @Test
    fun `invitations are PDFs or websites, and some camps have none`() {
        assertEquals(68, camps.count { it.invitationIsPdf })
        assertEquals(2, camps.count { it.invitation != null && !it.invitationIsPdf })
        assertEquals(4, camps.count { it.invitation == null })
    }

    @Test
    fun `ages and country are typed`() {
        val india = camp("Discover India International cultural Youth Camp")
        assertEquals(16..22, india.ages)
        assertEquals("IN", india.country)
        assertTrue(india.accepts(16))
        assertFalse(india.accepts(15))
    }

    @Test
    fun `search finds the title and the country's name`() {
        val india = camp("Discover India International cultural Youth Camp")
        assertTrue(india.matches("india", Locale.ENGLISH))
        assertTrue(india.matches("indi", Locale.forLanguageTag("nl")))
        assertFalse(india.matches("Brazilië", Locale.forLanguageTag("nl")))
    }

    @Test
    fun `columns are found by their header, wherever they are`() {
        val sheet = Spreadsheet(
            listOf(
                mapOf(0 to cell("kamp_titel"), 1 to cell("landcode_iso3166_1_alpha2"), 2 to cell("einddatum_dd_mm_jjjj"), 3 to cell("startdatum_dd_mm_jjjj"), 4 to cell("leeftijd_min"), 5 to cell("leeftijd_max")),
                mapOf(0 to cell("Moved columns"), 1 to cell("nl"), 2 to cell("20/07/2026"), 3 to cell("10/07/2026"), 4 to cell("15", true), 5 to cell("18", true)),
            ),
        )
        val camp = CampSheet.camps(sheet).single()
        assertEquals(LocalDate.of(2026, 7, 10), camp.start)
        assertEquals("NL", camp.country)
    }

    @Test
    fun `a cell reference names its column`() {
        assertEquals(0, columnIndex("A1"))
        assertEquals(10, columnIndex("K35"))
        assertEquals(25, columnIndex("Z9"))
        assertEquals(26, columnIndex("AA2"))
        assertNull(columnIndex("12"))
    }

    @Test
    fun `a file that is no spreadsheet is refused`() {
        assertThrows(Spreadsheet.ReadError.NotAnArchive::class.java) { Spreadsheet.read("<html>Not found</html>".toByteArray()) }
    }
}
