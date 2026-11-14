package com.caelitechnologies.rotary_nl_rye.calendar

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import javax.inject.Singleton

/** The calendar's events the app has loaded, one copy for the list and an event's page. */
@Singleton
class CalendarRepository @Inject constructor(private val feed: CalendarFeed) {
    private val loaded = MutableStateFlow<List<CalendarEvent>?>(null)

    /** The events in order of their start, or null before the first load. */
    val events: StateFlow<List<CalendarEvent>?> = loaded.asStateFlow()

    /** Loads the calendar; throws [CalendarFeed.LoadError] when it cannot. */
    suspend fun refresh() {
        loaded.value = feed.events()
    }

    fun event(id: String): CalendarEvent? = loaded.value?.firstOrNull { it.id == id }
}
