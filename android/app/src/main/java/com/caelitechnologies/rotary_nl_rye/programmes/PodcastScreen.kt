package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.annotation.OptIn
import androidx.compose.foundation.background
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
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.ui.compose.material3.buttons.PlayPauseButton
import androidx.media3.ui.compose.material3.buttons.SeekBackButton
import androidx.media3.ui.compose.material3.buttons.SeekForwardButton
import androidx.media3.ui.compose.material3.indicator.PositionText
import androidx.media3.ui.compose.material3.indicator.ProgressSlider
import androidx.media3.ui.compose.material3.indicator.RemainingDurationText
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.PodcastEpisode
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader

/** The podcast page, connected to its ViewModel. */
@Composable
fun PodcastRouteScreen(onBack: () -> Unit) {
    val viewModel = hiltViewModel<PodcastViewModel>()
    val state by viewModel.state.collectAsStateWithLifecycle()
    PodcastScreen(state, onToggle = viewModel::toggle, onBack = onBack)
}

/**
 * The podcast: what it is, its episodes, and the controls of the one
 * playing. Playback goes on when the page closes, with the system's media
 * controls in the notification.
 */
@kotlin.OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PodcastScreen(state: PodcastUiState, onToggle: (PodcastEpisode) -> Unit, onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.podcast_title)) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
            )
        },
    ) { padding ->
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding)) {
            item(key = "show", contentType = "show") { Show() }
            val player = state.player
            if (state.episode != null && player != null) {
                item(key = "nowPlayingHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.podcast_now_playing)) }
                item(key = "nowPlaying", contentType = "controls") { Controls(state.episode, player) }
            }
            item(key = "episodesHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.podcast_episodes)) }
            items(PodcastEpisode.entries, key = { it.name }, contentType = { "episode" }) { episode ->
                EpisodeItem(episode, isPlaying = state.isPlaying && state.episode == episode, onClick = { onToggle(episode) })
            }
        }
    }
}

/** The podcast's artwork, name and what it is about, centred, as a podcast app shows a show. */
@Composable
private fun Show() {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp),
        modifier = Modifier.fillMaxWidth().padding(horizontal = 24.dp, vertical = 16.dp),
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.size(128.dp).clip(MaterialTheme.shapes.extraLarge).background(MaterialTheme.colorScheme.primaryContainer),
        ) {
            Icon(painterResource(R.drawable.ic_podcasts), contentDescription = null, tint = MaterialTheme.colorScheme.onPrimaryContainer, modifier = Modifier.size(64.dp))
        }
        Text(stringResource(R.string.podcast_name), style = MaterialTheme.typography.headlineSmall, textAlign = TextAlign.Center)
        Text(
            stringResource(R.string.podcast_about),
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
        )
    }
}

/**
 * The episode that is loaded: who speak, the position to drag, the time
 * played and left, and back, play or pause, and forward, from Media3's
 * Material 3 controls.
 */
@OptIn(UnstableApi::class) // Media3's Compose controls are marked unstable while their API settles.
@Composable
private fun Controls(episode: PodcastEpisode, player: Player) {
    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
        Text(episode.guests, style = MaterialTheme.typography.titleMedium)
        ProgressSlider(player, modifier = Modifier.fillMaxWidth())
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            PositionText(player, color = MaterialTheme.colorScheme.onSurfaceVariant)
            RemainingDurationText(player, showNegative = true, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(24.dp, Alignment.CenterHorizontally),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            SeekBackButton(player)
            PlayPauseButton(player, modifier = Modifier.size(72.dp), iconSize = 48.dp)
            SeekForwardButton(player)
        }
    }
}

/** An episode: its number, guests and summary; a tap plays or pauses it. */
@Composable
private fun EpisodeItem(episode: PodcastEpisode, isPlaying: Boolean, onClick: () -> Unit) {
    val action = stringResource(if (isPlaying) R.string.podcast_pause_episode else R.string.podcast_play_episode)
    ListItem(
        overlineContent = { Text(stringResource(R.string.podcast_episode, episode.number)) },
        headlineContent = { Text(episode.guests) },
        supportingContent = { Text(stringResource(episode.summary)) },
        trailingContent = {
            Icon(
                painterResource(if (isPlaying) R.drawable.ic_pause_circle else R.drawable.ic_play_circle),
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(40.dp),
            )
        },
        modifier = Modifier.clickable(onClickLabel = action, onClick = onClick),
    )
}
