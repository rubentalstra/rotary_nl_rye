package com.caelitechnologies.rotary_nl_rye.about

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.about.AboutTopic
import com.caelitechnologies.rotary_nl_rye.navigation.AppTab
import com.caelitechnologies.rotary_nl_rye.ui.components.TabScaffold

/** The root of the About tab: what Rotary Youth Exchange is and stands for, and its motto. */
@Composable
fun AboutScreen() {
    TabScaffold(title = stringResource(AppTab.About.label)) { padding ->
        LazyColumn(
            contentPadding = padding,
            modifier = Modifier
                .fillMaxSize()
                .consumeWindowInsets(padding),
        ) {
            AboutTopic.entries.forEach { topic ->
                item(key = topic.name, contentType = "heading") { TopicHeading(topic) }
                topic.body?.let { body ->
                    item(key = "${topic.name}-body", contentType = "body") {
                        Text(
                            text = stringResource(body),
                            style = MaterialTheme.typography.bodyLarge,
                            modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                        )
                    }
                }
                items(topic.points.size, key = { "${topic.name}-$it" }, contentType = { "point" }) { index ->
                    ListItem(
                        headlineContent = { Text(stringResource(topic.points[index])) },
                        leadingContent = {
                            Icon(
                                painter = painterResource(R.drawable.ic_check_circle),
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                            )
                        },
                    )
                }
            }
            item(key = "motto", contentType = "motto") {
                Text(
                    text = stringResource(AboutTopic.motto),
                    style = MaterialTheme.typography.titleLarge,
                    fontStyle = FontStyle.Italic,
                    textAlign = TextAlign.Center,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 24.dp, vertical = 32.dp),
                )
            }
        }
    }
}

/** A topic's symbol and title. */
@Composable
private fun TopicHeading(topic: AboutTopic) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        modifier = Modifier
            .padding(start = 16.dp, end = 16.dp, top = 24.dp, bottom = 8.dp)
            .semantics(mergeDescendants = true) { heading() },
    ) {
        Icon(painter = painterResource(topic.icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary)
        Text(
            text = stringResource(topic.title),
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.primary,
        )
    }
}

/** A Material Symbol for each topic. */
private val AboutTopic.icon: Int
    get() = when (this) {
        AboutTopic.WhoWeAre -> R.drawable.ic_topic_who
        AboutTopic.Mission -> R.drawable.ic_topic_mission
        AboutTopic.Programmes -> R.drawable.ic_topic_programmes
        AboutTopic.Values -> R.drawable.ic_topic_values
    }
