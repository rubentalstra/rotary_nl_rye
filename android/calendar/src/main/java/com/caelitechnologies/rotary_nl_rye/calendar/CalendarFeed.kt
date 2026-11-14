package com.caelitechnologies.rotary_nl_rye.calendar

import com.caelitechnologies.rotary_nl_rye.core.networking.CachedFetch
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json
import okhttp3.HttpUrl
import okhttp3.HttpUrl.Companion.toHttpUrl
import java.time.Instant
import java.time.LocalDate
import java.time.OffsetDateTime
import java.time.YearMonth
import java.time.ZoneId
import java.time.format.DateTimeParseException

/**
 * The MDJC calendar (rye.netherlands@gmail.com) through the Google Calendar
 * API v3, from the first day of the month a year ago to the last day of the
 * month a year ahead, loaded through [CachedFetch]. Requests carry the app's
 * [identity] headers (package and signing certificate), so the API key can be
 * restricted to the app in Google Cloud.
 */
class CalendarFeed(
    private val fetch: CachedFetch,
    private val apiKey: String,
    private val identity: Map<String, String> = emptyMap(),
    private val base: String = "https://www.googleapis.com/calendar/v3/calendars",
) {
    /** Why the calendar could not be loaded. */
    sealed class LoadError(message: String) : Exception(message) {
        /** The build has no API key. */
        data object MissingKey : LoadError("no key") {
            private fun readResolve(): Any = MissingKey
        }

        data object Offline : LoadError("offline") {
            private fun readResolve(): Any = Offline
        }

        data class Server(val status: Int) : LoadError("HTTP $status")

        /** The answer came, but it is not a list of events the app can read. */
        data object Unreadable : LoadError("unreadable") {
            private fun readResolve(): Any = Unreadable
        }
    }

    /** The events around [now], in order of their start. */
    suspend fun events(now: Instant = Instant.now(), zone: ZoneId = ZoneId.systemDefault()): List<CalendarEvent> {
        if (apiKey.isEmpty()) throw LoadError.MissingKey
        val bytes = try {
            fetch.bytes(url(now, zone).toString(), identity + ("Accept" to "application/json"))
        } catch (_: CachedFetch.Failure.Offline) {
            throw LoadError.Offline
        } catch (failure: CachedFetch.Failure.Server) {
            throw LoadError.Server(failure.status)
        }
        return read(bytes)
    }

    /** The request's address for the window around [now]. */
    internal fun url(now: Instant, zone: ZoneId): HttpUrl {
        val (from, to) = window(now, zone)
        return base.toHttpUrl().newBuilder()
            .addPathSegment(CALENDAR_ID)
            .addPathSegment("events")
            .addQueryParameter("key", apiKey)
            .addQueryParameter("timeMin", from.toString())
            .addQueryParameter("timeMax", to.toString())
            .addQueryParameter("singleEvents", "true")
            .addQueryParameter("orderBy", "startTime")
            .addQueryParameter("maxResults", "2500")
            .build()
    }

    companion object {
        const val CALENDAR_ID = "rye.netherlands@gmail.com"

        /** The public iCalendar address of the same calendar, for subscribing to it in a calendar app. */
        const val ICAL_URL = "https://calendar.google.com/calendar/ical/rye.netherlands%40gmail.com/public/basic.ics"

        private val json = Json { ignoreUnknownKeys = true }

        /** From the first day of the month a year before [now] to the first day of the month after the month a year after it. */
        fun window(now: Instant, zone: ZoneId): Pair<Instant, Instant> {
            val month = YearMonth.from(now.atZone(zone))
            return month.minusYears(1).atDay(1).atStartOfDay(zone).toInstant() to month.plusYears(1).plusMonths(1).atDay(1).atStartOfDay(zone).toInstant()
        }

        /** The events in an answer of the Events API; cancelled ones and ones without dates are left out. */
        fun read(bytes: ByteArray): List<CalendarEvent> {
            val answer = try {
                json.decodeFromString<EventsAnswer>(bytes.decodeToString())
            } catch (_: SerializationException) {
                throw LoadError.Unreadable
            } catch (_: IllegalArgumentException) {
                throw LoadError.Unreadable
            }
            return answer.items.mapNotNull { it.event() }
        }
    }
}

// The answer as Google sends it: the fields the app uses.

@Serializable
private data class EventsAnswer(val items: List<RawEvent>)

@Serializable
private data class RawEvent(
    val id: String,
    val status: String? = null,
    val summary: String? = null,
    val description: String? = null,
    val location: String? = null,
    val start: RawMoment? = null,
    val end: RawMoment? = null,
) {
    /** `date` (yyyy-MM-dd) for all-day events, whose end date is exclusive; `dateTime` (RFC 3339) for others. */
    @Serializable
    data class RawMoment(val date: String? = null, val dateTime: String? = null)

    fun event(): CalendarEvent? {
        if (status == "cancelled") return null
        val timing = timing() ?: return null
        return CalendarEvent(id, summary?.trim()?.ifEmpty { null }, timing, location?.trim()?.ifEmpty { null }, description?.trim()?.ifEmpty { null })
    }

    private fun timing(): CalendarEvent.Timing? {
        val first = start?.date?.let(::day)
        val exclusiveEnd = end?.date?.let(::day)
        if (first != null && exclusiveEnd != null) {
            val last = exclusiveEnd.minusDays(1)
            // A malformed end before the start becomes a one-day event.
            return CalendarEvent.Timing.AllDay(first, if (last < first) first else last)
        }
        val begin = start?.dateTime?.let(::moment) ?: return null
        val finish = end?.dateTime?.let(::moment) ?: return null
        return CalendarEvent.Timing.Timed(begin, maxOf(begin, finish))
    }

    private fun day(text: String): LocalDate? = try {
        LocalDate.parse(text)
    } catch (_: DateTimeParseException) {
        null
    }

    private fun moment(text: String): Instant? = try {
        OffsetDateTime.parse(text).toInstant()
    } catch (_: DateTimeParseException) {
        null
    }
}
