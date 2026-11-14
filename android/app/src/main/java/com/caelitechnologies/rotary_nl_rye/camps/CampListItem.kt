package com.caelitechnologies.rotary_nl_rye.camps

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Badge
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale

/**
 * A camp in the list: the flag, the title in full and the country (with
 * "Vol" when it is full); under them the dates and ages, each with its
 * symbol, and the price on the trailing side. A full camp is dimmed.
 */
@Composable
fun CampListItem(camp: Camp, onClick: () -> Unit) {
    val locale = currentLocale()
    ListItem(
        leadingContent = { Text(camp.flag, style = MaterialTheme.typography.headlineMedium) },
        headlineContent = { Text(camp.title, fontWeight = FontWeight.Medium) },
        supportingContent = {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(camp.countryName(locale))
                    if (camp.isFull) FullBadge()
                }
                Fact(R.drawable.ic_calendar, camp.dateRange(locale))
                Fact(R.drawable.ic_person, pluralStringResource(R.plurals.camps_ages_short, camp.ages.last, camp.ages.first, camp.ages.last))
            }
        },
        trailingContent = camp.contribution?.let { contribution ->
            { Text(contribution.formatted(locale), style = MaterialTheme.typography.titleMedium) }
        },
        modifier = Modifier
            .clickable(onClick = onClick)
            .alpha(if (camp.isFull) 0.6f else 1f),
    )
}

/** A date or an age with its symbol, in full colour: they decide whether a camp fits. */
@Composable
private fun Fact(icon: Int, text: String) {
    Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(16.dp))
        Text(text, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurface, fontWeight = FontWeight.Medium)
    }
}

/** "Vol": a camp that takes nobody more. */
@Composable
fun FullBadge() {
    Badge(containerColor = MaterialTheme.colorScheme.errorContainer, contentColor = MaterialTheme.colorScheme.onErrorContainer) {
        Text(stringResource(R.string.camps_full))
    }
}
