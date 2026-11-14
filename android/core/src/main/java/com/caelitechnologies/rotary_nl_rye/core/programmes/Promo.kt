// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.programmes

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/** An episode of the Rotary Youth Exchange podcast: host parents tell about their exchange student. */
enum class PodcastEpisode(
    /** The episode's place in the series. */
    val number: Int,
    /** Who speak in it, as their names are written. */
    val guests: String,
    @param:StringRes val summary: Int,
    val audioUrl: String,
) {
    Teunissen(number = 1, guests = "Sharon en Michel Teunissen", summary = R.string.podcast_teunissen_summary, audioUrl = PODCAST + "rotary-sharon-en-michel-teunissen.mp3"),
    Stolp(number = 2, guests = "Ellen en Steven Stolp", summary = R.string.podcast_stolp_summary, audioUrl = PODCAST + "rotary-ellen-en-steven-stolp.mp3");
}

/** A promotional video of Rotary Youth Exchange. */
enum class PromoVideo(
    @param:StringRes val title: Int,
    @param:StringRes val summary: Int,
    val url: String,
) {
    Promo(title = R.string.video_promo_title, summary = R.string.video_promo_summary, url = VIDEOS + "rotary-promo-short.mp4"),
    FifthAvenue(title = R.string.video_fifth_avenue_title, summary = R.string.video_fifth_avenue_summary, url = VIDEOS + "5th-avenue-jeugd.mp4");
}

private const val PODCAST = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/podcast/"
private const val VIDEOS = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/videos/promo/"
