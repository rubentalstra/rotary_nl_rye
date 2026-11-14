package com.caelitechnologies.rotary_nl_rye.core.organisation

import java.text.Normalizer
import java.util.Locale

/**
 * Someone people can reach: a member of a team, of ROTEX, or an emergency
 * contact. Only the name and a role are certain; the rest is what the person
 * chose to share. The name is the identity: two people are equal when their
 * names are (OrganisationTest checks no two people share one).
 */
class Person(
    val name: PersonName,
    /** The first role is the one shown under the name. */
    val roles: List<Role>,
    /**
     * Written the Dutch way, as people read it: `06 12 34 56 78`, or
     * `0182 61 26 76` with an area code. [ContactLinks] dials it as `+31…`.
     */
    val phone: String? = null,
    val email: String? = null,
    val club: String? = null,
    val district: String? = null,
    val photoUrl: String? = null,
    /** In the person's own words and language, shown as written. */
    val bio: String? = null,
) {
    init {
        require(roles.isNotEmpty()) { "$name has no role" }
    }

    /** The role shown under the name. */
    val role: Role get() = roles.first()

    /**
     * Whether [query] matches the name, the club, or a role's title in the
     * app's language ([title] reads it), ignoring case and accents.
     */
    fun matches(query: String, title: (Role) -> String): Boolean {
        val needle = query.trim().folded()
        if (needle.isEmpty()) return true
        val fields = listOf(name.toString(), club.orEmpty()) + roles.map(title)
        return fields.any { needle in it.folded() }
    }

    override fun equals(other: Any?) = other is Person && other.name == name

    override fun hashCode() = name.hashCode()

    override fun toString() = name.toString()
}

/** Lower case without accents, so "eric" finds "Éric". */
private fun String.folded(): String =
    Normalizer.normalize(this, Normalizer.Form.NFD).replace(Regex("\\p{Mn}+"), "").lowercase(Locale.ROOT)
