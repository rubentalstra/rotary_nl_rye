package com.caelitechnologies.rotary_nl_rye.camps

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Checkbox
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import java.util.Locale

/** The countries in the sheet with a checkbox each, in a bottom sheet; "all countries" first. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CountrySheet(state: CampsUiState, actions: CampsActions, onDismiss: () -> Unit) {
    val locale = currentLocale()
    ModalBottomSheet(onDismissRequest = onDismiss) {
        LazyColumn(Modifier.navigationBarsPadding()) {
            item(key = "all") {
                ListItem(
                    headlineContent = { Text(stringResource(R.string.camps_all_countries)) },
                    trailingContent = { Checkbox(checked = state.filters.countries.isEmpty(), onCheckedChange = null) },
                    modifier = Modifier.clickable(onClick = actions.onClearCountries),
                )
            }
            items(state.availableCountries, key = { it }) { code ->
                ListItem(
                    leadingContent = { Text(flagOf(code), style = MaterialTheme.typography.titleLarge) },
                    headlineContent = { Text(countryName(code, locale)) },
                    trailingContent = { Checkbox(checked = code in state.filters.countries, onCheckedChange = null) },
                    modifier = Modifier.clickable { actions.onToggleCountry(code) },
                )
            }
        }
    }
}
