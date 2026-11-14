package com.caelitechnologies.rotary_nl_rye.ui.components

import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.platform.LocalConfiguration
import java.util.Locale

/**
 * The app's language for formatting dates, prices and country names: read
 * from the configuration Compose observes, so a change of language (also
 * the per-app language) redraws what depends on it.
 */
@Composable
@ReadOnlyComposable
fun currentLocale(): Locale = LocalConfiguration.current.locales[0]
