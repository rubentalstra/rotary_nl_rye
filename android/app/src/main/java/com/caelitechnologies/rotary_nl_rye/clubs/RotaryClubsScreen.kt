package com.caelitechnologies.rotary_nl_rye.clubs

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.input.clearText
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SearchBar
import androidx.compose.material3.SearchBarDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberSearchBarState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalResources
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubDocument
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubGuide
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubTopic
import com.caelitechnologies.rotary_nl_rye.core.organisation.Organisation
import com.caelitechnologies.rotary_nl_rye.ui.components.DocumentKind
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.OrganisationLogo
import com.caelitechnologies.rotary_nl_rye.ui.components.openDocument
import java.text.Normalizer
import java.util.Locale

/**
 * For Rotary clubs that host a student: the welcome and what hosting means
 * on this page, and a page per role with its documents. A search finds a
 * topic or a document across every role.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RotaryClubsScreen(onBack: () -> Unit, onTopic: (ClubTopic) -> Unit, onGuide: (ClubGuide) -> Unit) {
    val query = rememberTextFieldState()
    val searchBarState = rememberSearchBarState()
    val resources = LocalResources.current
    val text = query.text.toString().trim()
    val topics = remember(text, resources) { ClubTopic.entries.filter { resources.getString(it.title).matches(text) } }
    val documents = remember(text, resources) { ClubDocument.entries.filter { resources.getString(it.title).matches(text) } }
    Scaffold(
        topBar = {
            Column(Modifier.background(MaterialTheme.colorScheme.surface)) {
                TopAppBar(
                    title = { Text(stringResource(R.string.home_rotary_clubs)) },
                    navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
                )
                SearchBar(
                    state = searchBarState,
                    inputField = {
                        SearchBarDefaults.InputField(
                            textFieldState = query,
                            searchBarState = searchBarState,
                            onSearch = {},
                            placeholder = { Text(stringResource(R.string.clubs_search)) },
                            leadingIcon = { Icon(painterResource(R.drawable.ic_search), contentDescription = null) },
                            trailingIcon = {
                                if (text.isNotEmpty()) {
                                    IconButton(onClick = { query.clearText() }) { Icon(painterResource(R.drawable.ic_close), stringResource(R.string.contact_search_clear)) }
                                }
                            },
                        )
                    },
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                )
            }
        },
    ) { padding ->
        val context = LocalContext.current
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding)) {
            if (text.isEmpty()) {
                item(key = "welcome") { Welcome() }
                topicsSection(ClubTopic.entries, onTopic)
                item(key = "documents") { ListSectionHeader(stringResource(R.string.clubs_documents)) }
                items(ClubGuide.entries, key = { "guide-${it.name}" }) { guide ->
                    ListItem(
                        headlineContent = { Text(stringResource(guide.title)) },
                        supportingContent = { Text(stringResource(guide.summary)) },
                        leadingContent = { Icon(painterResource(guide.icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                        modifier = Modifier.clickable { onGuide(guide) },
                    )
                }
            } else if (topics.isEmpty() && documents.isEmpty()) {
                item(key = "none") {
                    Text(
                        stringResource(R.string.contact_no_results, text),
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth().padding(24.dp),
                    )
                }
            } else {
                topicsSection(topics, onTopic)
                if (documents.isNotEmpty()) {
                    item(key = "found-documents") { ListSectionHeader(stringResource(R.string.clubs_documents)) }
                    items(documents, key = { "document-${it.name}" }) { DocumentItem(it, onClick = { context.openDocument(it.url, DocumentKind.Pdf) }) }
                }
            }
        }
    }
}

/** The Rotary wheel and the welcome. */
@Composable
private fun Welcome() {
    Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.Top, modifier = Modifier.padding(16.dp)) {
        OrganisationLogo(Organisation.Rotary, Modifier.size(40.dp))
        Text(stringResource(ClubTopic.introduction), style = MaterialTheme.typography.bodyMedium)
    }
}

/** What a club should know, each topic opening its text. */
private fun LazyListScope.topicsSection(topics: List<ClubTopic>, onTopic: (ClubTopic) -> Unit) {
    if (topics.isEmpty()) return
    item(key = "topics") { ListSectionHeader(stringResource(R.string.clubs_general)) }
    items(topics, key = { "topic-${it.name}" }) { topic ->
        ListItem(
            headlineContent = { Text(stringResource(topic.title)) },
            leadingContent = { Icon(painterResource(topic.icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
            modifier = Modifier.clickable { onTopic(topic) },
        )
    }
}

/** A document: its symbol, its title, and that it is a PDF. */
@Composable
fun DocumentItem(document: ClubDocument, onClick: () -> Unit) {
    ListItem(
        headlineContent = { Text(stringResource(document.title)) },
        supportingContent = { Text(stringResource(R.string.news_pdf)) },
        leadingContent = { Icon(painterResource(document.icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        modifier = Modifier.clickable(onClick = onClick),
    )
}

/** Whether a title contains the search, ignoring case and accents. */
private fun String.matches(query: String): Boolean = query.isEmpty() || query.folded() in folded()

private fun String.folded(): String =
    Normalizer.normalize(this, Normalizer.Form.NFD).replace(Regex("\\p{Mn}+"), "").lowercase(Locale.ROOT)
