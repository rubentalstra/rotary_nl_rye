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
import com.caelitechnologies.rotary_nl_rye.calendar.CalendarRoute
import com.caelitechnologies.rotary_nl_rye.calendar.EventDetailRoute
import com.caelitechnologies.rotary_nl_rye.calendar.EventRoute
import com.caelitechnologies.rotary_nl_rye.news.ArticleRoute
import com.caelitechnologies.rotary_nl_rye.news.ArticleRouteScreen
import com.caelitechnologies.rotary_nl_rye.news.NewsRoute
import com.caelitechnologies.rotary_nl_rye.camps.CampDetailRoute
import com.caelitechnologies.rotary_nl_rye.camps.CampRoute
import com.caelitechnologies.rotary_nl_rye.camps.CampsRoute
import com.caelitechnologies.rotary_nl_rye.clubs.ClubGuideRoute
import com.caelitechnologies.rotary_nl_rye.clubs.ClubGuideScreen
import com.caelitechnologies.rotary_nl_rye.clubs.ClubTopicRoute
import com.caelitechnologies.rotary_nl_rye.clubs.ClubTopicScreen
import com.caelitechnologies.rotary_nl_rye.clubs.RotaryClubsScreen
import com.caelitechnologies.rotary_nl_rye.contact.ContactScreen
import com.caelitechnologies.rotary_nl_rye.contact.PersonRoute
import com.caelitechnologies.rotary_nl_rye.contact.PersonScreen
import com.caelitechnologies.rotary_nl_rye.emergency.EmergencyScreen
import com.caelitechnologies.rotary_nl_rye.home.DestinationScreen
import com.caelitechnologies.rotary_nl_rye.home.HomeDestination
import com.caelitechnologies.rotary_nl_rye.home.HomeScreen
import com.caelitechnologies.rotary_nl_rye.navigation.AppTab
import com.caelitechnologies.rotary_nl_rye.programmes.PodcastRoute
import com.caelitechnologies.rotary_nl_rye.programmes.PodcastRouteScreen
import com.caelitechnologies.rotary_nl_rye.programmes.ProgrammeDetailScreen
import com.caelitechnologies.rotary_nl_rye.programmes.ProgrammeRoute
import com.caelitechnologies.rotary_nl_rye.programmes.ProgrammesScreen
import com.caelitechnologies.rotary_nl_rye.programmes.VideoRoute
import com.caelitechnologies.rotary_nl_rye.programmes.VideoRouteScreen
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
                AppTab.Home -> HomeScreen(onDestination = navigator::navigate)
                AppTab.Settings -> ComingSoonScreen(tab)
            }
        }
        entry<HomeDestination> { destination ->
            when (destination) {
                HomeDestination.SummerCamps -> CampsRoute(onBack = navigator::goBack, onCamp = { navigator.navigate(CampRoute(it)) })
                HomeDestination.RotaryClubs -> RotaryClubsScreen(
                    onBack = navigator::goBack,
                    onTopic = { navigator.navigate(ClubTopicRoute(it)) },
                    onGuide = { navigator.navigate(ClubGuideRoute(it)) },
                )
                HomeDestination.News -> NewsRoute(onBack = navigator::goBack, onArticle = { navigator.navigate(ArticleRoute(it.id)) })
                HomeDestination.Programmes -> ProgrammesScreen(
                    onBack = navigator::goBack,
                    onProgramme = { navigator.navigate(ProgrammeRoute(it)) },
                    onPodcast = { navigator.navigate(PodcastRoute) },
                    onVideo = { navigator.navigate(VideoRoute(it)) },
                )
                HomeDestination.Calendar -> CalendarRoute(onBack = navigator::goBack, onEvent = { navigator.navigate(EventRoute(it.id)) })
                else -> DestinationScreen(destination, onBack = navigator::goBack)
            }
        }
        entry<CampRoute> { route -> CampDetailRoute(route, onBack = navigator::goBack) }
        entry<ClubTopicRoute> { route -> ClubTopicScreen(route.topic, onBack = navigator::goBack) }
        entry<ClubGuideRoute> { route -> ClubGuideScreen(route.guide, onBack = navigator::goBack) }
        entry<ProgrammeRoute> { route ->
            ProgrammeDetailScreen(route.programme, onBack = navigator::goBack, onSummerCamps = { navigator.navigate(HomeDestination.SummerCamps) })
        }
        entry<PodcastRoute> { PodcastRouteScreen(onBack = navigator::goBack) }
        entry<VideoRoute> { route -> VideoRouteScreen(route, onBack = navigator::goBack) }
        entry<ArticleRoute> { route -> ArticleRouteScreen(route, onBack = navigator::goBack) }
        entry<EventRoute> { route -> EventDetailRoute(route, onBack = navigator::goBack) }
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
