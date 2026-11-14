package com.caelitechnologies.rotary_nl_rye.core.programmes

import java.math.BigDecimal
import java.net.URI
import java.util.Locale
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** RotaryCore's ProgrammesTests, ported. */
class ProgrammesTest {
    @Test
    fun `there are the three exchange programmes`() {
        assertEquals(
            listOf(ExchangeProgramme.LongTerm, ExchangeProgramme.FamilyToFamily, ExchangeProgramme.SummerCamps),
            ExchangeProgramme.entries,
        )
    }

    @Test
    fun `every programme says what it is, costs and how to sign up`() {
        ExchangeProgramme.entries.forEach {
            assertTrue(it.name, it.about.isNotEmpty())
            assertTrue(it.name, it.cost.amount > BigDecimal.ZERO)
            assertTrue(it.name, it.signUpEmail.endsWith("@rotaryyep.nl"))
            assertTrue(it.name, it.highlights.points.isNotEmpty())
        }
    }

    @Test
    fun `the prices are the published ones`() {
        assertEquals(0, ExchangeProgramme.LongTerm.cost.amount.compareTo(BigDecimal(2400)))
        assertTrue(ExchangeProgramme.LongTerm.cost.isMinimum)
        assertEquals(0, ExchangeProgramme.FamilyToFamily.cost.amount.compareTo(BigDecimal("181.50")))
        assertEquals(0, ExchangeProgramme.SummerCamps.cost.amount.compareTo(BigDecimal(121)))
    }

    @Test
    fun `the summer camps are signed up for at the camps address`() {
        assertEquals("zomerkamp@rotaryyep.nl", ExchangeProgramme.SummerCamps.signUpEmail)
    }

    @Test
    fun `every destination is a real country`() {
        val countries = Locale.getISOCountries().toSet()
        ExchangeProgramme.entries.flatMap { p -> p.destinations.flatMap { it.countries } }.forEach {
            assertTrue(it, it in countries)
        }
    }

    @Test
    fun `every episode is an MP3 on rotary nl over https`() {
        PodcastEpisode.entries.forEach {
            val url = URI(it.audioUrl)
            assertEquals("https", url.scheme)
            assertEquals("www.rotary.nl", url.host)
            assertTrue(it.audioUrl, url.path.endsWith(".mp3"))
        }
    }

    @Test
    fun `episodes are numbered in order`() {
        assertEquals(listOf(1, 2), PodcastEpisode.entries.map { it.number })
    }

    @Test
    fun `the short promo comes first`() {
        assertEquals(listOf(PromoVideo.Promo, PromoVideo.FifthAvenue), PromoVideo.entries)
        assertTrue(PromoVideo.Promo.url.endsWith("/rotary-promo-short.mp4"))
    }

    @Test
    fun `every video is an MP4 on rotary nl over https`() {
        PromoVideo.entries.forEach {
            val url = URI(it.url)
            assertEquals("https", url.scheme)
            assertTrue(it.url, url.path.endsWith(".mp4"))
        }
    }
}
