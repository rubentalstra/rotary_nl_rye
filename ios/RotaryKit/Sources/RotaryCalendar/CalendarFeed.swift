public import Foundation
public import RotaryCore

/// The MDJC calendar (rye.netherlands@gmail.com) through the Google Calendar
/// API v3, from the first day of the month a year ago to the last day of the
/// month a year ahead. Requests carry the app's bundle id, so the API key can
/// be restricted to this app in Google Cloud; loaded through `CachedFetch`.
public struct CalendarFeed: Sendable {
    public static let calendarID = "rye.netherlands@gmail.com"

    /// The public iCalendar address of the same calendar, for subscribing to
    /// it in the system's Calendar app.
    public static let subscriptionURL = URL(string: "webcal://calendar.google.com/calendar/ical/rye.netherlands%40gmail.com/public/basic.ics")!

    public enum LoadError: Error, Equatable {
        /// The build has no API key.
        case missingKey
        case offline
        case server(status: Int)
        /// The answer came, but it is not a list of events the app can read.
        case unreadable
    }

    private let apiKey: String
    private let bundleID: String?
    private let client: any HTTPClient

    public init(apiKey: String, bundleID: String? = Bundle.main.bundleIdentifier, client: any HTTPClient = URLSession.shared) {
        self.apiKey = apiKey
        self.bundleID = bundleID
        self.client = client
    }

    /// The events around `now`, in order of their start.
    public func events(around now: Date = .now) async throws(LoadError) -> [CalendarEvent] {
        guard !apiKey.isEmpty else { throw .missingKey }
        let data: Data
        do {
            data = try await CachedFetch.data(for: request(around: now), client: client)
        } catch {
            switch error {
            case .offline: throw .offline
            case .server(let status): throw .server(status: status)
            }
        }
        return try Self.events(from: data)
    }

    /// The request for the window around `now`.
    func request(around now: Date) -> URLRequest {
        let (from, to) = Self.window(around: now)
        var components = URLComponents(string: "https://www.googleapis.com/calendar/v3/calendars")!
        components.path += "/" + Self.calendarID + "/events"
        components.queryItems = [
            URLQueryItem(name: "key", value: apiKey),
            URLQueryItem(name: "timeMin", value: from.formatted(.iso8601)),
            URLQueryItem(name: "timeMax", value: to.formatted(.iso8601)),
            URLQueryItem(name: "singleEvents", value: "true"),
            URLQueryItem(name: "orderBy", value: "startTime"),
            URLQueryItem(name: "maxResults", value: "2500"),
        ]
        var request = URLRequest(url: components.url!, timeoutInterval: 20)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if let bundleID {
            // Google checks this header against the key's iOS app restriction.
            request.setValue(bundleID, forHTTPHeaderField: "X-Ios-Bundle-Identifier")
        }
        return request
    }

    /// From the first day of the month a year before `now` to the first day of
    /// the month after the month a year after it.
    static func window(around now: Date, calendar: Calendar = .current) -> (from: Date, to: Date) {
        let month = calendar.date(from: calendar.dateComponents([.year, .month], from: now)) ?? now
        let from = calendar.date(byAdding: .year, value: -1, to: month) ?? month
        let to = calendar.date(byAdding: DateComponents(year: 1, month: 1), to: month) ?? month
        return (from, to)
    }

    /// The events in an answer of the Events API; cancelled ones and ones
    /// without dates are left out.
    static func events(from data: Data) throws(LoadError) -> [CalendarEvent] {
        let answer: EventsAnswer
        do {
            answer = try JSONDecoder().decode(EventsAnswer.self, from: data)
        } catch {
            throw .unreadable
        }
        return answer.items.compactMap(\.event)
    }
}

// MARK: - The answer as Google sends it

/// `GET calendars/{id}/events`: the fields the app uses.
private struct EventsAnswer: Decodable {
    let items: [RawEvent]
}

private struct RawEvent: Decodable {
    let id: String
    let status: String?
    let summary: String?
    let description: String?
    let location: String?
    let start: RawMoment
    let end: RawMoment

    /// `date` (yyyy-MM-dd) for all-day events, whose end date is exclusive;
    /// `dateTime` (RFC 3339 with an offset) for others.
    struct RawMoment: Decodable {
        let date: String?
        let dateTime: String?
    }

    var event: CalendarEvent? {
        guard status != "cancelled", let timing else { return nil }
        return CalendarEvent(
            id: id,
            title: summary?.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty,
            timing: timing,
            location: location?.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty,
            notes: description?.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
        )
    }

    private var timing: CalendarEvent.Timing? {
        if let first = start.date.flatMap(Self.day), let endDay = end.date.flatMap(Self.day) {
            var calendar = Calendar(identifier: .gregorian)
            calendar.timeZone = .gmt
            guard let exclusive = calendar.date(from: endDay),
                  let lastDate = calendar.date(byAdding: .day, value: -1, to: exclusive)
            else { return nil }
            let parts = calendar.dateComponents([.year, .month, .day], from: lastDate)
            let last = DateComponents(year: parts.year, month: parts.month, day: parts.day)
            // A malformed end before the start becomes a one-day event.
            return .allDay(first: first, last: Self.isBefore(last, first) ? first : last)
        }
        if let startText = start.dateTime, let endText = end.dateTime,
           let begin = try? Date(startText, strategy: .iso8601), let finish = try? Date(endText, strategy: .iso8601) {
            return .timed(start: begin, end: max(begin, finish))
        }
        return nil
    }

    /// yyyy-MM-dd as a calendar day.
    private static func day(_ text: String) -> DateComponents? {
        let parts = text.split(separator: "-").compactMap { Int($0) }
        guard parts.count == 3 else { return nil }
        return DateComponents(year: parts[0], month: parts[1], day: parts[2])
    }

    private static func isBefore(_ a: DateComponents, _ b: DateComponents) -> Bool {
        (a.year ?? 0, a.month ?? 0, a.day ?? 0) < (b.year ?? 0, b.month ?? 0, b.day ?? 0)
    }
}

private extension String {
    var nilIfEmpty: String? { isEmpty ? nil : self }
}
