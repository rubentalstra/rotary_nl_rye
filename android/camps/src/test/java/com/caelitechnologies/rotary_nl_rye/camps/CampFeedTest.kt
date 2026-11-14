package com.caelitechnologies.rotary_nl_rye.camps

import com.caelitechnologies.rotary_nl_rye.core.networking.CachedFetch
import kotlinx.coroutines.test.runTest
import mockwebserver3.MockResponse
import mockwebserver3.MockWebServer
import okhttp3.Cache
import okhttp3.OkHttpClient
import okio.Buffer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import java.util.concurrent.TimeUnit

/** RotaryCamps' CampFeedTests, ported: a local server and OkHttp's cache instead of rotary.nl. */
class CampFeedTest {
    @get:Rule
    val folder = TemporaryFolder()

    private val server = MockWebServer()
    private lateinit var client: OkHttpClient
    private val sheet = checkNotNull(javaClass.getResourceAsStream("/zomerkampen.xlsx")).readBytes()

    @Before
    fun start() {
        server.start()
        client = OkHttpClient.Builder()
            .cache(Cache(folder.newFolder("http"), 10L * 1024 * 1024))
            .connectTimeout(2, TimeUnit.SECONDS)
            .build()
    }

    @After
    fun stop() = server.close()

    private fun feed() = CampFeed(CachedFetch(client), server.url("/zomerkampen.xlsx").toString())

    private fun file() = MockResponse.Builder().code(200).body(Buffer().write(sheet)).addHeader("Cache-Control", "max-age=0").build()

    @Test
    fun `online, the file is read`() = runTest {
        server.enqueue(file())
        assertEquals(74, feed().camps().size)
    }

    @Test
    fun `offline, the cached copy is used`() = runTest {
        server.enqueue(file())
        feed().camps()
        server.close()
        assertEquals(74, feed().camps().size)
    }

    @Test
    fun `offline without a copy says so`() = runTest {
        server.close()
        assertEquals(CampFeed.LoadError.Offline, runCatching { feed().camps() }.exceptionOrNull())
    }

    @Test
    fun `a server error is not read as a file`() = runTest {
        server.enqueue(MockResponse.Builder().code(404).build())
        assertEquals(CampFeed.LoadError.Server(404), runCatching { feed().camps() }.exceptionOrNull())
    }

    @Test
    fun `a page that is no spreadsheet is unreadable`() = runTest {
        server.enqueue(MockResponse.Builder().code(200).body("<html>Not found</html>").build())
        assertEquals(CampFeed.LoadError.Unreadable, runCatching { feed().camps() }.exceptionOrNull())
    }
}
