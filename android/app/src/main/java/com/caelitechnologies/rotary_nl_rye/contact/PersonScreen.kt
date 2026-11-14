package com.caelitechnologies.rotary_nl_rye.contact

import androidx.compose.foundation.clickable
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
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.Role as SemanticsRole
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.organisation.ContactLinks
import com.caelitechnologies.rotary_nl_rye.core.organisation.Organisation
import com.caelitechnologies.rotary_nl_rye.core.organisation.Person
import com.caelitechnologies.rotary_nl_rye.core.organisation.organisation
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.OrganisationBadge
import com.caelitechnologies.rotary_nl_rye.ui.components.OrganisationLogo
import com.caelitechnologies.rotary_nl_rye.ui.components.PersonPhoto
import com.caelitechnologies.rotary_nl_rye.ui.components.rememberOpenLink
import com.caelitechnologies.rotary_nl_rye.ui.components.text

/**
 * Everything about one person, laid out as Google's Contacts app does: photo
 * and name with the ways to reach them under it, then the number and
 * address, their roles, club and district, and their own words.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PersonScreen(person: Person, onBack: () -> Unit) {
    val openLink = rememberOpenLink()
    var showsPhoto by rememberSaveable { mutableStateOf(false) }
    Scaffold(
        topBar = {
            TopAppBar(
                title = {},
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back))
                    }
                },
            )
        },
    ) { padding ->
        LazyColumn(
            contentPadding = padding,
            modifier = Modifier
                .fillMaxSize()
                .consumeWindowInsets(padding),
        ) {
            item(key = "header") { PersonHeader(person, onPhoto = { showsPhoto = true }) }
            item(key = "actions") { QuickActions(person, openLink) }
            if (person.phone != null || person.email != null) {
                item(key = "reach") { ListSectionHeader(stringResource(R.string.person_contact)) }
                person.phone?.let { phone ->
                    item(key = "phone") {
                        DetailItem(
                            icon = painterResource(R.drawable.ic_call),
                            text = phone,
                            label = stringResource(if (ContactLinks.isMobile(phone)) R.string.person_mobile else R.string.person_phone),
                            onClick = { openLink(ContactLinks.call(phone)) },
                        )
                    }
                }
                person.email?.let { email ->
                    item(key = "email") {
                        DetailItem(
                            icon = painterResource(R.drawable.ic_mail),
                            text = email,
                            label = stringResource(R.string.person_email),
                            onClick = { openLink(ContactLinks.mail(email)) },
                        )
                    }
                }
            }
            if (person.roles.size > 1) {
                item(key = "roles") { ListSectionHeader(stringResource(R.string.person_roles)) }
                items(person.roles, key = { it.title.toString() + it.titleArgs }) { role ->
                    ListItem(headlineContent = { Text(role.text()) })
                }
            }
            if (person.club != null || person.district != null) {
                item(key = "rotary") { ListSectionHeader("Rotary") }
                person.club?.let { club ->
                    item(key = "club") {
                        ListItem(
                            headlineContent = { Text(club) },
                            supportingContent = { Text(stringResource(R.string.person_club)) },
                            leadingContent = { OrganisationLogo(Organisation.Rotary, Modifier.size(24.dp)) },
                        )
                    }
                }
                person.district?.let { district ->
                    item(key = "district") {
                        DetailItem(painterResource(R.drawable.ic_map), district, stringResource(R.string.person_district), onClick = null)
                    }
                }
            }
            person.bio?.let { bio ->
                item(key = "bio-header") { ListSectionHeader(stringResource(R.string.person_about, person.name.given)) }
                item(key = "bio") {
                    Text(
                        text = bio,
                        style = MaterialTheme.typography.bodyLarge,
                        modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 24.dp),
                    )
                }
            }
        }
    }
    if (showsPhoto && person.photoUrl != null) {
        PhotoDialog(url = person.photoUrl!!, name = person.name.toString(), onDismiss = { showsPhoto = false })
    }
}

/** Photo with the organisation's badge, name and role, centred. A tap on the photo shows it large. */
@Composable
private fun PersonHeader(person: Person, onPhoto: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
    ) {
        Box {
            PersonPhoto(
                url = person.photoUrl,
                size = 120.dp,
                modifier = Modifier.clickable(
                    enabled = person.photoUrl != null,
                    onClickLabel = stringResource(R.string.person_show_photo),
                    role = SemanticsRole.Image,
                    onClick = onPhoto,
                ),
            )
            person.organisation?.let { OrganisationBadge(it, size = 40.dp, modifier = Modifier.align(Alignment.BottomEnd)) }
        }
        Text(person.name.toString(), style = MaterialTheme.typography.headlineMedium, textAlign = TextAlign.Center)
        Text(
            person.role.text(),
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
        )
    }
}

/**
 * Call, message, WhatsApp and mail under the name, as the Contacts app shows
 * them. A landline cannot receive a text or WhatsApp, so only a mobile
 * number offers them.
 */
@Composable
private fun QuickActions(person: Person, openLink: (String) -> Unit) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(24.dp, Alignment.CenterHorizontally),
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
    ) {
        person.phone?.let { phone ->
            QuickAction(painterResource(R.drawable.ic_call_filled), stringResource(R.string.action_call)) { openLink(ContactLinks.call(phone)) }
            if (ContactLinks.isMobile(phone)) {
                QuickAction(painterResource(R.drawable.ic_chat_filled), stringResource(R.string.action_message)) { openLink(ContactLinks.message(phone)) }
                QuickAction(painterResource(R.drawable.ic_whatsapp), "WhatsApp", tint = Color.Unspecified) { openLink(ContactLinks.whatsApp(phone)) }
            }
        }
        person.email?.let { email ->
            QuickAction(painterResource(R.drawable.ic_mail_filled), stringResource(R.string.action_mail)) { openLink(ContactLinks.mail(email)) }
        }
    }
}

/** One quick action: a round tonal button with its name under it. */
@Composable
private fun QuickAction(icon: Painter, label: String, tint: Color? = null, onClick: () -> Unit) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
        FilledTonalIconButton(onClick = onClick, modifier = Modifier.size(56.dp)) {
            if (tint != null) Icon(icon, contentDescription = label, tint = tint) else Icon(icon, contentDescription = label)
        }
        Text(label, style = MaterialTheme.typography.labelMedium)
    }
}

/** A detail with its symbol, the value large and what it is under it; tappable when it opens something. */
@Composable
private fun DetailItem(icon: Painter, text: String, label: String, onClick: (() -> Unit)?) {
    ListItem(
        headlineContent = { Text(text) },
        supportingContent = { Text(label) },
        leadingContent = { Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        modifier = if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier,
    )
}
