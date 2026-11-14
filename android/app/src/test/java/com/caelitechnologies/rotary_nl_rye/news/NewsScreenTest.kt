package com.caelitechnologies.rotary_nl_rye.news

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The news screen and an article with the published news.json, on the JVM, in Dutch. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class NewsScreenTest {
    @get:Rule
    val compose = createComposeRule()

    private val items = NewsFeed.read(checkNotNull(javaClass.getResourceAsStream("/news.json")).readBytes())

    @Test
    fun `the newest item first, then the earlier ones`() {
        var opened: NewsItem? = null
        compose.setContent { RotaryTheme { NewsScreen(NewsUiState(NewsUiState.Load.Loaded, items), {}, {}, { opened = it }) } }
        compose.onNodeWithText("Nieuwste").assertIsDisplayed()
        compose.onNodeWithText("Jaarverslag 2024-2025").assertIsDisplayed().performClick()
        assertEquals(items.first(), opened)
    }

    @Test
    fun `an article shows its heading and paragraphs`() {
        val article = items.first { it.id == 3 }
        compose.setContent { RotaryTheme { ArticleScreen(article.title, (article.content as NewsItem.Content.Article).blocks, {}) } }
        compose.onNodeWithText("Belangrijke update inzake Rotary uitwisselingen").assertIsDisplayed()
    }

    @Test
    fun `offline says so, with a way to try again`() {
        compose.setContent { RotaryTheme { NewsScreen(NewsUiState(NewsUiState.Load.Failed(NewsFeed.LoadError.Offline)), {}, {}, {}) } }
        compose.onNodeWithText("Maak verbinding met internet om het nieuws te laden.").assertIsDisplayed()
    }
}
