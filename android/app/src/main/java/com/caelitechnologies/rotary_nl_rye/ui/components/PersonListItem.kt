package com.caelitechnologies.rotary_nl_rye.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.ListItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.core.organisation.Person
import com.caelitechnologies.rotary_nl_rye.core.organisation.organisation

/** A person in a list: photo with the badge of their organisation, name, and the role under it. */
@Composable
fun PersonListItem(person: Person, onClick: () -> Unit) {
    ListItem(
        headlineContent = { Text(person.name.toString()) },
        supportingContent = { Text(person.role.text()) },
        leadingContent = {
            Box {
                PersonPhoto(url = person.photoUrl, size = 48.dp)
                person.organisation?.let {
                    OrganisationBadge(it, size = 20.dp, modifier = Modifier.align(Alignment.BottomEnd).offset(x = 4.dp, y = 2.dp))
                }
            }
        },
        modifier = Modifier.clickable(onClick = onClick),
    )
}
