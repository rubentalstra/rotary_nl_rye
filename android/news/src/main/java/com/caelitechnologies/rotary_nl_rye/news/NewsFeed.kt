package com.caelitechnologies.rotary_nl_rye.news

import com.caelitechnologies.rotary_nl_rye.core.networking.CachedFetch
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json

/**
 * The news: news.json on rotary.nl, loaded through [CachedFetch] and read
 * into items, newest first. An item without a title, or without a PDF or
 * any article text, is left out.
 */
class NewsFeed(private val fetch: CachedFetch, private val url: String = URL) {
    /** Why the news could not be loaded. */
    sealed class LoadError(message: String) : Exception(message) {
        data object Offline : LoadError("offline") {
            private fun readResolve(): Any = Offline
        }

        data class Server(val status: Int) : LoadError("HTTP $status")

        data object Unreadable : LoadError("unreadable") {
            private fun readResolve(): Any = Unreadable
        }
    }

    suspend fun items(): List<NewsItem> {
        val bytes = try {
            fetch.bytes(url)
        } catch (_: CachedFetch.Failure.Offline) {
            throw LoadError.Offline
        } catch (failure: CachedFetch.Failure.Server) {
            throw LoadError.Server(failure.status)
        }
        return read(bytes)
    }

    companion object {
        const val URL = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/news.json"

        private val json = Json { ignoreUnknownKeys = true }

        /** The items in news.json's bytes, newest first. */
        fun read(bytes: ByteArray): List<NewsItem> {
            val file = try {
                json.decodeFromString<NewsFile>(bytes.decodeToString())
            } catch (_: SerializationException) {
                throw LoadError.Unreadable
            } catch (_: IllegalArgumentException) {
                throw LoadError.Unreadable
            }
            return file.news.mapNotNull { it.item() }.sortedByDescending { it.id }
        }
    }
}

// The file as published: only the fields the app uses.

@Serializable
private data class NewsFile(val news: List<RawItem>)

@Serializable
private data class RawItem(
    val id: Int,
    val title: String,
    val description: String? = null,
    val images: String? = null,
    val isPdf: String? = null,
    val pdf: String? = null,
    val text: List<RawBlock>? = null,
) {
    @Serializable
    data class RawBlock(val heading: String? = null, val body: List<RawBody>? = null)

    @Serializable
    data class RawBody(val paragraph: List<String>? = null, val imageUrl: String? = null, val videoUrl: String? = null)

    fun item(): NewsItem? {
        val title = title.trim().ifEmpty { return null }
        val pdfUrl = link(pdf)
        val content = if (isPdf.equals("yes", ignoreCase = true) && pdfUrl != null) {
            NewsItem.Content.Pdf(pdfUrl)
        } else {
            articleBlocks().ifEmpty { return null }.let(NewsItem.Content::Article)
        }
        return NewsItem(id, title, description?.trim()?.ifEmpty { null }, link(images), content)
    }

    private fun articleBlocks(): List<NewsItem.ArticleBlock> = text.orEmpty().flatMap { block ->
        buildList {
            block.heading?.trim()?.takeIf { it.isNotEmpty() }?.let { add(NewsItem.ArticleBlock.Heading(it)) }
            block.body.orEmpty().forEach { body ->
                body.paragraph.orEmpty().map(String::trim).filter(String::isNotEmpty).forEach { add(NewsItem.ArticleBlock.Paragraph(it)) }
                link(body.imageUrl)?.let { add(NewsItem.ArticleBlock.Image(it)) }
                link(body.videoUrl)?.let { add(NewsItem.ArticleBlock.Video(it)) }
            }
        }
    }

    private fun link(text: String?): String? =
        text?.trim()?.takeIf { it.startsWith("https://", ignoreCase = true) || it.startsWith("http://", ignoreCase = true) }
}
