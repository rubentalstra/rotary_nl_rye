package com.caelitechnologies.rotary_nl_rye.news

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What the news screen shows. */
data class NewsUiState(val load: Load = Load.Loading, val items: List<NewsItem> = emptyList()) {
    sealed interface Load {
        data object Loading : Load

        data object Loaded : Load

        data class Failed(val error: NewsFeed.LoadError) : Load
    }
}

/** The news screen's state: loading news.json, and the items, newest first. */
@HiltViewModel
class NewsViewModel @Inject constructor(private val repository: NewsRepository) : ViewModel() {
    private val load = MutableStateFlow<NewsUiState.Load>(if (repository.items.value == null) NewsUiState.Load.Loading else NewsUiState.Load.Loaded)

    val uiState: StateFlow<NewsUiState> = combine(repository.items, load) { items, load -> NewsUiState(load, items.orEmpty()) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), NewsUiState())

    init {
        if (repository.items.value == null) refresh()
    }

    /** Loads the news (again, for pull to refresh); items shown before stay when it fails. */
    fun refresh() {
        viewModelScope.launch {
            try {
                repository.refresh()
                load.value = NewsUiState.Load.Loaded
            } catch (error: NewsFeed.LoadError) {
                load.value = if (repository.items.value == null) NewsUiState.Load.Failed(error) else NewsUiState.Load.Loaded
            }
        }
    }
}
