package com.caelitechnologies.rotary_nl_rye.ui.components

import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import coil3.compose.AsyncImage
import com.caelitechnologies.rotary_nl_rye.R

/**
 * A person's photo in a circle, loaded from rotary.nl and cached by Coil; the
 * person symbol while it loads, when it fails, or when there is none.
 * Decorative: the name next to it says who.
 */
@Composable
fun PersonPhoto(url: String?, size: Dp, modifier: Modifier = Modifier) {
    val placeholder = painterResource(R.drawable.ic_person_placeholder)
    AsyncImage(
        model = url,
        contentDescription = null,
        placeholder = placeholder,
        error = placeholder,
        fallback = placeholder,
        contentScale = ContentScale.Crop,
        colorFilter = if (url == null) ColorFilter.tint(MaterialTheme.colorScheme.outline) else null,
        modifier = modifier
            .size(size)
            .clip(CircleShape),
    )
}
