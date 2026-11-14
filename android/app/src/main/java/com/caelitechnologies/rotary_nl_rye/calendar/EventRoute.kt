package com.caelitechnologies.rotary_nl_rye.calendar

import androidx.lifecycle.ViewModel
import androidx.navigation3.runtime.NavKey
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.serialization.Serializable

/** An event's page, by Google Calendar's id of the event. */
@Serializable
data class EventRoute(val id: String) : NavKey

/** An event's page: the event, from the calendar the app has loaded. */
@HiltViewModel(assistedFactory = EventViewModel.Factory::class)
class EventViewModel @AssistedInject constructor(@Assisted id: String, repository: CalendarRepository) : ViewModel() {
    val event: CalendarEvent? = repository.event(id)

    @AssistedFactory
    interface Factory {
        fun create(id: String): EventViewModel
    }
}
