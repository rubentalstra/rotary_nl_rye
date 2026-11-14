import Foundation
@testable import RotaryCalendar
import Testing

/// The Events API's answer for the MDJC calendar, November 2025 to November
/// 2027, as fetched on 14 November 2026 (people's details removed).
@Suite struct CalendarFeedTests {
    let events: [CalendarEvent]
    var amsterdam: Calendar {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "Europe/Amsterdam")!
        return calendar
    }

    init() throws {
        let url = try #require(Bundle.module.url(forResource: "events", withExtension: "json", subdirectory: "Fixtures"))
        events = try CalendarFeed.events(from: Data(contentsOf: url))
    }

    private func event(_ title: String) throws -> CalendarEvent {
        try #require(events.first { $0.title == title }, "no event \(title)")
    }

    @Test func `All 26 events are read, in order`() {
        #expect(events.count == 26)
        #expect(events.filter(\.isAllDay).count == 19)
    }

    @Test func `An all-day event's end date is exclusive, so its last day is the day before`() throws {
        let weekend = try event("Residentieweekend inbounds")
        #expect(weekend.timing == .allDay(first: DateComponents(year: 2026, month: 11, day: 13), last: DateComponents(year: 2026, month: 11, day: 15)))
        #expect(weekend.dayCount(in: amsterdam) == 3)
    }

    /// The month view finds an event's days in a set; that needs days that
    /// hash alike however they were made.
    @Test func `An event's days are found in a set of days`() throws {
        let weekend = try event("Residentieweekend inbounds")
        let marked = Set(weekend.days(in: amsterdam))
        #expect(marked.contains(DateComponents(year: 2026, month: 11, day: 14)))
        #expect(!marked.contains(DateComponents(year: 2026, month: 11, day: 16)))
    }

    @Test func `A one-day event has the same first and last day`() throws {
        let santa = try event("Santa Run Inbounds")
        #expect(santa.timing == .allDay(first: DateComponents(year: 2026, month: 12, day: 12), last: DateComponents(year: 2026, month: 12, day: 12)))
    }

    @Test func `A timed event keeps its moments with their offset`() throws {
        let market = try event("Informatiemarkt Rotary Youth Exchange Nederland")
        guard case .timed(let start, let end) = market.timing else {
            Issue.record("not timed")
            return
        }
        #expect(start == (try Date("2026-09-19T10:00:00+02:00", strategy: .iso8601)))
        #expect(end == (try Date("2026-09-19T14:00:00+02:00", strategy: .iso8601)))
        #expect(market.location == "Woerden")
    }

    @Test func `An online event has its Meet link`() throws {
        let training = try event("MDJC jaarlijkse training")
        #expect(training.meetingURL?.host() == "meet.google.com")
    }

    @Test func `Ongoing and ended follow the event's days`() throws {
        let weekend = try event("Residentieweekend inbounds")
        let saturday = try #require(amsterdam.date(from: DateComponents(year: 2026, month: 11, day: 14, hour: 12)))
        let monday = try #require(amsterdam.date(from: DateComponents(year: 2026, month: 11, day: 16, hour: 9)))
        #expect(weekend.isOngoing(at: saturday, in: amsterdam))
        #expect(!weekend.isOngoing(at: monday, in: amsterdam))
        #expect(weekend.hasEnded(at: monday, in: amsterdam))
    }

    @Test func `The window runs from a year back to a year ahead, by whole months`() throws {
        let now = try #require(amsterdam.date(from: DateComponents(year: 2026, month: 11, day: 14, hour: 12)))
        let (from, to) = CalendarFeed.window(around: now, calendar: amsterdam)
        #expect(amsterdam.dateComponents([.year, .month, .day], from: from) == DateComponents(year: 2025, month: 11, day: 1))
        #expect(amsterdam.dateComponents([.year, .month, .day], from: to) == DateComponents(year: 2027, month: 12, day: 1))
    }

    @Test func `The request names the bundle for the key's app restriction`() throws {
        let feed = CalendarFeed(apiKey: "key", bundleID: "com.caelitechnologies.rotary-nl-rye")
        let request = feed.request(around: .now)
        #expect(request.value(forHTTPHeaderField: "X-Ios-Bundle-Identifier") == "com.caelitechnologies.rotary-nl-rye")
        let url = try #require(request.url)
        let query = try #require(URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems)
        #expect(query.contains(URLQueryItem(name: "singleEvents", value: "true")))
        #expect(request.url?.path().contains("rye.netherlands@gmail.com/events") == true)
    }

    @Test func `Without a key nothing is requested`() async {
        await #expect(throws: CalendarFeed.LoadError.missingKey) {
            try await CalendarFeed(apiKey: "").events()
        }
    }

    @Test func `A cancelled event and an event without dates are left out`() throws {
        let json = #"{"items":[{"id":"a","status":"cancelled","summary":"Gone","start":{"date":"2026-01-01"},"end":{"date":"2026-01-02"}},{"id":"b","summary":"No dates","start":{},"end":{}}]}"#
        #expect(try CalendarFeed.events(from: Data(json.utf8)).isEmpty)
    }

    @Test func `An answer that is no list of events is unreadable`() {
        #expect(throws: CalendarFeed.LoadError.unreadable) {
            try CalendarFeed.events(from: Data("<html>".utf8))
        }
    }
}
