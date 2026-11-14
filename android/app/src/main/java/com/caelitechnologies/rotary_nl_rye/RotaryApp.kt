package com.caelitechnologies.rotary_nl_rye

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation3.runtime.NavKey
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.ui.NavDisplay
import com.caelitechnologies.rotary_nl_rye.about.AboutScreen
import com.caelitechnologies.rotary_nl_rye.contact.ContactScreen
import com.caelitechnologies.rotary_nl_rye.contact.PersonRoute
import com.caelitechnologies.rotary_nl_rye.contact.PersonScreen
import com.caelitechnologies.rotary_nl_rye.emergency.EmergencyScreen
import com.caelitechnologies.rotary_nl_rye.navigation.AppTab
import com.caelitechnologies.rotary_nl_rye.navigation.Navigator
import com.caelitechnologies.rotary_nl_rye.navigation.rememberNavigationState
import com.caelitechnologies.rotary_nl_rye.navigation.toEntries
import com.caelitechnologies.rotary_nl_rye.ui.components.TabScaffold
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme

/**
 * The app's frame: the top-level destinations in Material's adaptive
 * navigation (a bar on phones, a rail on wider windows), each with its own
 * Navigation 3 back stack. The selected tab and the stacks survive rotation
 * and process death.
 */
@Composable
fun RotaryApp() {
    val navigationState = rememberNavigationState(startRoute = AppTab.Home, topLevelRoutes = AppTab.entries.toSet())
    val navigator = remember(navigationState) { Navigator(navigationState) }
    val entryProvider = entryProvider<NavKey> {
        entry<AppTab> { tab ->
            when (tab) {
                AppTab.About -> AboutScreen()
                AppTab.Emergency -> EmergencyScreen()
                AppTab.Contact -> ContactScreen(onPerson = { navigator.navigate(PersonRoute(it)) })
                AppTab.Home, AppTab.Settings -> ComingSoonScreen(tab)
            }
        }
        entry<PersonRoute> { route ->
            route.person?.let { PersonScreen(it, onBack = navigator::goBack) }
        }
    }
    NavigationSuiteScaffold(
        navigationSuiteItems = {
            AppTab.entries.forEach { tab ->
                val selected = tab == navigationState.topLevelRoute
                item(
                    selected = selected,
                    onClick = { navigator.navigate(tab) },
                    icon = {
                        Icon(
                            painter = painterResource(if (selected) tab.selectedIcon else tab.icon),
                            contentDescription = null,
                        )
                    },
                    label = { Text(stringResource(tab.label)) },
                )
            }
        },
    ) {
        NavDisplay(
            entries = navigationState.toEntries(entryProvider),
            onBack = { navigator.goBack() },
        )
    }
}

/** A tab whose screen is not rebuilt yet: its title and a line saying so. */
@Composable
private fun ComingSoonScreen(tab: AppTab) {
    TabScaffold(title = stringResource(tab.label)) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding),
            contentAlignment = Alignment.Center,
        ) {
            Text(
                text = stringResource(R.string.coming_soon),
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 24.dp),
            )
        }
    }
}

@Preview(showSystemUi = true)
@Composable
private fun RotaryAppPreview() {
    RotaryTheme { RotaryApp() }
}
