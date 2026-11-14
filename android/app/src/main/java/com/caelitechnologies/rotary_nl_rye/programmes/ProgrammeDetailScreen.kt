package com.caelitechnologies.rotary_nl_rye.programmes

import android.icu.text.NumberFormat
import android.icu.util.Currency
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.carousel.HorizontalMultiBrowseCarousel
import androidx.compose.material3.carousel.rememberCarouselState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.onClick
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.camps.countryName
import com.caelitechnologies.rotary_nl_rye.camps.flagOf
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionFooter
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import com.caelitechnologies.rotary_nl_rye.ui.components.materialSymbol
import com.caelitechnologies.rotary_nl_rye.ui.components.rememberOpenLink
import java.util.Locale

/**
 * A programme's page: its photos, the facts at a glance, what it is, why to
 * go or who it suits, where it goes and how to sign up. The texts are Dutch
 * on purpose, as on iOS.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProgrammeDetailScreen(programme: ExchangeProgramme, onBack: () -> Unit, onSummerCamps: () -> Unit) {
    val locale = currentLocale()
    val openLink = rememberOpenLink()
    var fullScreen by rememberSaveable { mutableStateOf<ProgrammePhoto?>(null) }
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(programme.title)) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
            )
        },
    ) { padding ->
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding)) {
            if (programme.photos.isNotEmpty()) {
                item(key = "photos", contentType = "photos") { ProgrammePhotos(programme.photos, onPhoto = { fullScreen = it }) }
            }
            item(key = "tagline", contentType = "tagline") {
                Text(
                    stringResource(programme.tagline),
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.padding(start = 16.dp, end = 16.dp, top = 16.dp),
                )
            }
            facts(programme, locale)
            item(key = "about", contentType = "header") { ListSectionHeader(stringResource(R.string.programme_about)) }
            items(programme.about, key = { it }, contentType = { "paragraph" }) {
                Text(stringResource(it), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp))
            }
            item(key = "highlights", contentType = "header") { ListSectionHeader(stringResource(programme.highlights.title)) }
            items(programme.highlights.points, key = { it.title }, contentType = { "point" }) { point ->
                ListItem(
                    headlineContent = { Text(stringResource(point.title)) },
                    supportingContent = point.text?.let { { Text(stringResource(it)) } },
                    leadingContent = { Icon(painterResource(materialSymbol(point.symbol)), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                )
            }
            programme.destinations.forEach { group -> destinations(group, locale) }
            if (programme == ExchangeProgramme.SummerCamps) {
                item(key = "camps", contentType = "link") {
                    ListItem(
                        headlineContent = { Text(stringResource(R.string.programme_view_camps)) },
                        supportingContent = { Text(stringResource(R.string.programme_view_camps_summary)) },
                        leadingContent = { Icon(painterResource(R.drawable.ic_dest_summer_camps), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                        modifier = Modifier.padding(top = 8.dp).clickable(onClick = onSummerCamps),
                    )
                }
            }
            item(key = "signUp", contentType = "header") { ListSectionHeader(stringResource(R.string.programme_sign_up)) }
            item(key = "signUpText", contentType = "paragraph") {
                Text(stringResource(programme.signUpText), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp))
            }
            item(key = "mail", contentType = "link") {
                ListItem(
                    headlineContent = { Text(programme.signUpEmail, color = MaterialTheme.colorScheme.primary) },
                    leadingContent = { Icon(painterResource(R.drawable.ic_mail), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                    modifier = Modifier.clickable { openLink("mailto:${programme.signUpEmail}") },
                )
            }
        }
    }
    fullScreen?.let { photo -> ProgrammePhotoViewer(photo, onDismiss = { fullScreen = null }) }
}

/** Age, length, price and selection: a small title over each value, so long values wrap at any text size. */
private fun LazyListScope.facts(programme: ExchangeProgramme, locale: Locale) {
    item(key = "facts", contentType = "header") { ListSectionHeader(stringResource(R.string.programme_in_short)) }
    item(key = "age", contentType = "fact") { Fact(R.string.programme_age, stringResource(programme.ageText), R.drawable.ic_person) }
    item(key = "duration", contentType = "fact") { Fact(R.string.programme_duration, stringResource(programme.durationText), R.drawable.ic_calendar) }
    item(key = "cost", contentType = "fact") {
        val price = NumberFormat.getCurrencyInstance(locale).apply {
            currency = Currency.getInstance("EUR")
            if (programme.cost.amount.stripTrailingZeros().scale() <= 0) maximumFractionDigits = 0
        }.format(programme.cost.amount)
        Fact(R.string.programme_cost, if (programme.cost.isMinimum) stringResource(R.string.programme_from, price) else price, R.drawable.ic_euro)
    }
    programme.selection?.let { selection ->
        item(key = "selection", contentType = "fact") { Fact(R.string.programme_selection, stringResource(selection), R.drawable.ic_checklist) }
    }
    item(key = "costNote", contentType = "footer") { ListSectionFooter(stringResource(programme.cost.note)) }
}

@Composable
private fun Fact(title: Int, value: String, icon: Int) {
    ListItem(
        overlineContent = { Text(stringResource(title)) },
        headlineContent = { Text(value) },
        leadingContent = { Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
    )
}

/** A group of destinations: each country with its flag and its name in the person's language. */
private fun LazyListScope.destinations(group: ExchangeProgramme.DestinationGroup, locale: Locale) {
    item(key = group.name, contentType = "header") { ListSectionHeader(stringResource(group.name)) }
    items(group.countries, key = { "${group.name}-$it" }, contentType = { "country" }) { code ->
        ListItem(
            headlineContent = { Text(countryName(code, locale)) },
            leadingContent = { Text(flagOf(code), style = MaterialTheme.typography.titleLarge) },
        )
    }
    group.note?.let { note -> item(key = "${group.name}-note", contentType = "footer") { ListSectionFooter(stringResource(note)) } }
}

/** The photos in Material's carousel, each with what it shows; a tap opens one full screen. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun ProgrammePhotos(photos: List<ProgrammePhoto>, onPhoto: (ProgrammePhoto) -> Unit) {
    val showFullScreen = stringResource(R.string.programme_photo_full_screen)
    HorizontalMultiBrowseCarousel(
        state = rememberCarouselState { photos.size },
        preferredItemWidth = 300.dp,
        itemSpacing = 8.dp,
        contentPadding = PaddingValues(horizontal = 16.dp),
        modifier = Modifier.fillMaxWidth().height(240.dp).padding(top = 8.dp),
    ) { index ->
        val photo = photos[index]
        Box(
            modifier = Modifier
                .fillMaxSize()
                .maskClip(MaterialTheme.shapes.extraLarge)
                .clickable { onPhoto(photo) }
                .semantics { onClick(label = showFullScreen) { onPhoto(photo); true } },
        ) {
            Image(painterResource(photo.image), contentDescription = null, contentScale = ContentScale.Crop, modifier = Modifier.fillMaxSize())
            Text(
                text = stringResource(photo.caption),
                style = MaterialTheme.typography.labelLarge,
                color = Color.White,
                maxLines = 2,
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .fillMaxWidth()
                    .background(Brush.verticalGradient(listOf(Color.Transparent, Color.Black.copy(alpha = 0.55f), Color.Black.copy(alpha = 0.85f))))
                    .padding(start = 16.dp, end = 16.dp, top = 56.dp, bottom = 14.dp),
            )
        }
    }
}

/** A photo on its own, as large as the screen allows, on black, with what it shows; back or close closes it. */
@Composable
internal fun ProgrammePhotoViewer(photo: ProgrammePhoto, onDismiss: () -> Unit) {
    Dialog(onDismissRequest = onDismiss, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Box(Modifier.fillMaxSize().background(Color.Black)) {
            Image(
                painter = painterResource(photo.image),
                contentDescription = stringResource(photo.caption),
                contentScale = ContentScale.Fit,
                modifier = Modifier.fillMaxSize(),
            )
            Text(
                stringResource(photo.caption),
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White,
                modifier = Modifier.align(Alignment.BottomCenter).safeDrawingPadding().padding(16.dp),
            )
            IconButton(
                onClick = onDismiss,
                colors = IconButtonDefaults.iconButtonColors(contentColor = Color.White),
                modifier = Modifier.align(Alignment.TopEnd).safeDrawingPadding().padding(8.dp),
            ) {
                Icon(painterResource(R.drawable.ic_close), stringResource(R.string.action_close))
            }
        }
    }
}
