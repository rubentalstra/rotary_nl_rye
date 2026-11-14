package com.caelitechnologies.rotary_nl_rye.students

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.contact.PhotoDialog
import com.caelitechnologies.rotary_nl_rye.core.students.Destination
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeDirection
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStatus
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.PersonPhoto
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import java.time.LocalDate

/**
 * A student's page: their photo (full screen with a tap), name, the two
 * flags, whether they are on exchange or back, where they come from and go
 * to, and what they wrote about themselves.
 */
@Composable
fun StudentDetailScreen(student: ExchangeStudent, onBack: () -> Unit, today: LocalDate = LocalDate.now()) {
    val locale = currentLocale()
    val name = student.name.toString()
    val home = Destination.Country(student.homeCountry)
    var showsPhoto by rememberSaveable { mutableStateOf(false) }
    StudentsScaffold(name, onBack) {
        item(key = "header", contentType = "header") {
            val route = stringResource(R.string.students_from_to, home.displayName(locale), student.destination.displayName(locale))
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxWidth().padding(horizontal = 24.dp, vertical = 16.dp),
            ) {
                val photoDescription = stringResource(R.string.person_photo_of, name)
                val showPhoto = stringResource(R.string.person_show_photo)
                PersonPhoto(
                    student.photoUrl,
                    size = 132.dp,
                    modifier = if (student.photoUrl != null) {
                        Modifier.clickable(onClickLabel = showPhoto) { showsPhoto = true }.clearAndSetSemantics { contentDescription = photoDescription }
                    } else {
                        Modifier
                    },
                )
                Text(name, style = MaterialTheme.typography.headlineSmall, textAlign = TextAlign.Center)
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.clearAndSetSemantics { contentDescription = route },
                ) {
                    Text(home.flag, style = MaterialTheme.typography.headlineMedium)
                    Icon(painterResource(R.drawable.ic_arrow_forward), contentDescription = null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(student.destination.flag, style = MaterialTheme.typography.headlineMedium)
                }
                StatusLabel(student.direction, student.status(today))
            }
        }
        item(key = "from", contentType = "fact") { Fact(R.string.students_from, "${home.flag} ${home.displayName(locale)}", R.drawable.ic_home) }
        item(key = "to", contentType = "fact") { Fact(R.string.students_to, "${student.destination.flag} ${student.destination.displayName(locale)}", R.drawable.ic_flight) }
        item(key = "year", contentType = "fact") { Fact(R.string.students_exchange_year, student.exchangeYear.toString(), R.drawable.ic_calendar) }
        item(key = "aboutHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.students_about_me)) }
        item(key = "bio", contentType = "bio") {
            // Shown as the student wrote it, and selectable to copy.
            SelectionContainer {
                Text(student.bio, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))
            }
        }
    }
    if (showsPhoto && student.photoUrl != null) PhotoDialog(student.photoUrl!!, name, onDismiss = { showsPhoto = false })
}

@Composable
private fun Fact(title: Int, value: String, icon: Int) {
    ListItem(
        overlineContent = { Text(stringResource(title)) },
        headlineContent = { Text(value) },
        leadingContent = { Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
    )
}

/**
 * Where a student is in their exchange year, as a tonal label with a
 * symbol: on their way, on exchange, or back (a rebound). The text says it,
 * so nothing rests on the colour.
 */
@Composable
fun StatusLabel(direction: ExchangeDirection, status: ExchangeStatus) {
    val (text, icon) = when (status) {
        ExchangeStatus.Upcoming -> (if (direction == ExchangeDirection.Outbound) R.string.students_status_leaving_soon else R.string.students_status_coming_soon) to R.drawable.ic_schedule
        ExchangeStatus.OnExchange -> (if (direction == ExchangeDirection.Outbound) R.string.students_status_on_exchange else R.string.students_status_in_netherlands) to
            (if (direction == ExchangeDirection.Outbound) R.drawable.ic_flight else R.drawable.ic_home)
        ExchangeStatus.Returned -> (if (direction == ExchangeDirection.Outbound) R.string.students_status_rebound else R.string.students_status_back_home) to R.drawable.ic_history
    }
    val colors = MaterialTheme.colorScheme
    val (container, content) = when (status) {
        ExchangeStatus.Upcoming -> colors.tertiaryContainer to colors.onTertiaryContainer
        ExchangeStatus.OnExchange -> colors.primaryContainer to colors.onPrimaryContainer
        ExchangeStatus.Returned -> colors.secondaryContainer to colors.onSecondaryContainer
    }
    Surface(shape = CircleShape, color = container, contentColor = content) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
        ) {
            Icon(painterResource(icon), contentDescription = null, modifier = Modifier.size(18.dp))
            Text(stringResource(text), style = MaterialTheme.typography.labelLarge)
        }
    }
}

