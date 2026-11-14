package com.caelitechnologies.rotary_nl_rye.calendar

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.DocumentKind
import com.caelitechnologies.rotary_nl_rye.ui.components.LoadFailed
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import com.caelitechnologies.rotary_nl_rye.ui.components.openDocument
import java.net.URLEncoder
import java.time.ZoneId
import java.time.format.DateTimeFormatter

/** The calendar, connected to its ViewModel. */
@Composable
fun CalendarRoute(onBack: () -> Unit, onEvent: (CalendarEvent) -> Unit) {
    val viewModel = hiltViewModel<CalendarViewModel>()
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    CalendarScreen(state, onBack, viewModel::refresh, viewModel::showPastEvents, onEvent)
}

/**
 * The MDJC calendar: what is happening now, then what is coming per month,
 * each event with its date; past events behind a button; and subscribing to
 * the calendar from the top bar.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CalendarScreen(state: CalendarUiState, onBack: () -> Unit, onRefresh: () -> Unit, onShowPast: () -> Unit, onEvent: (CalendarEvent) -> Unit) {
    val context = LocalContext.current
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.home_calendar)) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
                actions = {
                    IconButton(onClick = { context.openDocument(SUBSCRIBE_URL, DocumentKind.Web) }) {
                        Icon(painterResource(R.drawable.ic_calendar_add), stringResource(R.string.calendar_subscribe))
                    }
                },
            )
        },
    ) { padding ->
        when (val load = state.load) {
            CalendarUiState.Load.Loading -> Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
            is CalendarUiState.Load.Failed -> {
                val offline = load.error is CalendarFeed.LoadError.Offline
                LoadFailed(
                    offline = offline,
                    title = stringResource(if (offline) R.string.camps_offline_title else R.string.calendar_unavailable_title),
                    message = stringResource(if (offline) R.string.calendar_offline else R.string.calendar_unavailable),
                    onRetry = onRefresh,
                    modifier = Modifier.padding(padding),
                )
            }
            CalendarUiState.Load.Loaded -> PullToRefreshBox(isRefreshing = false, onRefresh = onRefresh, modifier = Modifier.fillMaxSize().padding(top = padding.calculateTopPadding())) {
                EventList(state, onShowPast, onEvent, bottom = PaddingValues(bottom = padding.calculateBottomPadding()))
            }
        }
    }
}

@Composable
private fun EventList(state: CalendarUiState, onShowPast: () -> Unit, onEvent: (CalendarEvent) -> Unit, bottom: PaddingValues) {
    val locale = currentLocale()
    val monthFormat = DateTimeFormatter.ofPattern("LLLL yyyy", locale)
    if (state.ongoing.isEmpty() && state.months.isEmpty() && state.pastEventCount == 0) {
        Text(stringResource(R.string.calendar_none), textAlign = TextAlign.Center, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.fillMaxSize().padding(24.dp))
        return
    }
    LazyColumn(contentPadding = bottom, modifier = Modifier.fillMaxSize().consumeWindowInsets(bottom)) {
        if (state.ongoing.isNotEmpty()) {
            stickyHeader(key = "now", contentType = "month") { MonthHeader(stringResource(R.string.calendar_now)) }
            items(state.ongoing, key = { "now-${it.id}" }, contentType = { "event" }) { EventListItem(it, onClick = { onEvent(it) }) }
        }
        state.months.forEach { (month, events) ->
            stickyHeader(key = month.toString(), contentType = "month") { MonthHeader(month.format(monthFormat).replaceFirstChar { it.titlecase(locale) }) }
            items(events, key = { it.id }, contentType = { "event" }) { EventListItem(it, onClick = { onEvent(it) }) }
        }
        if (!state.showsPastEvents && state.pastEventCount > 0) {
            item(key = "past") {
                TextButton(onClick = onShowPast, modifier = Modifier.padding(horizontal = 8.dp, vertical = 8.dp)) {
                    Text(pluralStringResource(R.plurals.calendar_show_past, state.pastEventCount, state.pastEventCount))
                }
            }
        }
    }
}

@Composable
private fun MonthHeader(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.surface)
            .padding(horizontal = 16.dp, vertical = 10.dp)
            .semantics { heading() },
    )
}

/** An event: a date badge with its first day, the title, and when (and where). */
@Composable
fun EventListItem(event: CalendarEvent, onClick: () -> Unit) {
    val locale = currentLocale()
    val zone = ZoneId.systemDefault()
    ListItem(
        leadingContent = { DateBadge(event, zone) },
        headlineContent = { Text(event.title ?: stringResource(R.string.calendar_event), fontWeight = FontWeight.Medium) },
        supportingContent = {
            Column {
                Text(event.shortWhen(locale, zone))
                event.location?.let { Text(it, maxLines = 1) }
            }
        },
        modifier = Modifier.clickable(onClick = onClick),
    )
}

/** The first day as a small calendar page: the day large, the month short above it. */
@Composable
private fun DateBadge(event: CalendarEvent, zone: ZoneId) {
    val locale = currentLocale()
    val day = event.firstDay(zone)
    Surface(color = MaterialTheme.colorScheme.primaryContainer, shape = MaterialTheme.shapes.medium, modifier = Modifier.size(52.dp).clearAndSetSemantics {}) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(top = 4.dp)) {
            Text(day.format(DateTimeFormatter.ofPattern("MMM", locale)).trimEnd('.').uppercase(locale), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onPrimaryContainer)
            Text(day.dayOfMonth.toString(), style = MaterialTheme.typography.titleLarge, color = MaterialTheme.colorScheme.onPrimaryContainer)
        }
    }
}

/** Google Calendar's page that adds the calendar's public iCalendar feed to a person's calendars. */
private val SUBSCRIBE_URL = "https://calendar.google.com/calendar/render?cid=" + URLEncoder.encode(CalendarFeed.ICAL_URL, "UTF-8")
