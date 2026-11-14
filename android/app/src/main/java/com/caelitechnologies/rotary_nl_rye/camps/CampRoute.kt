package com.caelitechnologies.rotary_nl_rye.camps

import androidx.navigation3.runtime.NavKey
import kotlinx.serialization.Serializable
import java.time.LocalDate

/** A camp's page, by the camp's identity: its title and first day (as a day number, for saving). */
@Serializable
data class CampRoute(val title: String, val startEpochDay: Long) : NavKey {
    constructor(camp: Camp) : this(camp.title, camp.start.toEpochDay())

    val id: Camp.Id get() = Camp.Id(title, LocalDate.ofEpochDay(startEpochDay))
}
