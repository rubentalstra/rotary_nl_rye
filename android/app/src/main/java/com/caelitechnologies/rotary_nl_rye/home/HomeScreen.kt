package com.caelitechnologies.rotary_nl_rye.home

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.carousel.HorizontalMultiBrowseCarousel
import androidx.compose.material3.carousel.rememberCarouselState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryGold

/**
 * The root of the Home tab: the Rotary Youth Exchange Netherlands banner as
 * the page's title, a carousel of photos, then a tile for each part of the
 * app. As on iOS: three tiles to a row on a phone, with a last row of two
 * wider tiles; two to a row on a narrow phone or with the largest text
 * sizes; four on a tablet or an unfolded foldable.
 */
@Composable
fun HomeScreen(onDestination: (HomeDestination) -> Unit) {
    val insets = WindowInsets.safeDrawing.asPaddingValues()
    val fontScale = LocalDensity.current.fontScale
    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val tilesPerRow = when {
            maxWidth >= 600.dp -> 4
            maxWidth >= 360.dp && fontScale < 1.5f -> 3
            else -> 2
        }
        val destinations = HomeDestination.entries
        // The last row holds the rest, spread over the whole width.
        val lastRowStart = destinations.size - destinations.size % tilesPerRow
        LazyVerticalGrid(
            columns = GridCells.Fixed(GRID_COLUMNS),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(
                start = 16.dp,
                end = 16.dp,
                top = insets.calculateTopPadding() + 16.dp,
                bottom = 24.dp,
            ),
            modifier = Modifier.fillMaxSize(),
        ) {
            item(key = "banner", span = { GridItemSpan(maxLineSpan) }, contentType = "banner") { Banner() }
            item(key = "photos", span = { GridItemSpan(maxLineSpan) }, contentType = "photos") { PhotoCarousel() }
            itemsIndexed(
                destinations,
                key = { _, destination -> destination.name },
                span = { index, _ ->
                    val inRow = if (index >= lastRowStart) destinations.size - lastRowStart else tilesPerRow
                    GridItemSpan(GRID_COLUMNS / inRow)
                },
                contentType = { _, _ -> "tile" },
            ) { _, destination ->
                DestinationTile(destination, onClick = { onDestination(destination) })
            }
        }
    }
}

/** 12 columns divide evenly into rows of 2, 3 and 4 tiles. */
private const val GRID_COLUMNS = 12

/** The banner, straight on the page; in the dark theme its reversed variant, with white lettering. */
@Composable
private fun Banner() {
    Image(
        painter = painterResource(R.drawable.banner),
        contentDescription = "Rotary Youth Exchange Netherlands",
        contentScale = ContentScale.FillWidth,
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 8.dp)
            .semantics { heading() },
    )
}

/**
 * The photos in Material's multi-browse carousel: the current one large, the
 * next ones smaller beside it, each with its caption over the bottom edge.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun PhotoCarousel() {
    val photos = HomePhoto.entries
    HorizontalMultiBrowseCarousel(
        state = rememberCarouselState { photos.size },
        preferredItemWidth = 300.dp,
        itemSpacing = 8.dp,
        modifier = Modifier
            .fillMaxWidth()
            .height(220.dp),
    ) { index ->
        val photo = photos[index]
        Box(
            modifier = Modifier
                .fillMaxSize()
                .maskClip(MaterialTheme.shapes.extraLarge),
        ) {
            Image(
                painter = painterResource(photo.image),
                contentDescription = null,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
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

/** One tile: its symbol in the primary colour (the wheel in gold) with the title under it, centred. */
@Composable
private fun DestinationTile(destination: HomeDestination, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceContainer),
        shape = MaterialTheme.shapes.large,
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(6.dp, Alignment.CenterVertically),
            modifier = Modifier
                .fillMaxWidth()
                .heightIn(min = 96.dp)
                .padding(horizontal = 8.dp, vertical = 12.dp),
        ) {
            Icon(
                painter = painterResource(destination.icon),
                contentDescription = null,
                tint = if (destination == HomeDestination.RotaryClubs) RotaryGold else MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(28.dp),
            )
            Text(
                text = stringResource(destination.label),
                style = MaterialTheme.typography.labelLarge,
                textAlign = TextAlign.Center,
                maxLines = 2,
            )
        }
    }
}
