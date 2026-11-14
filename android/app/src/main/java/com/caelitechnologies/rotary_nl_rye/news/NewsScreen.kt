package com.caelitechnologies.rotary_nl_rye.news

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil3.compose.AsyncImage
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.DocumentKind
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.LoadFailed
import com.caelitechnologies.rotary_nl_rye.ui.components.openDocument

/** The news, connected to its ViewModel; a PDF opens in the PDF viewer, an article on its own page. */
@Composable
fun NewsRoute(onBack: () -> Unit, onArticle: (NewsItem) -> Unit) {
    val viewModel = hiltViewModel<NewsViewModel>()
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    val context = LocalContext.current
    NewsScreen(
        state = state,
        onBack = onBack,
        onRefresh = viewModel::refresh,
        onItem = { item ->
            when (val content = item.content) {
                is NewsItem.Content.Pdf -> context.openDocument(content.url, DocumentKind.Pdf)
                is NewsItem.Content.Article -> onArticle(item)
            }
        },
    )
}

/**
 * The news: the newest item large with its cover, then the rest. Covers are
 * banners with text, so they are shown whole, on white.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NewsScreen(state: NewsUiState, onBack: () -> Unit, onRefresh: () -> Unit, onItem: (NewsItem) -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.home_news)) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
            )
        },
    ) { padding ->
        when (val load = state.load) {
            NewsUiState.Load.Loading -> Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
            is NewsUiState.Load.Failed -> {
                val offline = load.error is NewsFeed.LoadError.Offline
                LoadFailed(
                    offline = offline,
                    title = stringResource(if (offline) R.string.camps_offline_title else R.string.news_unavailable_title),
                    message = stringResource(if (offline) R.string.news_offline else R.string.news_unavailable),
                    onRetry = onRefresh,
                    modifier = Modifier.padding(padding),
                )
            }
            NewsUiState.Load.Loaded -> PullToRefreshBox(isRefreshing = false, onRefresh = onRefresh, modifier = Modifier.fillMaxSize().padding(top = padding.calculateTopPadding())) {
                LazyColumn(
                    contentPadding = PaddingValues(bottom = padding.calculateBottomPadding()),
                    modifier = Modifier
                        .fillMaxSize()
                        .consumeWindowInsets(PaddingValues(bottom = padding.calculateBottomPadding())),
                ) {
                    state.items.firstOrNull()?.let { latest ->
                        item(key = "latest-header") { ListSectionHeader(stringResource(R.string.news_latest)) }
                        item(key = latest.id) { LatestItem(latest, onClick = { onItem(latest) }) }
                    }
                    if (state.items.size > 1) {
                        item(key = "earlier-header") { ListSectionHeader(stringResource(R.string.news_earlier)) }
                        items(state.items.drop(1), key = { it.id }, contentType = { "item" }) { item ->
                            NewsListItem(item, onClick = { onItem(item) })
                        }
                    }
                }
            }
        }
    }
}

/** The newest item: its cover whole on white, its title and summary. */
@Composable
private fun LatestItem(item: NewsItem, onClick: () -> Unit) {
    Card(onClick = onClick, modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp)) {
        Cover(item.coverUrl, Modifier.fillMaxWidth().aspectRatio(16f / 9f))
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(item.title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
            item.summary?.let { Text(it, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 3) }
            Kind(item)
        }
    }
}

/** An earlier item: a small cover, the title, and whether it is a PDF or an article. */
@Composable
private fun NewsListItem(item: NewsItem, onClick: () -> Unit) {
    ListItem(
        leadingContent = { Cover(item.coverUrl, Modifier.size(width = 96.dp, height = 54.dp).clip(MaterialTheme.shapes.small)) },
        headlineContent = { Text(item.title) },
        supportingContent = { Kind(item) },
        modifier = Modifier.clickable(onClick = onClick),
    )
}

/** "PDF" or "Artikel", with its symbol. */
@Composable
private fun Kind(item: NewsItem) {
    androidx.compose.foundation.layout.Row(horizontalArrangement = Arrangement.spacedBy(4.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(painterResource(if (item.isPdf) R.drawable.ic_description else R.drawable.ic_dest_news), contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(16.dp))
        Text(stringResource(if (item.isPdf) R.string.news_pdf else R.string.news_article), style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

/** A cover shown whole, on white: covers are banners with text. */
@Composable
private fun Cover(url: String?, modifier: Modifier) {
    AsyncImage(model = url, contentDescription = null, contentScale = ContentScale.Fit, modifier = modifier.background(Color.White))
}
