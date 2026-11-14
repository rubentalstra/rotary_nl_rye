package com.caelitechnologies.rotary_nl_rye.news

/** An item of the news: a PDF (a newsletter or report), or an article to read in the app. */
data class NewsItem(
    /** news.json's number; a higher number is newer. */
    val id: Int,
    val title: String,
    val summary: String? = null,
    val coverUrl: String? = null,
    val content: Content,
) {
    sealed interface Content {
        data class Pdf(val url: String) : Content

        data class Article(val blocks: List<ArticleBlock>) : Content
    }

    /** A piece of an article, in the order the article has them. */
    sealed interface ArticleBlock {
        data class Heading(val text: String) : ArticleBlock

        data class Paragraph(val text: String) : ArticleBlock

        data class Image(val url: String) : ArticleBlock

        data class Video(val url: String) : ArticleBlock
    }

    val isPdf: Boolean get() = content is Content.Pdf
}
