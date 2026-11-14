package com.caelitechnologies.rotary_nl_rye.news

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertThrows
import org.junit.Assert.assertTrue
import org.junit.Test

/** RotaryNews' NewsFeedTests, ported: the published news.json of 2 October 2025. */
class NewsFeedTest {
    private val items = NewsFeed.read(checkNotNull(javaClass.getResourceAsStream("/news.json")).readBytes())

    private fun blocks(id: Int) = (items.first { it.id == id }.content as NewsItem.Content.Article).blocks

    @Test
    fun `all 17 items are read, newest first`() {
        assertEquals(17, items.size)
        assertEquals((0..16).reversed().toList(), items.map { it.id })
        assertEquals("Jaarverslag 2024-2025", items.first().title)
    }

    @Test
    fun `newsletters and reports are PDFs`() {
        assertEquals(15, items.count { it.isPdf })
        assertEquals(
            NewsItem.Content.Pdf("https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/jaarverslag-2024-2025.pdf"),
            items.first().content,
        )
    }

    @Test
    fun `an article keeps its heading, paragraphs, images and video in order`() {
        val corona = blocks(3)
        assertEquals(NewsItem.ArticleBlock.Heading("Belangrijke update inzake Rotary uitwisselingen"), corona.first())
        assertEquals(4, corona.count { it is NewsItem.ArticleBlock.Paragraph })
        assertEquals(NewsItem.ArticleBlock.Image("https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/news/rotary-youth-ex.png"), corona.last())
        assertTrue(blocks(4).any { it is NewsItem.ArticleBlock.Video })
    }

    @Test
    fun `an empty description is no summary`() {
        assertNull(items.first().summary)
        assertTrue(items.first { it.id == 2 }.summary.orEmpty().startsWith("NGSE"))
    }

    @Test
    fun `every item has a cover`() = assertTrue(items.all { it.coverUrl != null })

    @Test
    fun `a file that is not the news is unreadable`() {
        assertThrows(NewsFeed.LoadError.Unreadable::class.java) { NewsFeed.read("<html></html>".toByteArray()) }
    }

    @Test
    fun `an item without anything to open is left out`() {
        val json = """{"news":[{"id":1,"title":"Empty","description":"","images":"","isPdf":"no","pdf":null}]}"""
        assertTrue(NewsFeed.read(json.toByteArray()).isEmpty())
    }
}
