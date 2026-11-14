package com.caelitechnologies.rotary_nl_rye.core.networking

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.CacheControl
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

/**
 * How the app loads a file that changes now and then (the camps, the news,
 * the calendar): through OkHttp's HTTP cache, so online it is revalidated
 * with the server and offline the last copy is used, as `CachedFetch` does
 * on iOS.
 */
class CachedFetch(
    private val client: OkHttpClient,
    private val io: CoroutineDispatcher = Dispatchers.IO,
) {
    /** Why a file could not be loaded. */
    sealed class Failure(message: String) : Exception(message) {
        /** No network and no copy from before. */
        data object Offline : Failure("offline") {
            private fun readResolve(): Any = Offline
        }

        /** The server answered with something other than the file. */
        data class Server(val status: Int) : Failure("HTTP $status")
    }

    /** The file at [url]: fresh when the network is there, the cached copy when it is not. */
    suspend fun bytes(url: String, headers: Map<String, String> = emptyMap()): ByteArray = withContext(io) {
        try {
            fetch(url, headers, CacheControl.Builder().noCache().build())
        } catch (failure: Failure) {
            throw failure
        } catch (_: IOException) {
            try {
                fetch(url, headers, CacheControl.FORCE_CACHE)
            } catch (_: IOException) {
                throw Failure.Offline
            } catch (_: Failure.Server) {
                // FORCE_CACHE answers 504 when there is no copy.
                throw Failure.Offline
            }
        }
    }

    private fun fetch(url: String, headers: Map<String, String>, cacheControl: CacheControl): ByteArray {
        val request = Request.Builder().url(url).cacheControl(cacheControl).apply {
            headers.forEach { (name, value) -> header(name, value) }
        }.build()
        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw Failure.Server(response.code)
            return response.body.bytes()
        }
    }
}
