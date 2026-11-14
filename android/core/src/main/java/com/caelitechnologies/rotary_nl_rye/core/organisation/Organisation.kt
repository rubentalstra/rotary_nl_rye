package com.caelitechnologies.rotary_nl_rye.core.organisation

/** The organisation someone is part of, shown as a badge with their photo. */
enum class Organisation {
    /** Rotary: the MDJC and the Long Term and Short Term teams. */
    Rotary,

    /** ROTEX, the association of returned exchange students. */
    Rotex,
}

/**
 * Follows from the groups the person is in, so it never drifts from them:
 * ROTEX for a ROTEX member, Rotary for anyone in another team, none for
 * someone outside the teams (the independent confidants).
 */
val Person.organisation: Organisation?
    get() = when {
        this in ContactGroup.Rotex.members -> Organisation.Rotex
        ContactGroup.teams.any { this in it.members } -> Organisation.Rotary
        else -> null
    }
