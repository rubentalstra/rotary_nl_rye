package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.navigation3.runtime.NavKey
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import com.caelitechnologies.rotary_nl_rye.core.programmes.PromoVideo
import kotlinx.serialization.Serializable

/** A programme's page. */
@Serializable
data class ProgrammeRoute(val programme: ExchangeProgramme) : NavKey

/** The podcast and its episodes. */
@Serializable
data object PodcastRoute : NavKey

/** A video, full screen. */
@Serializable
data class VideoRoute(val video: PromoVideo) : NavKey
