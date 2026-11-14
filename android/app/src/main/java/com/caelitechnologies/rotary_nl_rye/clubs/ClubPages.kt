package com.caelitechnologies.rotary_nl_rye.clubs

import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubGuide
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubTopic
import com.caelitechnologies.rotary_nl_rye.ui.components.DocumentKind
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionFooter
import com.caelitechnologies.rotary_nl_rye.ui.components.openDocument

/** A topic's page: its text, in paragraphs. */
@Composable
fun ClubTopicScreen(topic: ClubTopic, onBack: () -> Unit) {
    PageScaffold(stringResource(topic.title), onBack) {
        items(topic.paragraphs, key = { it }) { paragraph ->
            Text(stringResource(paragraph), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))
        }
    }
}

/** A role's page: what it is for, and its documents, each opening in the PDF viewer. */
@Composable
fun ClubGuideScreen(guide: ClubGuide, onBack: () -> Unit) {
    val context = LocalContext.current
    PageScaffold(stringResource(guide.title), onBack) {
        item(key = "summary") { ListSectionFooter(stringResource(guide.summary)) }
        items(guide.documents, key = { it.name }) { document ->
            DocumentItem(document, onClick = { context.openDocument(document.url, DocumentKind.Pdf) })
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun PageScaffold(title: String, onBack: () -> Unit, content: androidx.compose.foundation.lazy.LazyListScope.() -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(title) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
            )
        },
    ) { padding ->
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding), content = content)
    }
}
