package com.caelitechnologies.rotary_nl_rye.news

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import javax.inject.Singleton

/** The news the app has loaded, one copy for the list and an article's page. */
@Singleton
class NewsRepository @Inject constructor(private val feed: NewsFeed) {
    private val loaded = MutableStateFlow<List<NewsItem>?>(null)

    /** The items, newest first, or null before the first load. */
    val items: StateFlow<List<NewsItem>?> = loaded.asStateFlow()

    /** Loads news.json; throws [NewsFeed.LoadError] when it cannot. */
    suspend fun refresh() {
        loaded.value = feed.items()
    }

    fun item(id: Int): NewsItem? = loaded.value?.firstOrNull { it.id == id }
}
