package com.caelitechnologies.rotary_nl_rye.ui.components

import android.content.ActivityNotFoundException
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalUriHandler

/**
 * Opens a `tel:`, `sms:`, `mailto:` or web link in the app the system picks
 * (the dialler only shows the number; it never calls by itself). On a device
 * without such an app nothing happens, rather than a crash.
 */
@Composable
fun rememberOpenLink(): (String) -> Unit {
    val uriHandler = LocalUriHandler.current
    return remember(uriHandler) {
        { uri ->
            try {
                uriHandler.openUri(uri)
            } catch (_: ActivityNotFoundException) {
                // No app for this link on this device: there is nothing to open.
            } catch (_: IllegalArgumentException) {
                // LocalUriHandler reports a link no app takes this way.
            }
        }
    }
}
