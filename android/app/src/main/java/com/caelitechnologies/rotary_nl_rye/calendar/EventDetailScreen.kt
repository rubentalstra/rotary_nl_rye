package com.caelitechnologies.rotary_nl_rye.calendar

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.provider.CalendarContract
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextLinkStyles
import androidx.compose.ui.text.fromHtml
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.core.net.toUri
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import java.time.ZoneId

/** An event's page, connected to its ViewModel; back when it is not loaded (after the process was ended). */
@Composable
fun EventDetailRoute(route: EventRoute, onBack: () -> Unit) {
    val viewModel = hiltViewModel<EventViewModel, EventViewModel.Factory>(key = route.toString()) { it.create(route.id) }
    val event = viewModel.event
    if (event == null) LaunchedEffect(Unit) { onBack() } else EventDetailScreen(event, onBack)
}

/**
 * Everything about one event: when, where (opens Maps) and what, and a
 * button that puts it in the person's own calendar through Android's own
 * screen for a new event, which needs no calendar permission. Online meeting
 * links are left out on purpose, as on iOS: people do not join meetings from
 * this app.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EventDetailScreen(event: CalendarEvent, onBack: () -> Unit) {
    val context = LocalContext.current
    val locale = currentLocale()
    val zone = ZoneId.systemDefault()
    val linkColor = MaterialTheme.colorScheme.primary
    val notes = remember(event.notes, linkColor) {
        event.notes?.let { AnnotatedString.fromHtml(it, TextLinkStyles(style = SpanStyle(color = linkColor, textDecoration = TextDecoration.Underline))) }
    }
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
                Text(event.title ?: stringResource(R.string.calendar_event), style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(16.dp))
            }
            item(key = "when") { ListSectionHeader(stringResource(R.string.camps_when)) }
            item(key = "date") {
                ListItem(
                    headlineContent = { Text(event.longWhen(locale, zone)) },
                    supportingContent = if (event.isAllDay) ({ Text(stringResource(R.string.calendar_all_day)) }) else null,
                    leadingContent = { Icon(painterResource(if (event.isAllDay) R.drawable.ic_calendar else R.drawable.ic_schedule), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                )
            }
            event.location?.let { location ->
                item(key = "where") { ListSectionHeader(stringResource(R.string.calendar_where)) }
                item(key = "location") {
                    ListItem(
                        headlineContent = { Text(location) },
                        supportingContent = { Text(stringResource(R.string.calendar_open_maps)) },
                        leadingContent = { Icon(painterResource(R.drawable.ic_location), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                        modifier = Modifier.clickable { context.openMaps(location) },
                    )
                }
            }
            notes?.let { text ->
                item(key = "about") { ListSectionHeader(stringResource(R.string.calendar_about)) }
                item(key = "notes") { Text(text, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 16.dp)) }
            }
            item(key = "add") {
                Box(Modifier.fillMaxWidth().padding(16.dp), contentAlignment = Alignment.Center) {
                    Button(onClick = { context.addToCalendar(event, zone) }) {
                        Icon(painterResource(R.drawable.ic_event_available), contentDescription = null, modifier = Modifier.size(18.dp))
                        Text(stringResource(R.string.calendar_add), modifier = Modifier.padding(start = 8.dp))
                    }
                }
            }
        }
    }
}

/** Android's own screen for a new event, filled in; the person chooses the calendar and saves. */
private fun Context.addToCalendar(event: CalendarEvent, zone: ZoneId) {
    val intent = Intent(Intent.ACTION_INSERT, CalendarContract.Events.CONTENT_URI)
        .putExtra(CalendarContract.Events.TITLE, event.title)
        .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, event.start(zone).toEpochMilli())
        .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, event.end(zone).toEpochMilli())
        .putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, event.isAllDay)
        .putExtra(CalendarContract.Events.EVENT_LOCATION, event.location)
    try {
        startActivity(intent)
    } catch (_: ActivityNotFoundException) {
        // No calendar app on this phone: there is nowhere to add it.
    }
}

/** The place in the person's maps app. */
private fun Context.openMaps(location: String) {
    try {
        startActivity(Intent(Intent.ACTION_VIEW, "geo:0,0?q=${android.net.Uri.encode(location)}".toUri()))
    } catch (_: ActivityNotFoundException) {
        // No maps app on this phone.
    }
}
