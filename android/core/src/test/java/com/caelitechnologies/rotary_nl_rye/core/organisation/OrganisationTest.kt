package com.caelitechnologies.rotary_nl_rye.core.organisation

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** The same checks as RotaryCore's OrganisationTests on iOS. */
class OrganisationTest {
    private val everyone = ContactGroup.entries.flatMap { it.members }
    private val team = ContactGroup.teams.flatMap { it.members }.toSet()

    @Test
    fun `the Contact tab has the four teams`() {
        assertEquals(listOf(ContactGroup.Mdjc, ContactGroup.LongTerm, ContactGroup.ShortTerm, ContactGroup.Rotex), ContactGroup.teams)
        assertEquals(40, team.size)
    }

    @Test
    fun `the emergency group is people from the teams`() {
        assertTrue(ContactGroup.Emergency.members.all { it in team })
    }

    @Test
    fun `the confidants are not in the Contact tab`() {
        assertTrue(ContactGroup.Confidants.members.none { it in team })
    }

    @Test
    fun `everyone in an emergency group can be called`() {
        ContactGroup.emergencyGroups.flatMap { it.members }.forEach {
            assertTrue("$it has no phone", it.phone != null)
        }
    }

    @Test
    fun `no two different people share a name`() {
        // Equality is the name, so compare what else they hold.
        everyone.groupBy { it.name }.forEach { (name, people) ->
            assertEquals("two people named $name", 1, people.map { listOf(it.phone, it.email, it.bio) }.distinct().size)
        }
    }

    @Test
    fun `no one is twice in a group`() {
        ContactGroup.entries.forEach { assertEquals(it.name, it.members.size, it.members.toSet().size) }
    }

    @Test
    fun `the badge follows the groups`() {
        assertEquals(Organisation.Rotex, ContactGroup.Rotex.members.first().organisation)
        assertEquals(Organisation.Rotary, ContactGroup.Mdjc.members.first().organisation)
        assertNull(ContactGroup.Confidants.members.first().organisation)
    }

    @Test
    fun `every photo is on rotary nl over https`() {
        everyone.mapNotNull { it.photoUrl }.forEach { assertTrue(it, it.startsWith("https://www.rotary.nl/")) }
    }
}
