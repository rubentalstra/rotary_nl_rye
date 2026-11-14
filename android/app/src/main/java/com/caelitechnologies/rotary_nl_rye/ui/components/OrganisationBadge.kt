package com.caelitechnologies.rotary_nl_rye.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.organisation.Organisation
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryGold

/** The logo of the organisation someone is part of, in a small circle on the edge of their photo. */
@Composable
fun OrganisationBadge(organisation: Organisation, size: Dp, modifier: Modifier = Modifier) {
    Box(
        contentAlignment = Alignment.Center,
        modifier = modifier
            .size(size)
            .background(MaterialTheme.colorScheme.surface, CircleShape)
            .border(1.dp, MaterialTheme.colorScheme.outlineVariant, CircleShape)
            .padding(size * 0.16f)
            .semantics { contentDescription = organisation.displayName },
    ) {
        OrganisationLogo(organisation)
    }
}

/** An organisation's logo in its own colours: the Rotary wheel in Rotary gold, the ROTEX logo as drawn. */
@Composable
fun OrganisationLogo(organisation: Organisation, modifier: Modifier = Modifier) {
    when (organisation) {
        Organisation.Rotary -> Icon(
            painter = painterResource(R.drawable.ic_rotary_wheel),
            contentDescription = null,
            tint = RotaryGold,
            modifier = modifier,
        )
        Organisation.Rotex -> Image(
            painter = painterResource(R.drawable.rotex_logo),
            contentDescription = null,
            modifier = modifier,
        )
    }
}

/** The organisation's name, the same in every language. */
val Organisation.displayName: String
    get() = when (this) {
        Organisation.Rotary -> "Rotary"
        Organisation.Rotex -> "ROTEX"
    }
