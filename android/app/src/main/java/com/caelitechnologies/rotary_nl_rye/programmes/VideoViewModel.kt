package com.caelitechnologies.rotary_nl_rye.programmes

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.media3.common.AudioAttributes
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.exoplayer.ExoPlayer
import com.caelitechnologies.rotary_nl_rye.core.programmes.PromoVideo
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext

/**
 * A video's player. It lives in the ViewModel so the video goes on from
 * where it was when the phone rotates or folds; it starts by itself, takes
 * the audio from the podcast, and is released when the page closes.
 */
@HiltViewModel(assistedFactory = VideoViewModel.Factory::class)
class VideoViewModel @AssistedInject constructor(
    @Assisted video: PromoVideo,
    @ApplicationContext context: Context,
) : ViewModel() {
    private val exoPlayer: ExoPlayer = ExoPlayer.Builder(context)
        .setAudioAttributes(
            AudioAttributes.Builder().setUsage(C.USAGE_MEDIA).setContentType(C.AUDIO_CONTENT_TYPE_MOVIE).build(),
            /* handleAudioFocus = */ true,
        )
        .setHandleAudioBecomingNoisy(true)
        .build()
        .apply {
            setMediaItem(MediaItem.fromUri(video.url))
            prepare()
            playWhenReady = true
        }

    val player: Player get() = exoPlayer

    override fun onCleared() {
        exoPlayer.release()
    }

    @AssistedFactory
    interface Factory {
        fun create(video: PromoVideo): VideoViewModel
    }
}
