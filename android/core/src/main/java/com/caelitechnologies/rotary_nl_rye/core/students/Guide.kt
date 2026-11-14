package com.caelitechnologies.rotary_nl_rye.core.students

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme

/**
 * A page of information for students, for outbounds ([OutboundGuide]) or
 * inbounds ([InboundGuide]). The text is the v13 app's, in the language it
 * was written in, and is not translated.
 */
interface StudentGuide {
    @get:StringRes
    val title: Int

    /** One line on what the page tells. */
    @get:StringRes
    val subtitle: Int

    /** The SF Symbol iOS shows; the app maps it to a Material Symbol. */
    val symbol: String
    val sections: List<GuideSection>
}

/** A part of a guide: an optional heading and its pieces. */
data class GuideSection(@param:StringRes val title: Int?, val items: List<GuideItem>)

/** One piece of a guide's section. */
sealed interface GuideItem {
    /** A paragraph. */
    data class Text(@param:StringRes val text: Int) : GuideItem

    /** A symbol with a title, a text or both. */
    data class Point(val symbol: String, @param:StringRes val title: Int?, @param:StringRes val text: Int?) : GuideItem

    /** A labelled value, such as an age. */
    data class Fact(val symbol: String, @param:StringRes val title: Int, @param:StringRes val value: Int) : GuideItem

    /** A numbered step or tip; the number is its place among the section's steps. */
    data class Step(@param:StringRes val title: Int?, @param:StringRes val text: Int?) : GuideItem

    /** A question, as asked at the selection day. */
    data class Question(@param:StringRes val text: Int) : GuideItem

    /** A remark in smaller type. */
    data class Note(@param:StringRes val text: Int) : GuideItem

    /** An address to mail, with a subject filled in. */
    data class Mail(val address: String, val subject: String?) : GuideItem
}

/** The programme's pages for outbounds, in the order to read them. */
val ExchangeProgramme.outboundGuides: List<OutboundGuide>
    get() = OutboundGuide.entries.filter { it.programme == this }
