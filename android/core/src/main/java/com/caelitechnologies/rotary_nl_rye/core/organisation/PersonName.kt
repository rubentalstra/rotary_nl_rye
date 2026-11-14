package com.caelitechnologies.rotary_nl_rye.core.organisation

/**
 * A person's name as written: the given name and the family name with its
 * prefix ("van Dam"), empty for someone known by their given name only. It
 * is a person's natural identity in the app.
 */
data class PersonName(val given: String, val family: String) {
    /** "Toon ter Ellen": given name first, as the Dutch write a name. */
    override fun toString() = if (family.isEmpty()) given else "$given $family"
}
