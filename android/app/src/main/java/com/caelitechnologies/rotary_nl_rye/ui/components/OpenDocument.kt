package com.caelitechnologies.rotary_nl_rye.ui.components

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.net.toUri

/**
 * Opens a document from the internet: a PDF in the phone's PDF viewer (a
 * browser would only download it), a video in its video player, and
 * anything else, or a PDF on a phone without a viewer, in a Custom Tab (the
 * browser, inside the app).
 */
fun Context.openDocument(url: String, kind: DocumentKind = DocumentKind.Web) {
    val uri = url.toUri()
    val type = when (kind) {
        DocumentKind.Pdf -> "application/pdf"
        DocumentKind.Video -> "video/*"
        DocumentKind.Web -> null
    }
    if (type != null) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW).setDataAndType(uri, type).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
            return
        } catch (_: ActivityNotFoundException) {
            // No app for this type on this phone: the browser can still show or download it.
        }
    }
    try {
        CustomTabsIntent.Builder().setShowTitle(true).build().launchUrl(this, uri)
    } catch (_: ActivityNotFoundException) {
        // No browser at all: there is nothing to open.
    }
}

/** What a document is, for the app that opens it. */
enum class DocumentKind { Pdf, Video, Web }
