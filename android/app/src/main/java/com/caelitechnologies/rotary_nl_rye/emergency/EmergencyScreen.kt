package com.caelitechnologies.rotary_nl_rye.emergency

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilledTonalIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.organisation.ContactGroup
import com.caelitechnologies.rotary_nl_rye.core.organisation.ContactLinks
import com.caelitechnologies.rotary_nl_rye.core.organisation.Person
import com.caelitechnologies.rotary_nl_rye.navigation.AppTab
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionFooter
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.TabScaffold
import com.caelitechnologies.rotary_nl_rye.ui.components.rememberOpenLink
import com.caelitechnologies.rotary_nl_rye.ui.components.text

/**
 * The root of the Emergency tab: 112 first, then the people of Rotary Youth
 * Exchange and the independent confidants, each with their number and a call
 * and mail button, then what is good to know.
 */
@Composable
fun EmergencyScreen() {
    val openLink = rememberOpenLink()
    TabScaffold(title = stringResource(AppTab.Emergency.label)) { padding ->
        LazyColumn(
            contentPadding = padding,
            modifier = Modifier
                .fillMaxSize()
                .consumeWindowInsets(padding),
        ) {
            item(key = "112", contentType = "112") { EmergencyServicesCard() }
            ContactGroup.emergencyGroups.forEach { group ->
                item(key = group.name, contentType = "header") { ListSectionHeader(stringResource(group.title)) }
                items(group.members, key = { "${group.name}-${it.name}" }, contentType = { "person" }) { person ->
                    EmergencyPerson(person, openLink)
                }
                group.summary?.let { summary ->
                    item(key = "${group.name}-summary", contentType = "footer") { ListSectionFooter(stringResource(summary)) }
                }
            }
            item(key = "tips", contentType = "header") { ListSectionHeader(stringResource(R.string.emergency_good_to_know)) }
            item(key = "tip-address", contentType = "tip") {
                Tip(R.drawable.ic_home, stringResource(R.string.emergency_tip_address))
            }
            item(key = "tip-doctor", contentType = "tip") {
                Tip(R.drawable.ic_medical, stringResource(R.string.emergency_tip_doctor))
            }
        }
    }
}

/**
 * 112 with the national campaign image "112, als elke seconde telt". The
 * image is drawn on white, so the card stays white in the dark theme too.
 */
@Composable
private fun EmergencyServicesCard() {
    Card(
        colors = CardDefaults.cardColors(containerColor = Color.White, contentColor = Color(0xFF44464F)),
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
    ) {
        Column(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.padding(16.dp),
        ) {
            Image(
                painter = painterResource(R.drawable.emergency_112),
                contentDescription = stringResource(R.string.emergency_112_image),
                contentScale = ContentScale.FillWidth,
                modifier = Modifier.fillMaxWidth(),
            )
            Text(
                text = stringResource(R.string.emergency_112_when),
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth(),
            )
        }
    }
}

/** A person with their role and number, and buttons to mail and call. */
@Composable
private fun EmergencyPerson(person: Person, openLink: (String) -> Unit) {
    ListItem(
        headlineContent = { Text(person.name.toString()) },
        supportingContent = {
            Column {
                Text(person.role.text())
                person.phone?.let { Text(it) }
            }
        },
        trailingContent = {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                person.email?.let { email ->
                    FilledTonalIconButton(onClick = { openLink(ContactLinks.mail(email)) }) {
                        Icon(painterResource(R.drawable.ic_mail_filled), stringResource(R.string.action_mail_person, person.name.toString()))
                    }
                }
                person.phone?.let { phone ->
                    FilledTonalIconButton(onClick = { openLink(ContactLinks.call(phone)) }) {
                        Icon(painterResource(R.drawable.ic_call_filled), stringResource(R.string.action_call_person, person.name.toString()))
                    }
                }
            }
        },
    )
}

@Composable
private fun Tip(icon: Int, text: String) {
    ListItem(
        headlineContent = { Text(text) },
        leadingContent = { Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
    )
}
