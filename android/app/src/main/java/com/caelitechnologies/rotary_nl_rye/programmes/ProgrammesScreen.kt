package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import com.caelitechnologies.rotary_nl_rye.core.programmes.PromoVideo
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader

/**
 * The exchange programmes, each opening its own page, and under them the
 * podcast and the videos to listen to and watch.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProgrammesScreen(
    onBack: () -> Unit,
    onProgramme: (ExchangeProgramme) -> Unit,
    onPodcast: () -> Unit,
    onVideo: (PromoVideo) -> Unit,
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.home_programmes)) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
            )
        },
    ) { padding ->
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding)) {
            item(key = "exchanges", contentType = "header") { ListSectionHeader(stringResource(R.string.programmes_exchanges)) }
            items(ExchangeProgramme.entries, key = { it.name }, contentType = { "programme" }) { programme ->
                ProgrammeItem(programme, onClick = { onProgramme(programme) })
            }
            item(key = "listen", contentType = "header") { ListSectionHeader(stringResource(R.string.programmes_listen_watch)) }
            item(key = "podcast", contentType = "media") {
                MediaItem(
                    title = stringResource(R.string.podcast_title),
                    summary = stringResource(R.string.podcast_subtitle),
                    icon = R.drawable.ic_podcasts,
                    onClick = onPodcast,
                )
            }
            items(PromoVideo.entries, key = { it.name }, contentType = { "media" }) { video ->
                MediaItem(
                    title = stringResource(video.title),
                    summary = stringResource(video.summary),
                    icon = R.drawable.ic_play_circle,
                    onClick = { onVideo(video) },
                )
            }
        }
    }
}

/** A programme: its first photo (or its symbol), its name, one line on it, and who it is for. */
@Composable
private fun ProgrammeItem(programme: ExchangeProgramme, onClick: () -> Unit) {
    ListItem(
        headlineContent = { Text(stringResource(programme.title)) },
        supportingContent = {
            Column {
                Text(stringResource(programme.tagline))
                // Who it is for decides whether to read on, so it reads in full colour.
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(top = 4.dp)) {
                    Icon(painterResource(R.drawable.ic_person), contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(16.dp))
                    Spacer(Modifier.width(4.dp))
                    Text(stringResource(programme.ageText), style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSurface)
                }
            }
        },
        leadingContent = { ProgrammeThumbnail(programme) },
        modifier = Modifier.clickable(onClick = onClick),
    )
}

/** The programme's first photo, or its symbol on the primary container colour when it has none. */
@Composable
private fun ProgrammeThumbnail(programme: ExchangeProgramme) {
    val shape = MaterialTheme.shapes.medium
    val photo = programme.photos.firstOrNull()
    if (photo != null) {
        Image(
            painter = painterResource(photo.image),
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier.size(64.dp).clip(shape),
        )
    } else {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.size(64.dp).clip(shape).background(MaterialTheme.colorScheme.primaryContainer),
        ) {
            Icon(painterResource(programme.icon), contentDescription = null, tint = MaterialTheme.colorScheme.onPrimaryContainer)
        }
    }
}

/** Something to listen to or watch: its symbol, title and what it is. */
@Composable
private fun MediaItem(title: String, summary: String, icon: Int, onClick: () -> Unit) {
    ListItem(
        headlineContent = { Text(title) },
        supportingContent = { Text(summary) },
        leadingContent = { Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        modifier = Modifier.clickable(onClick = onClick),
    )
}
