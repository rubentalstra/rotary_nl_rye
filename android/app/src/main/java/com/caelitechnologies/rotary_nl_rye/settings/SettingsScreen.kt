package com.caelitechnologies.rotary_nl_rye.settings

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.core.net.toUri
import com.caelitechnologies.rotary_nl_rye.BuildConfig
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.AppIdentity
import com.caelitechnologies.rotary_nl_rye.navigation.AppTab
import com.caelitechnologies.rotary_nl_rye.ui.components.ActionButton
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionFooter
import com.caelitechnologies.rotary_nl_rye.ui.components.TabScaffold
import com.caelitechnologies.rotary_nl_rye.ui.components.openDocument
import com.caelitechnologies.rotary_nl_rye.ui.theme.DarkColors
import com.caelitechnologies.rotary_nl_rye.ui.theme.LightColors
import com.caelitechnologies.rotary_nl_rye.ui.theme.Typography
import com.google.android.gms.oss.licenses.v2.OssLicensesMenuActivity

/**
 * The root of the Settings tab: the app's language (Android's own per-app
 * language page), rating the app, ROTEX on Instagram, the legal pages, the
 * licences and which version this is. Sharing the app is the top bar's
 * action.
 */
@Composable
fun SettingsScreen(perAppLanguage: Boolean = Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
    val context = LocalContext.current
    val shareLabel = stringResource(R.string.settings_share)
    val shareMessage = stringResource(R.string.settings_share_message)
    val licencesTitle = stringResource(R.string.settings_licences)
    TabScaffold(
        title = stringResource(AppTab.Settings.label),
        actions = { ActionButton(shareLabel, R.drawable.ic_share) { context.shareApp(shareMessage) } },
    ) { padding ->
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding)) {
            if (perAppLanguage) {
                item(key = "language", contentType = "row") {
                    Row(R.string.settings_language, R.drawable.ic_language, trailing = R.drawable.ic_open_in_new) { context.openAppLanguageSettings() }
                }
            }
            item(key = "languageFooter", contentType = "footer") {
                ListSectionFooter(stringResource(if (perAppLanguage) R.string.settings_language_footer else R.string.settings_language_footer_phone))
            }
            item(key = "divider1", contentType = "divider") { HorizontalDivider(Modifier.padding(vertical = 8.dp)) }
            item(key = "rate", contentType = "row") { Row(R.string.settings_rate, R.drawable.ic_star) { context.openPlayStoreListing() } }
            item(key = "instagram", contentType = "row") {
                ListItem(
                    headlineContent = { Text(stringResource(R.string.settings_instagram)) },
                    supportingContent = { Text("@rotexnederland") },
                    // Instagram's own logo, in its colours.
                    leadingContent = { Icon(painterResource(R.drawable.ic_instagram), contentDescription = null, tint = Color.Unspecified) },
                    modifier = Modifier.clickable { context.openDocument(AppIdentity.INSTAGRAM_URL) },
                )
            }
            item(key = "divider2", contentType = "divider") { HorizontalDivider(Modifier.padding(vertical = 8.dp)) }
            item(key = "privacy", contentType = "row") { Row(R.string.settings_privacy, R.drawable.ic_front_hand) { context.openDocument(AppIdentity.PRIVACY_POLICY_URL) } }
            item(key = "terms", contentType = "row") { Row(R.string.settings_terms, R.drawable.ic_gavel) { context.openDocument(AppIdentity.TERMS_URL) } }
            item(key = "licences", contentType = "row") {
                Row(R.string.settings_licences, R.drawable.ic_license) {
                    // Google's licence screen, in Rotary's colours and the app's title.
                    OssLicensesMenuActivity.setActivityTitle(licencesTitle)
                    OssLicensesMenuActivity.setTheme(LightColors, DarkColors, Typography)
                    context.startActivity(Intent(context, OssLicensesMenuActivity::class.java))
                }
            }
            item(key = "divider3", contentType = "divider") { HorizontalDivider(Modifier.padding(vertical = 8.dp)) }
            item(key = "version", contentType = "row") {
                ListItem(
                    headlineContent = { Text(stringResource(R.string.settings_version)) },
                    supportingContent = { Text("${BuildConfig.VERSION_NAME} (${BuildConfig.VERSION_CODE})") },
                    leadingContent = { Icon(painterResource(R.drawable.ic_info), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                )
            }
            item(key = "organisation", contentType = "footer") {
                Text(
                    "Rotary Youth Exchange Nederland",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth().padding(24.dp),
                )
            }
        }
    }
}

@Composable
private fun Row(title: Int, icon: Int, trailing: Int? = null, onClick: () -> Unit) {
    ListItem(
        headlineContent = { Text(stringResource(title)) },
        leadingContent = { Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        trailingContent = trailing?.let { { Icon(painterResource(it), contentDescription = null, tint = MaterialTheme.colorScheme.onSurfaceVariant) } },
        modifier = Modifier.clickable(onClick = onClick),
    )
}

/** Android's share sheet with the app's Play Store listing. */
private fun Context.shareApp(message: String) {
    val send = Intent(Intent.ACTION_SEND)
        .setType("text/plain")
        .putExtra(Intent.EXTRA_TITLE, "Rotary YEP NL")
        .putExtra(Intent.EXTRA_TEXT, "$message\n${AppIdentity.PLAY_STORE_URL}")
    startActivity(Intent.createChooser(send, null))
}

/** Android 13's page where this app's language is chosen, apart from the phone's. */
private fun Context.openAppLanguageSettings() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return
    try {
        startActivity(Intent(Settings.ACTION_APP_LOCALE_SETTINGS, "package:$packageName".toUri()))
    } catch (_: ActivityNotFoundException) {
        // A phone without the page: the app's own details page has the language too.
        startActivity(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, "package:$packageName".toUri()))
    }
}

/** The app's listing in the Play Store app, to rate it; the listing on the web without the Play Store. */
private fun Context.openPlayStoreListing() {
    try {
        startActivity(Intent(Intent.ACTION_VIEW, "market://details?id=${AppIdentity.PACKAGE_NAME}".toUri()).setPackage("com.android.vending"))
    } catch (_: ActivityNotFoundException) {
        openDocument(AppIdentity.PLAY_STORE_URL)
    }
}
