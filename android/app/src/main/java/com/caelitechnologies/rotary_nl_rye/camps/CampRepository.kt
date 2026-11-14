package com.caelitechnologies.rotary_nl_rye.camps

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import javax.inject.Singleton

/**
 * The camps the app has loaded, one copy for every screen: the list and a
 * camp's page read the same camps. A failed refresh keeps the camps shown
 * before.
 */
@Singleton
class CampRepository @Inject constructor(private val feed: CampFeed) {
    private val loaded = MutableStateFlow<List<Camp>?>(null)

    /** The camps, or null before the first load. */
    val camps: StateFlow<List<Camp>?> = loaded.asStateFlow()

    /** Loads the sheet; throws [CampFeed.LoadError] when it cannot. */
    suspend fun refresh() {
        loaded.value = feed.camps()
    }

    fun camp(id: Camp.Id): Camp? = loaded.value?.firstOrNull { it.id == id }
}
