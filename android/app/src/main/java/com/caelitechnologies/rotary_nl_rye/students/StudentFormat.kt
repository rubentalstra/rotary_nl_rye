package com.caelitechnologies.rotary_nl_rye.students

import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.res.stringResource
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.camps.countryName
import com.caelitechnologies.rotary_nl_rye.camps.flagOf
import com.caelitechnologies.rotary_nl_rye.core.students.Destination
import java.util.Locale

/** The country's name in the person's language, or "Europa". */
fun Destination.name(locale: Locale, europe: String): String = when (this) {
    is Destination.Country -> countryName(code, locale)
    Destination.Europe -> europe
}

/** The destination's name in the app's language. */
@Composable
@ReadOnlyComposable
fun Destination.displayName(locale: Locale): String = name(locale, stringResource(R.string.students_europe))

/** The country's flag, or the European flag. */
val Destination.flag: String
    get() = when (this) {
        is Destination.Country -> flagOf(code)
        Destination.Europe -> flagOf("EU")
    }
