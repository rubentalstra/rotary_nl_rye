package com.caelitechnologies.rotary_nl_rye.students

import androidx.compose.runtime.Immutable
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.caelitechnologies.rotary_nl_rye.core.students.Destination
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeDirection
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeYear
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel
import java.text.Collator
import java.time.LocalDate
import java.util.Locale
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.stateIn

/**
 * A list of students in sections per country or per exchange year, narrowed
 * by a search on name or country. The sections are worked out off the main
 * thread whenever the search or grouping changes, so the list only draws.
 */
@HiltViewModel(assistedFactory = StudentListViewModel.Factory::class)
class StudentListViewModel @AssistedInject constructor(@Assisted route: StudentListRoute) : ViewModel() {
    private val students: List<ExchangeStudent> = studentsOf(route, LocalDate.now())
    private val query = MutableStateFlow("")
    private val grouping = MutableStateFlow(StudentGrouping.Country)
    private val language = MutableStateFlow(Language(Locale.getDefault(), europe = "Europa"))

    val uiState: StateFlow<StudentListUiState> =
        combine(query, grouping, language) { query, grouping, language -> derive(students, query, grouping, language) }
            .flowOn(Dispatchers.Default)
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), derive(students, "", StudentGrouping.Country, language.value))

    fun setQuery(text: String) {
        query.value = text
    }

    fun setGrouping(value: StudentGrouping) {
        grouping.value = value
    }

    /** The app's language, for country names, their order and searching them. */
    fun setLanguage(value: Language) {
        language.value = value
    }

    /** The app's locale, and how it writes "Europe" for a student who went somewhere in Europe. */
    data class Language(val locale: Locale, val europe: String)

    @AssistedFactory
    interface Factory {
        fun create(route: StudentListRoute): StudentListViewModel
    }

    internal companion object {
        fun studentsOf(route: StudentListRoute, today: LocalDate): List<ExchangeStudent> = when (route) {
            is StudentListRoute.Class -> ExchangeStudent.students(route.direction, route.year)
            StudentListRoute.Rebounds -> ExchangeStudent.rebounds(today)
            StudentListRoute.EarlierInbounds -> ExchangeStudent.returned(ExchangeDirection.Inbound, today)
        }

        /** The sections of [students] matching [query], grouped by [grouping], with names in [language]. */
        fun derive(students: List<ExchangeStudent>, query: String, grouping: StudentGrouping, language: Language): StudentListUiState {
            val collator = Collator.getInstance(language.locale).apply { strength = Collator.PRIMARY }
            val needle = query.trim()
            fun countryName(destination: Destination) = destination.name(language.locale, language.europe)
            val matching = if (needle.isEmpty()) students else students.filter {
                it.name.toString().contains(needle, ignoreCase = true) || countryName(it.listCountry).contains(needle, ignoreCase = true)
            }
            val byName = compareBy(collator) { student: ExchangeStudent -> student.name.toString() }
            val sections = when (grouping) {
                StudentGrouping.Country -> matching.groupBy { it.listCountry }
                    .map { (country, group) -> StudentSection.Country(country, group.sortedWith(byName)) }
                    .sortedWith(compareBy(collator) { countryName(it.country) })
                StudentGrouping.Year -> matching.groupBy { it.exchangeYear }
                    .toSortedMap(compareByDescending { it })
                    .map { (year, group) -> StudentSection.Year(year, group.sortedWith(byName)) }
            }
            val spansYears = students.map { it.exchangeYear }.distinct().size > 1
            return StudentListUiState(sections, grouping, spansYears, isSearching = needle.isNotEmpty())
        }
    }
}

/** How a list of students is grouped. */
enum class StudentGrouping { Country, Year }

/** A section of a list of students: a country, or an exchange year. */
@Immutable
sealed interface StudentSection {
    val students: List<ExchangeStudent>

    data class Country(val country: Destination, override val students: List<ExchangeStudent>) : StudentSection

    data class Year(val year: ExchangeYear, override val students: List<ExchangeStudent>) : StudentSection
}

/** What a list of students shows. */
@Immutable
data class StudentListUiState(
    val sections: List<StudentSection> = emptyList(),
    val grouping: StudentGrouping = StudentGrouping.Country,
    /** Whether the students are of more than one exchange year, so grouping by year means something. */
    val spansYears: Boolean = false,
    val isSearching: Boolean = false,
) {
    /** What each row says under the name. */
    val detail: StudentDetail
        get() = when (grouping) {
            StudentGrouping.Country -> if (spansYears) StudentDetail.Year else StudentDetail.Bio
            StudentGrouping.Year -> StudentDetail.Country
        }
}
