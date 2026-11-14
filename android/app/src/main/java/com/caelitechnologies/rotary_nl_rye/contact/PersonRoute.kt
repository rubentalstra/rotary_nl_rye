package com.caelitechnologies.rotary_nl_rye.contact

import androidx.navigation3.runtime.NavKey
import com.caelitechnologies.rotary_nl_rye.core.organisation.ContactGroup
import com.caelitechnologies.rotary_nl_rye.core.organisation.Person
import com.caelitechnologies.rotary_nl_rye.core.organisation.PersonName
import kotlinx.serialization.Serializable

/**
 * A person's page, by their name (their identity), so the route survives
 * process death as text and finds the same person again.
 */
@Serializable
data class PersonRoute(val given: String, val family: String) : NavKey {
    constructor(person: Person) : this(person.name.given, person.name.family)

    /** The person, from the groups that define the app's people. */
    val person: Person?
        get() = ContactGroup.entries.asSequence().flatMap { it.members }.firstOrNull { it.name == PersonName(given, family) }
}
