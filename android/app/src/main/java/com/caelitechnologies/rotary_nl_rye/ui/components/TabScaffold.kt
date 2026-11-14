package com.caelitechnologies.rotary_nl_rye.ui.components

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.LargeTopAppBar
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll

/**
 * A tab's root screen: a large title that collapses as the content scrolls,
 * and the content, which takes the padding for the bar and the system bars.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TabScaffold(title: String, content: @Composable (PaddingValues) -> Unit) {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = { LargeTopAppBar(title = { Text(title) }, scrollBehavior = scrollBehavior) },
        content = content,
    )
}
