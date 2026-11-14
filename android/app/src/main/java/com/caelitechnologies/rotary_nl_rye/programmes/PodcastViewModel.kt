package com.caelitechnologies.rotary_nl_rye.programmes

import android.content.ComponentName
import android.content.Context
import androidx.core.net.toUri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.PodcastEpisode
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.guava.await
import kotlinx.coroutines.launch

/**
 * The podcast page's state: a Media3 controller of [PodcastService], which
 * goes on playing when the page closes, and which episode it has and
 * whether it plays.
 */
@HiltViewModel
class PodcastViewModel @Inject constructor(
    @param:ApplicationContext private val context: Context,
) : ViewModel() {
    private val _state = MutableStateFlow(PodcastUiState())
    val state: StateFlow<PodcastUiState> = _state.asStateFlow()

    private var controller: MediaController? = null
    private val listener = object : Player.Listener {
        override fun onEvents(player: Player, events: Player.Events) = publish(player)
    }

    init {
        viewModelScope.launch {
            val token = SessionToken(context, ComponentName(context, PodcastService::class.java))
            val connected = MediaController.Builder(context, token).buildAsync().await()
            controller = connected
            connected.addListener(listener)
            publish(connected)
        }
    }

    /** Pauses the episode when it plays, else plays it, from where it was when it is the one loaded. */
    fun toggle(episode: PodcastEpisode) {
        val player = controller ?: return
        if (_state.value.episode == episode) {
            if (player.isPlaying) player.pause() else player.play()
        } else {
            player.setMediaItem(mediaItem(episode))
            player.prepare()
            player.play()
        }
    }

    private fun mediaItem(episode: PodcastEpisode): MediaItem =
        MediaItem.Builder()
            .setMediaId(episode.name)
            .setUri(episode.audioUrl.toUri())
            .setMediaMetadata(
                MediaMetadata.Builder()
                    .setTitle(episode.guests)
                    .setArtist(context.getString(R.string.podcast_name))
                    .setAlbumTitle(context.getString(R.string.podcast_title))
                    .setTrackNumber(episode.number)
                    .setMediaType(MediaMetadata.MEDIA_TYPE_PODCAST_EPISODE)
                    .build(),
            )
            .build()

    private fun publish(player: Player) {
        _state.value = PodcastUiState(
            player = player,
            episode = player.currentMediaItem?.mediaId?.let { id -> PodcastEpisode.entries.firstOrNull { it.name == id } },
            isPlaying = player.isPlaying,
        )
    }

    override fun onCleared() {
        // Releasing the controller leaves the service playing; it stops itself when paused.
        controller?.run {
            removeListener(listener)
            release()
        }
        controller = null
    }
}

/**
 * The podcast page's state. [player] drives Media3's controls (position,
 * buttons); it is null until the controller has connected.
 */
data class PodcastUiState(
    val player: Player? = null,
    val episode: PodcastEpisode? = null,
    val isPlaying: Boolean = false,
)
