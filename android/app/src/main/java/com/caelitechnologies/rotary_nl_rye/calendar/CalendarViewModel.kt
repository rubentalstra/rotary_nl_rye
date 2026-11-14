package com.caelitechnologies.rotary_nl_rye.calendar

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
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.YearMonth
import java.time.ZoneId
import javax.inject.Inject

/** What the calendar screen shows: derived in [CalendarViewModel], never while drawing. */
data class CalendarUiState(
    val load: Load = Load.Loading,
    /** What is happening now. */
    val ongoing: List<CalendarEvent> = emptyList(),
    /** What is coming (and, when asked, what is over), per month of the first day. */
    val months: List<Pair<YearMonth, List<CalendarEvent>>> = emptyList(),
    val pastEventCount: Int = 0,
    val showsPastEvents: Boolean = false,
) {
    sealed interface Load {
        data object Loading : Load

        data object Loaded : Load

        data class Failed(val error: CalendarFeed.LoadError) : Load
    }
}

/** The calendar screen's state: loading the calendar, and what is on now, coming, and over. */
@HiltViewModel
class CalendarViewModel @Inject constructor(private val repository: CalendarRepository) : ViewModel() {
    private val load = MutableStateFlow<CalendarUiState.Load>(if (repository.events.value == null) CalendarUiState.Load.Loading else CalendarUiState.Load.Loaded)
    private val showsPast = MutableStateFlow(false)

    val uiState: StateFlow<CalendarUiState> =
        combine(repository.events, load, showsPast) { events, load, past -> derive(events.orEmpty(), load, past) }
            .flowOn(Dispatchers.Default)
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), CalendarUiState())

    init {
        if (repository.events.value == null) refresh()
    }

    fun refresh() {
        viewModelScope.launch {
            try {
                repository.refresh()
                load.value = CalendarUiState.Load.Loaded
            } catch (error: CalendarFeed.LoadError) {
                load.value = if (repository.events.value == null) CalendarUiState.Load.Failed(error) else CalendarUiState.Load.Loaded
            }
        }
    }

    fun showPastEvents() {
        showsPast.value = true
    }

    internal companion object {
        fun derive(events: List<CalendarEvent>, load: CalendarUiState.Load, showsPast: Boolean, now: Instant = Instant.now(), zone: ZoneId = ZoneId.systemDefault()): CalendarUiState {
            val ongoing = events.filter { it.isOngoing(now, zone) }
            val past = events.filter { it.hasEnded(now, zone) }
            val listed = events.filter { it !in ongoing && (showsPast || it !in past) }
            return CalendarUiState(
                load = load,
                ongoing = ongoing,
                months = listed.groupBy { YearMonth.from(it.firstDay(zone)) }.toList(),
                pastEventCount = past.size,
                showsPastEvents = showsPast,
            )
        }
    }
}
