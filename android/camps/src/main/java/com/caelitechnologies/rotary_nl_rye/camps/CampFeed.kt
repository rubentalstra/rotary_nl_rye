package com.caelitechnologies.rotary_nl_rye.camps

import com.caelitechnologies.rotary_nl_rye.core.networking.CachedFetch

/**
 * Where the camps come from: zomerkampen.xlsx on rotary.nl, kept by the
 * Short Term team, loaded through [CachedFetch].
 */
class CampFeed(
    private val fetch: CachedFetch,
    private val url: String = URL,
) {
    /** Why the camps could not be loaded. */
    sealed class LoadError(message: String) : Exception(message) {
        /** No network and no copy from before. */
        data object Offline : LoadError("offline") {
            private fun readResolve(): Any = Offline
        }

        /** The server answered with something other than the file. */
        data class Server(val status: Int) : LoadError("HTTP $status")

        /** The file came, but it is not a spreadsheet the app can read. */
        data object Unreadable : LoadError("unreadable") {
            private fun readResolve(): Any = Unreadable
        }
    }

    /** Every camp in the sheet, by start date. */
    suspend fun camps(): List<Camp> {
        val bytes = try {
            fetch.bytes(url)
        } catch (_: CachedFetch.Failure.Offline) {
            throw LoadError.Offline
        } catch (failure: CachedFetch.Failure.Server) {
            throw LoadError.Server(failure.status)
        }
        return try {
            CampSheet.camps(Spreadsheet.read(bytes))
        } catch (_: Spreadsheet.ReadError) {
            throw LoadError.Unreadable
        }
    }

    companion object {
        /** The camps in an XLSX file's bytes, through the same rules as [camps]; for tests and previews. */
        fun read(bytes: ByteArray): List<Camp> = CampSheet.camps(Spreadsheet.read(bytes))

        const val URL = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/outbounds/camps-and-tours/zomerkampen.xlsx"
    }
}
