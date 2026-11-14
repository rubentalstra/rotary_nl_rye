package com.caelitechnologies.rotary_nl_rye.camps

import java.math.BigDecimal
import java.time.DateTimeException
import java.time.LocalDate
import java.util.Currency
import java.util.Locale

/**
 * Turns the rows of zomerkampen.xlsx into camps, with the same rules as
 * RotaryCamps on iOS. The sheet is kept by hand, so every column is read
 * leniently:
 *
 * - Columns are found by their header, so a moved column changes nothing.
 * - Dates come as Excel serial numbers (days since 1899-12-30), as
 *   `dd/mm/yyyy` or as `dd-mm-yyyy`.
 * - Districts can be one number, a list (`3521,3522,3523`, `5950, 5960`) or a
 *   float a spreadsheet made of one (`3481.3481999999999`).
 * - Currency codes can carry spaces (`"EUR "`); an amount of 0 is "not given".
 * - Fully booked is an `x`.
 *
 * A row without a title, valid dates, a country or ages is left out: it
 * cannot be shown truthfully.
 */
internal object CampSheet {
    /** The columns, by the start of their header (lower case). */
    enum class Column(val headerPrefix: String) {
        Start("startdatum"),
        End("einddatum"),
        Title("kamp_titel"),
        Country("landcode"),
        Districts("gastdistrict"),
        AgeMin("leeftijd_min"),
        AgeMax("leeftijd_max"),
        Currency("valuta"),
        Contribution("kosten"),
        Full("volgeboekt"),
        Invitation("link"),
    }

    fun camps(sheet: Spreadsheet): List<Camp> {
        val header = sheet.rows.firstOrNull() ?: return emptyList()
        val columns = header.mapNotNull { (index, cell) ->
            val name = cell.text.trim().lowercase(Locale.ROOT)
            Column.entries.firstOrNull { name.startsWith(it.headerPrefix) }?.let { it to index }
        }.toMap()
        return sheet.rows.drop(1).mapNotNull { camp(it, columns) }.sortedBy { it.start }
    }

    private fun camp(row: Map<Int, Spreadsheet.Cell>, columns: Map<Column, Int>): Camp? {
        fun cell(column: Column) = columns[column]?.let { row[it] }
        fun text(column: Column) = cell(column)?.text?.trim().orEmpty()

        val title = text(Column.Title).ifEmpty { return null }
        val start = cell(Column.Start)?.let(::day) ?: return null
        val end = cell(Column.End)?.let(::day) ?: return null
        val country = country(text(Column.Country)) ?: return null
        val minimum = integer(text(Column.AgeMin)) ?: return null
        val maximum = integer(text(Column.AgeMax)) ?: return null
        if (minimum > maximum) return null
        return Camp(
            title = title,
            start = start,
            end = end,
            country = country,
            hostDistricts = districts(text(Column.Districts)),
            ages = minimum..maximum,
            contribution = contribution(text(Column.Contribution), text(Column.Currency)),
            isFull = text(Column.Full).lowercase(Locale.ROOT) == "x",
            invitation = invitation(text(Column.Invitation)),
        )
    }

    /** A calendar day from an Excel serial number, `dd/mm/yyyy` or `dd-mm-yyyy`. */
    fun day(cell: Spreadsheet.Cell): LocalDate? {
        val text = cell.text.trim()
        // Only a number cell holds a serial; a number typed as text is no date.
        if (cell.isNumber) {
            text.toDoubleOrNull()?.let { serial -> return EXCEL_EPOCH.plusDays(serial.toLong()) }
        }
        val parts = text.split('/', '-').mapNotNull { it.trim().toIntOrNull() }
        if (parts.size != 3) return null
        return try {
            LocalDate.of(parts[2], parts[1], parts[0])
        } catch (_: DateTimeException) {
            null
        }
    }

    /** A country from its ISO 3166-1 alpha-2 code, any case. */
    fun country(text: String): String? = text.uppercase(Locale.ROOT).takeIf { it in ISO_COUNTRIES }

    /** The district numbers in a cell: a list, and floats cut to their whole part. */
    fun districts(text: String): List<Int> =
        text.split(',').mapNotNull { part ->
            val trimmed = part.trim()
            trimmed.toIntOrNull() ?: trimmed.toDoubleOrNull()?.toInt()
        }.filter { it > 0 }

    /** An amount in a known currency; 0 or an unknown currency is no amount. */
    fun contribution(amount: String, currency: String): Camp.Contribution? {
        val value = amount.trim().toBigDecimalOrNull()?.takeIf { it > BigDecimal.ZERO } ?: return null
        val code = currency.trim().uppercase(Locale.ROOT)
        val known = Currency.getAvailableCurrencies().firstOrNull { it.currencyCode == code } ?: return null
        return Camp.Contribution(value, known)
    }

    /** An http(s) link; anything else is no invitation. */
    fun invitation(text: String): String? =
        text.takeIf { it.startsWith("https://", ignoreCase = true) || it.startsWith("http://", ignoreCase = true) }

    private fun integer(text: String): Int? = text.toIntOrNull() ?: text.toDoubleOrNull()?.toInt()

    /** Excel's day 0 in the 1900 date system. */
    private val EXCEL_EPOCH: LocalDate = LocalDate.of(1899, 12, 30)

    private val ISO_COUNTRIES: Set<String> = Locale.getISOCountries().toSet()
}
