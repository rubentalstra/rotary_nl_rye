package com.caelitechnologies.rotary_nl_rye.camps

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.net.toUri

/**
 * Opens a camp's invitation: a website in a Custom Tab (the browser, inside
 * the app); a PDF in the phone's PDF viewer, since a browser would only
 * download it, and in a Custom Tab when the phone has no viewer.
 */
fun Context.openInvitation(url: String, isPdf: Boolean) {
    val uri = url.toUri()
    if (isPdf) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/pdf").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
            return
        } catch (_: ActivityNotFoundException) {
            // No PDF viewer on this phone: the browser can still show or download it.
        }
    }
    try {
        CustomTabsIntent.Builder().setShowTitle(true).build().launchUrl(this, uri)
    } catch (_: ActivityNotFoundException) {
        // No browser at all: there is nothing to open.
    }
}
