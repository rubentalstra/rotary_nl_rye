package com.caelitechnologies.rotary_nl_rye.camps

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import com.caelitechnologies.rotary_nl_rye.ui.components.DocumentKind
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.openDocument
import java.util.Locale

/** A camp's page, connected to its ViewModel; back when the camp is not loaded (after the process was ended). */
@Composable
fun CampDetailRoute(route: CampRoute, onBack: () -> Unit) {
    val viewModel = hiltViewModel<CampDetailViewModel, CampDetailViewModel.Factory>(key = route.toString()) { it.create(route.id) }
    val camp = viewModel.camp
    if (camp == null) {
        LaunchedEffect(Unit) { onBack() }
    } else {
        CampDetailScreen(camp, onBack)
    }
}

/**
 * Everything about one camp: where and when, for whom, what it costs, which
 * district hosts it, and its invitation.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CampDetailScreen(camp: Camp, onBack: () -> Unit) {
    val locale = currentLocale()
    val context = LocalContext.current
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(camp.countryName(locale)) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
            )
        },
    ) { padding ->
        LazyColumn(
            contentPadding = padding,
            modifier = Modifier
                .fillMaxSize()
                .consumeWindowInsets(padding),
        ) {
            item(key = "header") { CampHeader(camp, locale) }
            item(key = "when") { ListSectionHeader(stringResource(R.string.camps_when)) }
            item(key = "from") { Fact(R.drawable.ic_calendar, camp.start.fullDate(locale), stringResource(R.string.camps_from)) }
            item(key = "until") { Fact(R.drawable.ic_calendar, camp.end.fullDate(locale), stringResource(R.string.camps_until)) }
            if (camp.nights > 0) {
                item(key = "nights") { Fact(R.drawable.ic_nights, pluralStringResource(R.plurals.camps_nights, camp.nights.toInt(), camp.nights.toInt()), stringResource(R.string.camps_length)) }
            }
            item(key = "who") { ListSectionHeader(stringResource(R.string.camps_who)) }
            item(key = "ages") { Fact(R.drawable.ic_person, pluralStringResource(R.plurals.camps_ages_long, camp.ages.last, camp.ages.first, camp.ages.last), stringResource(R.string.camps_age)) }
            item(key = "cost") {
                Fact(R.drawable.ic_payments, camp.contribution?.formatted(locale, cents = true) ?: stringResource(R.string.camps_not_known), stringResource(R.string.camps_cost))
            }
            if (camp.hostDistricts.isNotEmpty()) {
                item(key = "districts") {
                    Fact(
                        R.drawable.ic_map,
                        android.icu.text.ListFormatter.getInstance(locale).format(camp.hostDistricts.map { it.toString() }),
                        pluralStringResource(R.plurals.camps_host_districts, camp.hostDistricts.size),
                    )
                }
            }
            camp.invitation?.let { url ->
                item(key = "invitation") {
                    Box(Modifier.fillMaxWidth().padding(16.dp), contentAlignment = Alignment.Center) {
                        Button(onClick = { context.openDocument(url, if (camp.invitationIsPdf) DocumentKind.Pdf else DocumentKind.Web) }) {
                            Icon(painterResource(if (camp.invitationIsPdf) R.drawable.ic_description else R.drawable.ic_open_in_new), contentDescription = null, modifier = Modifier.size(18.dp))
                            Text(stringResource(if (camp.invitationIsPdf) R.string.camps_view_invitation else R.string.camps_view_website), modifier = Modifier.padding(start = 8.dp))
                        }
                    }
                }
            }
        }
    }
}

/** The flag, the title, the country and whether it is full. */
@Composable
private fun CampHeader(camp: Camp, locale: Locale) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
    ) {
        Text(camp.flag, style = MaterialTheme.typography.displayMedium)
        Text(camp.title, style = MaterialTheme.typography.headlineSmall, textAlign = TextAlign.Center)
        Text(camp.countryName(locale), style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
        if (camp.isFull) FullBadge()
    }
}

@Composable
private fun Fact(icon: Int, text: String, label: String) {
    ListItem(
        headlineContent = { Text(text) },
        supportingContent = { Text(label) },
        leadingContent = { Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
    )
}
