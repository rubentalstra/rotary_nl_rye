package com.caelitechnologies.rotary_nl_rye.camps

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.input.clearText
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SearchBar
import androidx.compose.material3.SearchBarDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
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
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import java.time.format.DateTimeFormatter
import java.util.Locale

/** The summer camps, connected to their ViewModel. */
@Composable
fun CampsRoute(onBack: () -> Unit, onCamp: (Camp) -> Unit) {
    val viewModel = hiltViewModel<CampsViewModel>()
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    CampsScreen(
        state = state,
        actions = CampsActions(
            onBack = onBack,
            onCamp = onCamp,
            onRefresh = viewModel::refresh,
            onQuery = viewModel::setQuery,
            onAge = viewModel::setAge,
            onToggleCountry = viewModel::toggleCountry,
            onClearCountries = viewModel::clearCountries,
            onHidesFull = viewModel::setHidesFullCamps,
            onShowsPast = viewModel::setShowsPastCamps,
            onOrder = viewModel::setOrder,
            onClearFilters = viewModel::clearFilters,
        ),
    )
}

/** What the camps screen can ask for. */
data class CampsActions(
    val onBack: () -> Unit = {},
    val onCamp: (Camp) -> Unit = {},
    val onRefresh: () -> Unit = {},
    val onQuery: (String) -> Unit = {},
    val onAge: (Int?) -> Unit = {},
    val onToggleCountry: (String) -> Unit = {},
    val onClearCountries: () -> Unit = {},
    val onHidesFull: (Boolean) -> Unit = {},
    val onShowsPast: (Boolean) -> Unit = {},
    val onOrder: (CampOrder) -> Unit = {},
    val onClearFilters: () -> Unit = {},
)

/**
 * The summer camps and tours abroad: searchable, narrowed with filter chips,
 * in sections per month (or by price), each opening its page. Pull to load
 * the sheet again.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CampsScreen(state: CampsUiState, actions: CampsActions) {
    val query = rememberTextFieldState(state.filters.query)
    LaunchedEffect(query) { snapshotFlow { query.text.toString() }.collect(actions.onQuery) }
    val searchBarState = rememberSearchBarState()
    Scaffold(
        topBar = {
            // One opaque bar, so the list never shows behind the search or the chips.
            Column(Modifier.background(MaterialTheme.colorScheme.surface)) {
                TopAppBar(
                    title = { Text(stringResource(R.string.home_summer_camps)) },
                    navigationIcon = {
                        IconButton(onClick = actions.onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) }
                    },
                    actions = { SortMenu(state.filters.order, actions.onOrder) },
                )
                SearchBar(
                    state = searchBarState,
                    inputField = {
                        SearchBarDefaults.InputField(
                            textFieldState = query,
                            searchBarState = searchBarState,
                            onSearch = {},
                            placeholder = { Text(stringResource(R.string.camps_search)) },
                            leadingIcon = { Icon(painterResource(R.drawable.ic_search), contentDescription = null) },
                            trailingIcon = {
                                if (query.text.isNotEmpty()) {
                                    IconButton(onClick = { query.clearText() }) { Icon(painterResource(R.drawable.ic_close), stringResource(R.string.contact_search_clear)) }
                                }
                            },
                        )
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 4.dp),
                )
                FilterChips(state, actions)
            }
        },
    ) { padding ->
        when (val load = state.load) {
            CampsUiState.Load.Loading -> Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
            is CampsUiState.Load.Failed -> LoadFailed(load.error, actions.onRefresh, Modifier.padding(padding))
            CampsUiState.Load.Loaded -> PullToRefreshBox(
                isRefreshing = false,
                onRefresh = actions.onRefresh,
                modifier = Modifier.fillMaxSize().padding(top = padding.calculateTopPadding()),
            ) {
                if (state.sections.isEmpty()) {
                    Message(stringResource(R.string.camps_none), action = if (state.filters.isFiltered) stringResource(R.string.camps_clear_filters) else null, onAction = actions.onClearFilters)
                } else {
                    CampList(state, actions.onCamp, bottom = padding.calculateBottomPadding())
                }
            }
        }
    }
}

/** The camps, under a sticky heading per month. */
@Composable
private fun CampList(state: CampsUiState, onCamp: (Camp) -> Unit, bottom: androidx.compose.ui.unit.Dp) {
    val locale = currentLocale()
    val monthFormat = DateTimeFormatter.ofPattern("LLLL yyyy", locale)
    LazyColumn(
        contentPadding = androidx.compose.foundation.layout.PaddingValues(bottom = bottom),
        modifier = Modifier
            .fillMaxSize()
            .consumeWindowInsets(androidx.compose.foundation.layout.PaddingValues(bottom = bottom)),
    ) {
        state.sections.forEach { section ->
            section.month?.let { month ->
                stickyHeader(key = month.toString(), contentType = "month") {
                    Text(
                        text = month.format(monthFormat).replaceFirstChar { it.titlecase(locale) },
                        style = MaterialTheme.typography.titleSmall,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(MaterialTheme.colorScheme.surface)
                            .padding(horizontal = 16.dp, vertical = 10.dp)
                            .semantics { heading() },
                    )
                }
            }
            items(section.camps, key = { "${it.title}-${it.start}" }, contentType = { "camp" }) { camp ->
                CampListItem(camp, onClick = { onCamp(camp) })
            }
        }
    }
}

/** Age, countries, full camps and past camps as filter chips, in one scrolling row. */
@Composable
private fun FilterChips(state: CampsUiState, actions: CampsActions) {
    val filters = state.filters
    var showsAges by rememberSaveable { mutableStateOf(false) }
    var showsCountries by rememberSaveable { mutableStateOf(false) }
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .fillMaxWidth()
            .horizontalScroll(rememberScrollState())
            .padding(horizontal = 16.dp, vertical = 4.dp),
    ) {
        Box {
            FilterChip(
                selected = filters.age != null,
                onClick = { showsAges = true },
                label = { Text(filters.age?.let { pluralStringResource(R.plurals.camps_age_years, it, it) } ?: stringResource(R.string.camps_age)) },
            )
            DropdownMenu(expanded = showsAges, onDismissRequest = { showsAges = false }) {
                DropdownMenuItem(text = { Text(stringResource(R.string.camps_any_age)) }, onClick = { actions.onAge(null); showsAges = false })
                state.availableAges?.forEach { age ->
                    DropdownMenuItem(
                        text = { Text(pluralStringResource(R.plurals.camps_age_years, age, age)) },
                        trailingIcon = if (age == filters.age) ({ Icon(painterResource(R.drawable.ic_check), contentDescription = null) }) else null,
                        onClick = { actions.onAge(age); showsAges = false },
                    )
                }
            }
        }
        FilterChip(
            selected = filters.countries.isNotEmpty(),
            onClick = { showsCountries = true },
            label = {
                Text(if (filters.countries.isEmpty()) stringResource(R.string.camps_countries) else pluralStringResource(R.plurals.camps_countries_chosen, filters.countries.size, filters.countries.size))
            },
        )
        FilterChip(
            selected = filters.hidesFullCamps,
            onClick = { actions.onHidesFull(!filters.hidesFullCamps) },
            label = { Text(stringResource(R.string.camps_hide_full)) },
            leadingIcon = if (filters.hidesFullCamps) ({ Icon(painterResource(R.drawable.ic_check), contentDescription = null, modifier = Modifier.size(18.dp)) }) else null,
        )
        if (state.pastCampCount > 0) {
            FilterChip(
                selected = filters.showsPastCamps,
                onClick = { actions.onShowsPast(!filters.showsPastCamps) },
                label = { Text(pluralStringResource(R.plurals.camps_show_past, state.pastCampCount, state.pastCampCount)) },
                leadingIcon = if (filters.showsPastCamps) ({ Icon(painterResource(R.drawable.ic_check), contentDescription = null, modifier = Modifier.size(18.dp)) }) else null,
            )
        }
        if (filters.isFiltered) {
            TextButton(onClick = actions.onClearFilters) { Text(stringResource(R.string.camps_clear_filters)) }
        }
    }
    if (showsCountries) {
        CountrySheet(state, actions, onDismiss = { showsCountries = false })
    }
}

/** Order by date or by price, from the top bar. */
@Composable
private fun SortMenu(order: CampOrder, onOrder: (CampOrder) -> Unit) {
    var expanded by rememberSaveable { mutableStateOf(false) }
    Box {
        IconButton(onClick = { expanded = true }) { Icon(painterResource(R.drawable.ic_sort), stringResource(R.string.camps_sort)) }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            listOf(CampOrder.Date to R.string.camps_sort_date, CampOrder.Price to R.string.camps_sort_price).forEach { (value, label) ->
                DropdownMenuItem(
                    text = { Text(stringResource(label)) },
                    trailingIcon = if (value == order) ({ Icon(painterResource(R.drawable.ic_check), contentDescription = null) }) else null,
                    onClick = { onOrder(value); expanded = false },
                )
            }
        }
    }
}

/** The sheet could not be loaded: why, and a way to try again. */
@Composable
private fun LoadFailed(error: CampFeed.LoadError, onRetry: () -> Unit, modifier: Modifier = Modifier) {
    val offline = error is CampFeed.LoadError.Offline
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp, Alignment.CenterVertically),
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
    ) {
        Icon(painterResource(if (offline) R.drawable.ic_wifi_off else R.drawable.ic_error), contentDescription = null, tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(48.dp))
        Text(stringResource(if (offline) R.string.camps_offline_title else R.string.camps_unavailable_title), style = MaterialTheme.typography.titleLarge)
        Text(
            stringResource(if (offline) R.string.camps_offline else R.string.camps_unavailable),
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
        )
        Button(onClick = onRetry) { Text(stringResource(R.string.action_retry)) }
    }
}

/** A line in the middle of the screen, with an optional action. */
@Composable
private fun Message(text: String, action: String?, onAction: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterVertically),
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
    ) {
        Text(text, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.Center)
        action?.let { TextButton(onClick = onAction) { Text(it) } }
    }
}
