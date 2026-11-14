package com.caelitechnologies.rotary_nl_rye.camps

import java.time.YearMonth

/** What the camps screen shows: derived in [CampsViewModel], never while drawing. */
data class CampsUiState(
    val load: Load = Load.Loading,
    val filters: CampFilters = CampFilters(),
    /** The camps that pass the search and filters, in sections per month of their first day (by date), or one section (by price). */
    val sections: List<CampSection> = emptyList(),
    /** How many camps are over, for the chip that shows them. */
    val pastCampCount: Int = 0,
    /** The countries in the sheet, by their name in the app's language. */
    val availableCountries: List<String> = emptyList(),
    /** The youngest and oldest age any camp accepts. */
    val availableAges: IntRange? = null,
) {
    sealed interface Load {
        data object Loading : Load

        data object Loaded : Load

        data class Failed(val error: CampFeed.LoadError) : Load
    }
}

/** The search, filters and order a person chose; they survive rotation through the ViewModel. */
data class CampFilters(
    val query: String = "",
    /** Only camps a person of this age may join; null for every age. */
    val age: Int? = null,
    /** Only camps in these countries; empty for every country. */
    val countries: Set<String> = emptySet(),
    val hidesFullCamps: Boolean = false,
    val showsPastCamps: Boolean = false,
    val order: CampOrder = CampOrder.Date,
) {
    /** Whether any filter narrows the list (the search and order aside). */
    val isFiltered: Boolean get() = age != null || countries.isNotEmpty() || hidesFullCamps || showsPastCamps
}

/** How the list is ordered. */
enum class CampOrder {
    /** By first day, in sections per month. */
    Date,

    /** By contribution, cheapest first; camps without an amount last. */
    Price,
}

/** A section of the list: the camps starting in one month, or all of them when ordered by price. */
data class CampSection(val month: YearMonth?, val camps: List<Camp>)
