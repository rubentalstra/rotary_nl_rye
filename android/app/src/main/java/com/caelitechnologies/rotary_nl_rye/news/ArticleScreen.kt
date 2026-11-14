package com.caelitechnologies.rotary_nl_rye.news

import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import coil3.compose.AsyncImage
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.DocumentKind
import com.caelitechnologies.rotary_nl_rye.ui.components.openDocument

/** An article, connected to its ViewModel; back when it is not loaded (after the process was ended). */
@Composable
fun ArticleRouteScreen(route: ArticleRoute, onBack: () -> Unit) {
    val viewModel = hiltViewModel<ArticleViewModel, ArticleViewModel.Factory>(key = route.toString()) { it.create(route.id) }
    val item = viewModel.item
    val article = item?.content as? NewsItem.Content.Article
    if (item == null || article == null) {
        LaunchedEffect(Unit) { onBack() }
    } else {
        ArticleScreen(item.title, article.blocks, onBack)
    }
}

/** An article read in the app: its title, then its headings, paragraphs, images and videos in order. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ArticleScreen(title: String, blocks: List<NewsItem.ArticleBlock>, onBack: () -> Unit) {
    val context = LocalContext.current
    Scaffold(
        topBar = {
            TopAppBar(
                title = {},
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
            )
        },
    ) { padding ->
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding)) {
            item(key = "title") {
                Text(title, style = MaterialTheme.typography.headlineMedium, modifier = Modifier.padding(16.dp).semantics { heading() })
            }
            itemsIndexed(blocks, key = { index, _ -> index }, contentType = { _, block -> block::class }) { _, block ->
                val inset = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                when (block) {
                    is NewsItem.ArticleBlock.Heading -> Text(block.text, style = MaterialTheme.typography.titleLarge, modifier = inset.padding(top = 12.dp).semantics { heading() })
                    is NewsItem.ArticleBlock.Paragraph -> Text(block.text, style = MaterialTheme.typography.bodyLarge, modifier = inset)
                    is NewsItem.ArticleBlock.Image -> AsyncImage(
                        model = block.url,
                        contentDescription = null,
                        contentScale = ContentScale.FillWidth,
                        modifier = inset.fillMaxWidth().clip(MaterialTheme.shapes.medium),
                    )
                    is NewsItem.ArticleBlock.Video -> FilledTonalButton(onClick = { context.openDocument(block.url, DocumentKind.Video) }, modifier = inset) {
                        Icon(painterResource(R.drawable.ic_play_circle), contentDescription = null, modifier = Modifier.size(18.dp))
                        Text(stringResource(R.string.news_play_video), modifier = Modifier.padding(start = 8.dp))
                    }
                }
            }
        }
    }
}
