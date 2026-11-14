package com.caelitechnologies.rotary_nl_rye.ui.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import com.caelitechnologies.rotary_nl_rye.core.organisation.Role

/** The role's title in the app's language. */
@Composable
fun Role.text(): String = stringResource(title, *titleArgs.toTypedArray())
