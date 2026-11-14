package com.caelitechnologies.rotary_nl_rye.core.clubs

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** RotaryCore's RotaryClubsTests, ported. */
class RotaryClubsTest {
    @Test
    fun `every document is in at least one guide`() {
        assertEquals(ClubDocument.entries.toSet(), ClubGuide.entries.flatMap { it.documents }.toSet())
    }

    @Test
    fun `every document is a PDF on rotary nl over https`() {
        ClubDocument.entries.forEach {
            assertTrue(it.url, it.url.startsWith("https://www.rotary.nl/") && it.url.endsWith(".pdf"))
        }
    }

    @Test
    fun `no two documents share a link`() {
        assertEquals(ClubDocument.entries.size, ClubDocument.entries.map { it.url }.toSet().size)
    }

    @Test
    fun `no document is twice in a guide`() {
        ClubGuide.entries.forEach { assertEquals(it.name, it.documents.size, it.documents.toSet().size) }
    }

    @Test
    fun `the shared documents are one document in several guides`() {
        assertEquals(3, ClubGuide.entries.count { ClubDocument.FirstNightQuestions in it.documents })
        assertEquals(3, ClubGuide.entries.count { ClubDocument.TravelRules in it.documents })
    }

    @Test
    fun `every topic has text`() {
        ClubTopic.entries.forEach { assertTrue(it.name, it.paragraphs.isNotEmpty()) }
    }
}
