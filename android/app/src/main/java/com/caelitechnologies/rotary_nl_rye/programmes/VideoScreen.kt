package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.annotation.OptIn
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.LifecycleStartEffect
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.ui.compose.material3.PlayerDefaults
import androidx.media3.ui.compose.state.rememberPlayPauseButtonState
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.PromoVideo
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import kotlinx.coroutines.delay

/** A video's page, connected to the ViewModel that holds its player. */
@Composable
fun VideoRouteScreen(route: VideoRoute, onBack: () -> Unit) {
    val viewModel = hiltViewModel<VideoViewModel, VideoViewModel.Factory>(key = route.toString()) { it.create(route.video) }
    VideoScreen(route.video, viewModel.player, onBack)
}

/**
 * A video on black in the dark theme, with Media3's Material 3 controls:
 * a tap shows them, and they hide again a moment after, while it plays. It
 * pauses when the app goes to the background.
 */
@kotlin.OptIn(ExperimentalMaterial3Api::class)
@OptIn(UnstableApi::class) // Media3's Compose player is marked unstable while its API settles.
@Composable
fun VideoScreen(video: PromoVideo, player: Player, onBack: () -> Unit) {
    LifecycleStartEffect(player) { onStopOrDispose { player.pause() } }
    var showControls by rememberSaveable { mutableStateOf(true) }
    val playing = !rememberPlayPauseButtonState(player).showPlay
    LaunchedEffect(showControls, playing) {
        if (showControls && playing) {
            delay(CONTROLS_VISIBLE_MS)
            showControls = false
        }
    }
    RotaryTheme(darkTheme = true) {
        Scaffold(
            containerColor = MaterialTheme.colorScheme.scrim,
            topBar = {
                TopAppBar(
                    title = { Text(stringResource(video.title), maxLines = 1) },
                    navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
                )
            },
        ) { padding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = padding.calculateTopPadding())
                    .consumeWindowInsets(padding)
                    .background(MaterialTheme.colorScheme.scrim)
                    .clickable(interactionSource = remember { MutableInteractionSource() }, indication = null) { showControls = !showControls },
            ) {
                androidx.media3.ui.compose.material3.Player(
                    player = player,
                    modifier = Modifier.fillMaxSize(),
                    showControls = showControls,
                    centerControls = { p, visible ->
                        // One video, so no previous and next.
                        PlayerDefaults.CenterControls(p, visible, Modifier.fillMaxWidth(), backSecondary = {}, forwardSecondary = {})
                    },
                    bottomControls = { p, visible ->
                        PlayerDefaults.BottomControls(p, visible, Modifier.windowInsetsPadding(WindowInsets.navigationBars))
                    },
                )
            }
        }
    }
}

/** How long the controls stay after a tap while the video plays. */
private const val CONTROLS_VISIBLE_MS = 3_000L
