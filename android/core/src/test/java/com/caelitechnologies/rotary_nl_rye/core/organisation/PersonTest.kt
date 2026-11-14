package com.caelitechnologies.rotary_nl_rye.core.organisation

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class PersonTest {
    private val person = Person(
        name = PersonName("Toon", "ter Ellen"),
        roles = listOf(Role.ChairYouthExchange, Role.Secretary),
        phone = "06 12 34 56 78",
        club = "RC Lelystad",
    )
    private val title: (Role) -> String = { if (it == Role.Secretary) "Secretaris" else "Voorzitter" }

    @Test
    fun `the first role is the one under the name`() {
        assertEquals(Role.ChairYouthExchange, person.role)
    }

    @Test
    fun `the name is the identity`() {
        assertEquals(person, Person(PersonName("Toon", "ter Ellen"), listOf(Role.Treasurer)))
    }

    @Test
    fun `search matches name, club and role, without case or accents`() {
        listOf("toon", "ter ellen", "lelystad", "secretaris", "", "  ", "TÔON").forEach {
            assertTrue("\"$it\" should match", person.matches(it, title))
        }
    }

    @Test
    fun `search does not match what is not there`() {
        assertFalse(person.matches("Groningen", title))
    }

    @Test
    fun `a Dutch number is dialled internationally, so it works from abroad`() {
        assertEquals("tel:+31612345678", ContactLinks.call("06 12 34 56 78"))
        assertEquals("tel:+31182612676", ContactLinks.call("0182 61 26 76"))
        assertEquals("sms:+31612345678", ContactLinks.message("06 12 34 56 78"))
        assertEquals("https://wa.me/31612345678", ContactLinks.whatsApp("06 12 34 56 78"))
        assertEquals("tel:+49301234567", ContactLinks.call("+49 30 1234567"))
        assertEquals("mailto:chair@rotaryyep.nl", ContactLinks.mail(" chair@rotaryyep.nl"))
    }

    @Test
    fun `only a mobile number can receive a text or WhatsApp`() {
        assertTrue(ContactLinks.isMobile("06 12 34 56 78"))
        assertTrue(ContactLinks.isMobile("+31 6 12345678"))
        assertFalse(ContactLinks.isMobile("0182 61 26 76"))
        assertFalse(ContactLinks.isMobile("+49 30 1234567"))
    }
}
