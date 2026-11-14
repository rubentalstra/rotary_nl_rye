package com.caelitechnologies.rotary_nl_rye.camps

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.math.BigDecimal
import java.text.Collator
import java.time.LocalDate
import java.time.YearMonth
import java.util.Locale
import javax.inject.Inject

/**
 * The summer camps screen's state: loading the sheet, and the search,
 * filters and order a person chose. The sections are worked out off the main
 * thread whenever the camps or a filter change, so the list only draws.
 */
@HiltViewModel
class CampsViewModel @Inject constructor(private val repository: CampRepository) : ViewModel() {
    private val load = MutableStateFlow<CampsUiState.Load>(if (repository.camps.value == null) CampsUiState.Load.Loading else CampsUiState.Load.Loaded)
    private val filters = MutableStateFlow(CampFilters())

    val uiState: StateFlow<CampsUiState> =
        combine(repository.camps, filters, load) { camps, filters, load -> derive(camps.orEmpty(), filters, load) }
            .flowOn(Dispatchers.Default)
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), CampsUiState())

    init {
        if (repository.camps.value == null) refresh()
    }

    /** Loads the sheet (again, for pull to refresh); camps shown before stay when it fails. */
    fun refresh() {
        viewModelScope.launch {
            try {
                repository.refresh()
                load.value = CampsUiState.Load.Loaded
            } catch (error: CampFeed.LoadError) {
                load.value = if (repository.camps.value == null) CampsUiState.Load.Failed(error) else CampsUiState.Load.Loaded
            }
        }
    }

    fun setQuery(query: String) = filters.update { it.copy(query = query) }

    fun setAge(age: Int?) = filters.update { it.copy(age = age) }

    fun toggleCountry(country: String) = filters.update {
        it.copy(countries = if (country in it.countries) it.countries - country else it.countries + country)
    }

    fun clearCountries() = filters.update { it.copy(countries = emptySet()) }

    fun setHidesFullCamps(hides: Boolean) = filters.update { it.copy(hidesFullCamps = hides) }

    fun setShowsPastCamps(shows: Boolean) = filters.update { it.copy(showsPastCamps = shows) }

    fun setOrder(order: CampOrder) = filters.update { it.copy(order = order) }

    fun clearFilters() = filters.update { CampFilters(query = it.query, order = it.order) }

    internal companion object {
        /** What the screen shows of [camps] with [filters], on [today], in [locale]. */
        fun derive(camps: List<Camp>, filters: CampFilters, load: CampsUiState.Load, today: LocalDate = LocalDate.now(), locale: Locale = Locale.getDefault()): CampsUiState {
            val collator = Collator.getInstance(locale)
            val shown = camps.filter { camp ->
                (filters.showsPastCamps || !camp.hasEnded(today)) &&
                    (!filters.hidesFullCamps || !camp.isFull) &&
                    (filters.age?.let(camp::accepts) ?: true) &&
                    (filters.countries.isEmpty() || camp.country in filters.countries) &&
                    camp.matches(filters.query, locale)
            }
            val sections = when (filters.order) {
                CampOrder.Date -> shown.groupBy { YearMonth.from(it.start) }.map { (month, inMonth) -> CampSection(month, inMonth) }
                CampOrder.Price -> listOf(CampSection(null, shown.sortedBy { it.contribution?.amount ?: BigDecimal(Long.MAX_VALUE) }))
            }.filter { it.camps.isNotEmpty() }
            val low = camps.minOfOrNull { it.ages.first }
            val high = camps.maxOfOrNull { it.ages.last }
            return CampsUiState(
                load = load,
                filters = filters,
                sections = sections,
                pastCampCount = camps.count { it.hasEnded(today) },
                availableCountries = camps.map { it.country }.distinct().sortedWith(compareBy(collator) { countryName(it, locale) }),
                availableAges = if (low != null && high != null) low..high else null,
            )
        }
    }
}
