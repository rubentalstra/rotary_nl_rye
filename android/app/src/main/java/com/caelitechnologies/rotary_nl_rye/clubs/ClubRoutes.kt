package com.caelitechnologies.rotary_nl_rye.clubs

import androidx.navigation3.runtime.NavKey
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubGuide
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubTopic
import kotlinx.serialization.Serializable

/** A topic's page. */
@Serializable
data class ClubTopicRoute(val topic: ClubTopic) : NavKey

/** A role's page of documents. */
@Serializable
data class ClubGuideRoute(val guide: ClubGuide) : NavKey
