package com.caelitechnologies.rotary_nl_rye.news

import androidx.lifecycle.ViewModel
import androidx.navigation3.runtime.NavKey
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.serialization.Serializable

/** An article's page, by its number in news.json. */
@Serializable
data class ArticleRoute(val id: Int) : NavKey

/** An article's page: the item, from the news the app has loaded. */
@HiltViewModel(assistedFactory = ArticleViewModel.Factory::class)
class ArticleViewModel @AssistedInject constructor(@Assisted id: Int, repository: NewsRepository) : ViewModel() {
    /** The item, or null when the app has not loaded it (after process death, before a reload). */
    val item: NewsItem? = repository.item(id)

    @AssistedFactory
    interface Factory {
        fun create(id: Int): ArticleViewModel
    }
}
