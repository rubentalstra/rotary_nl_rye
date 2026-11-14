package com.caelitechnologies.rotary_nl_rye.students

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.input.clearText
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SearchBar
import androidx.compose.material3.SearchBarDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberSearchBarState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import com.caelitechnologies.rotary_nl_rye.ui.components.ActionButton
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionFooter
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale

/** A list of students, connected to its ViewModel. */
@Composable
fun StudentListRouteScreen(route: StudentListRoute, onBack: () -> Unit, onStudent: (ExchangeStudent) -> Unit) {
    val viewModel = hiltViewModel<StudentListViewModel, StudentListViewModel.Factory>(key = route.toString()) { it.create(route) }
    val locale = currentLocale()
    val europe = stringResource(R.string.students_europe)
    LaunchedEffect(locale, europe) { viewModel.setLanguage(StudentListViewModel.Language(locale, europe)) }
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    StudentListScreen(
        title = when (route) {
            is StudentListRoute.Class -> stringResource(R.string.students_class, route.year.toString())
            StudentListRoute.Rebounds -> stringResource(R.string.home_rebound)
            StudentListRoute.EarlierInbounds -> stringResource(R.string.students_earlier_classes)
        },
        footer = if (route == StudentListRoute.Rebounds) stringResource(R.string.students_rebounds_footer) else null,
        state = state,
        onQuery = viewModel::setQuery,
        onGrouping = viewModel::setGrouping,
        onBack = onBack,
        onStudent = onStudent,
    )
}

/**
 * Students under a sticky heading per country (or per exchange year, from
 * the top bar's menu when they span years), searchable by name or country;
 * each opens their page.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StudentListScreen(
    title: String,
    footer: String?,
    state: StudentListUiState,
    onQuery: (String) -> Unit,
    onGrouping: (StudentGrouping) -> Unit,
    onBack: () -> Unit,
    onStudent: (ExchangeStudent) -> Unit,
) {
    val query = rememberTextFieldState()
    LaunchedEffect(query) { snapshotFlow { query.text.toString() }.collect(onQuery) }
    val searchBarState = rememberSearchBarState()
    Scaffold(
        topBar = {
            // One opaque bar, so the list never shows behind the search.
            Column(Modifier.background(MaterialTheme.colorScheme.surface)) {
                TopAppBar(
                    title = { Text(title) },
                    navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
                    actions = { if (state.spansYears) GroupingMenu(state.grouping, onGrouping) },
                )
                SearchBar(
                    state = searchBarState,
                    inputField = {
                        SearchBarDefaults.InputField(
                            textFieldState = query,
                            searchBarState = searchBarState,
                            onSearch = {},
                            placeholder = { Text(stringResource(R.string.students_search)) },
                            leadingIcon = { Icon(painterResource(R.drawable.ic_search), contentDescription = null) },
                            trailingIcon = {
                                if (query.text.isNotEmpty()) {
                                    IconButton(onClick = { query.clearText() }) { Icon(painterResource(R.drawable.ic_close), stringResource(R.string.contact_search_clear)) }
                                }
                            },
                        )
                    },
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 4.dp),
                )
            }
        },
    ) { padding ->
        if (state.sections.isEmpty() && state.isSearching) {
            Box(Modifier.fillMaxSize().padding(padding).padding(24.dp), contentAlignment = Alignment.Center) {
                Text(
                    stringResource(R.string.contact_no_results, query.text.toString()),
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center,
                )
            }
        } else {
            StudentSections(state, footer, padding, onStudent)
        }
    }
}

@Composable
private fun StudentSections(state: StudentListUiState, footer: String?, padding: PaddingValues, onStudent: (ExchangeStudent) -> Unit) {
    val locale = currentLocale()
    LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding)) {
        state.sections.forEach { section ->
            val key = when (section) {
                is StudentSection.Country -> section.country.toString()
                is StudentSection.Year -> section.year.toString()
            }
            stickyHeader(key = "header-$key", contentType = "header") {
                val heading = when (section) {
                    is StudentSection.Country -> "${section.country.flag}  ${section.country.displayName(locale)}"
                    is StudentSection.Year -> section.year.toString()
                }
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.surface)
                        .padding(horizontal = 16.dp, vertical = 10.dp)
                        .semantics(mergeDescendants = true) { heading() },
                ) {
                    Text(heading, style = MaterialTheme.typography.titleSmall, color = MaterialTheme.colorScheme.primary, modifier = Modifier.weight(1f))
                    Text("${section.students.size}", style = MaterialTheme.typography.titleSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            items(section.students, key = { "$key-${it.id}" }, contentType = { "student" }) { student ->
                StudentListItem(student, state.detail, onClick = { onStudent(student) })
            }
        }
        if (footer != null && !state.isSearching) {
            item(key = "footer", contentType = "footer") { ListSectionFooter(footer) }
        }
    }
}

/** The top bar's menu that groups the list per country or per exchange year. */
@Composable
private fun GroupingMenu(grouping: StudentGrouping, onGrouping: (StudentGrouping) -> Unit) {
    var open by rememberSaveable { mutableStateOf(false) }
    Box {
        ActionButton(stringResource(R.string.students_group), R.drawable.ic_filter_list) { open = true }
        DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
            listOf(
                Triple(StudentGrouping.Country, R.string.students_by_country, R.drawable.ic_public),
                Triple(StudentGrouping.Year, R.string.students_by_year, R.drawable.ic_calendar),
            ).forEach { (value, label, icon) ->
                DropdownMenuItem(
                    text = { Text(stringResource(label)) },
                    leadingIcon = { Icon(painterResource(icon), contentDescription = null) },
                    trailingIcon = { if (value == grouping) Icon(painterResource(R.drawable.ic_check), contentDescription = null) },
                    onClick = {
                        onGrouping(value)
                        open = false
                    },
                )
            }
        }
    }
}
