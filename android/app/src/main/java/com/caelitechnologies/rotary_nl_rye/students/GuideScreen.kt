package com.caelitechnologies.rotary_nl_rye.students

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.students.GuideItem
import com.caelitechnologies.rotary_nl_rye.core.students.StudentGuide
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.materialSymbol
import com.caelitechnologies.rotary_nl_rye.ui.components.rememberOpenLink

/**
 * A guide's page: what it tells, then its sections, each piece as a list
 * item: paragraphs, points and facts with their symbol, numbered steps,
 * questions, remarks and a mail link. The text stays in v13's language.
 */
@Composable
fun GuideScreen(guide: StudentGuide, onBack: () -> Unit) {
    val openLink = rememberOpenLink()
    StudentsScaffold(stringResource(guide.title), onBack) {
        item(key = "subtitle", contentType = "subtitle") {
            ListItem(
                headlineContent = { Text(stringResource(guide.subtitle), style = MaterialTheme.typography.titleLarge) },
                leadingContent = { Icon(painterResource(materialSymbol(guide.symbol)), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
            )
        }
        guide.sections.forEachIndexed { s, section ->
            section.title?.let { title -> item(key = "section-$s", contentType = "header") { ListSectionHeader(stringResource(title)) } }
            var step = 0
            // Steps count up within a section.
            val numbered = section.items.mapIndexed { index, item -> NumberedItem(index, item, if (item is GuideItem.Step) ++step else 0) }
            items(numbered, key = { "$s-${it.index}" }, contentType = { it.item::class.simpleName }) { (_, item, number) ->
                GuideItemRow(item, number, onMail = { address, subject ->
                    openLink("mailto:$address" + (subject?.let { "?subject=" + android.net.Uri.encode(it) } ?: ""))
                })
            }
        }
    }
}

private data class NumberedItem(val index: Int, val item: GuideItem, val number: Int)

/** One piece of a guide. */
@Composable
private fun GuideItemRow(item: GuideItem, number: Int, onMail: (String, String?) -> Unit) {
    val primary = MaterialTheme.colorScheme.primary
    when (item) {
        is GuideItem.Text -> Text(stringResource(item.text), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))
        is GuideItem.Note -> ListItem(
            headlineContent = { Text(stringResource(item.text), style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant) },
            leadingContent = { Icon(painterResource(R.drawable.ic_info), contentDescription = null, tint = MaterialTheme.colorScheme.onSurfaceVariant) },
        )
        is GuideItem.Question -> ListItem(
            headlineContent = { Text(stringResource(item.text)) },
            leadingContent = { Icon(painterResource(R.drawable.ic_help), contentDescription = null, tint = primary) },
        )
        is GuideItem.Point -> ListItem(
            headlineContent = { Text(stringResource(item.title ?: item.text!!)) },
            supportingContent = if (item.title != null && item.text != null) ({ Text(stringResource(item.text!!)) }) else null,
            leadingContent = { Icon(painterResource(materialSymbol(item.symbol)), contentDescription = null, tint = primary) },
        )
        is GuideItem.Fact -> ListItem(
            overlineContent = { Text(stringResource(item.title)) },
            headlineContent = { Text(stringResource(item.value)) },
            leadingContent = { Icon(painterResource(materialSymbol(item.symbol)), contentDescription = null, tint = primary) },
        )
        is GuideItem.Step -> ListItem(
            headlineContent = { Text(stringResource(item.title ?: item.text!!)) },
            supportingContent = if (item.title != null && item.text != null) ({ Text(stringResource(item.text!!)) }) else null,
            leadingContent = {
                Box(contentAlignment = Alignment.Center, modifier = Modifier.size(28.dp).background(primary, CircleShape)) {
                    Text("$number", style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onPrimary)
                }
            },
        )
        is GuideItem.Mail -> ListItem(
            headlineContent = { Text(item.address, color = primary) },
            leadingContent = { Icon(painterResource(R.drawable.ic_mail), contentDescription = null, tint = primary) },
            modifier = Modifier.clickable { onMail(item.address, item.subject) },
        )
    }
}
