package com.caelitechnologies.rotary_nl_rye.programmes

import android.app.PendingIntent
import android.content.Intent
import androidx.media3.common.AudioAttributes
import androidx.annotation.OptIn
import androidx.media3.common.C
import androidx.media3.common.util.UnstableApi
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.session.MediaSession
import androidx.media3.session.MediaSessionService
import com.caelitechnologies.rotary_nl_rye.MainActivity

/**
 * Plays the podcast, also with the screen off or in another app: Media3's
 * session service, which shows the system's media notification and takes
 * the lock screen's, a headset's and Bluetooth controls. It pauses when
 * headphones come out and when another app plays. Only trusted controllers
 * connect: this app, the system, and apps allowed to control media.
 */
class PodcastService : MediaSessionService() {
    private var session: MediaSession? = null

    override fun onCreate() {
        super.onCreate()
        val player = ExoPlayer.Builder(this)
            .setAudioAttributes(
                AudioAttributes.Builder().setUsage(C.USAGE_MEDIA).setContentType(C.AUDIO_CONTENT_TYPE_SPEECH).build(),
                /* handleAudioFocus = */ true,
            )
            .setHandleAudioBecomingNoisy(true)
            .setSeekBackIncrementMs(SKIP_MS)
            .setSeekForwardIncrementMs(SKIP_MS)
            .build()
        // Tapping the notification opens the app where the person left it.
        val openApp = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java).setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
        )
        session = MediaSession.Builder(this, player)
            .setSessionActivity(openApp)
            .setCallback(TrustedControllersOnly)
            .build()
    }

    override fun onGetSession(controllerInfo: MediaSession.ControllerInfo): MediaSession? = session

    override fun onDestroy() {
        session?.run {
            player.release()
            release()
        }
        session = null
        super.onDestroy()
    }

    /**
     * The service is exported for the system's media controls; any other app
     * that binds it is turned away (`android-intent-security`).
     */
    private object TrustedControllersOnly : MediaSession.Callback {
        @OptIn(UnstableApi::class) // isTrusted is marked unstable; it is what Media3 offers to tell the system's controllers.
        override fun onConnect(session: MediaSession, controller: MediaSession.ControllerInfo): MediaSession.ConnectionResult =
            if (controller.isTrusted) super.onConnect(session, controller) else MediaSession.ConnectionResult.reject()
    }

    private companion object {
        /** Back and forward by 15 seconds, as podcast apps do. */
        const val SKIP_MS = 15_000L
    }
}
