package com.caelitechnologies.rotary_nl_rye.contact

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.input.clearText
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SearchBar
import androidx.compose.material3.SearchBarDefaults
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberSearchBarState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalResources
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.organisation.ContactGroup
import com.caelitechnologies.rotary_nl_rye.core.organisation.Person
import com.caelitechnologies.rotary_nl_rye.navigation.AppTab
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionFooter
import com.caelitechnologies.rotary_nl_rye.ui.components.PersonListItem

/**
 * The root of the Contact tab: one team at a time, chosen with the tabs
 * under the title, and a search within that team on name, role or club.
 * The team and the search survive rotation and process death.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ContactScreen(onPerson: (Person) -> Unit) {
    var team by rememberSaveable { mutableStateOf(ContactGroup.Mdjc) }
    val query = rememberTextFieldState()
    val searchBarState = rememberSearchBarState()
    val resources = LocalResources.current
    val text = query.text.toString()
    val members = remember(team, text, resources) {
        team.members.filter { person -> person.matches(text) { resources.getString(it.title, *it.titleArgs.toTypedArray()) } }
    }

    Scaffold(
        topBar = {
            Column {
                TopAppBar(title = { Text(stringResource(AppTab.Contact.label)) })
                SearchBar(
                    state = searchBarState,
                    inputField = {
                        SearchBarDefaults.InputField(
                            textFieldState = query,
                            searchBarState = searchBarState,
                            onSearch = {},
                            placeholder = { Text(stringResource(R.string.contact_search)) },
                            leadingIcon = { Icon(painterResource(R.drawable.ic_search), contentDescription = null) },
                            trailingIcon = {
                                if (text.isNotEmpty()) {
                                    IconButton(onClick = { query.clearText() }) {
                                        Icon(painterResource(R.drawable.ic_close), stringResource(R.string.contact_search_clear))
                                    }
                                }
                            },
                        )
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                )
                PrimaryTabRow(selectedTabIndex = ContactGroup.teams.indexOf(team)) {
                    ContactGroup.teams.forEach { group ->
                        Tab(
                            selected = group == team,
                            onClick = { team = group },
                            text = { Text(stringResource(group.title), maxLines = 1) },
                        )
                    }
                }
            }
        },
    ) { padding ->
        if (members.isEmpty()) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(24.dp),
            ) {
                Text(
                    text = stringResource(R.string.contact_no_results, text),
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center,
                )
            }
        } else {
            LazyColumn(
                contentPadding = padding,
                modifier = Modifier
                    .fillMaxSize()
                    .consumeWindowInsets(padding),
            ) {
                team.summary?.let { summary ->
                    item(key = "summary", contentType = "footer") { ListSectionFooter(stringResource(summary)) }
                }
                items(members, key = { it.name.toString() }, contentType = { "person" }) { person ->
                    PersonListItem(person, onClick = { onPerson(person) })
                }
            }
        }
    }
}

