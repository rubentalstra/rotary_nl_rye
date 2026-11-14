public import Foundation

/// An event in the MDJC calendar of Rotary Youth Exchange Netherlands.
public struct CalendarEvent: Identifiable, Hashable, Sendable {
    /// Google Calendar's id of the event.
    public let id: String
    /// The event's title; nil when the calendar gives none.
    public let title: String?
    public let timing: Timing
    public let location: String?
    /// The event's description as Google keeps it: text, sometimes with a
    /// little HTML (the app reads that with `NSAttributedString`).
    public let notes: String?

    /// When an event takes place.
    public enum Timing: Hashable, Sendable {
        /// Whole days, from the first to the last day, both included. Calendar
        /// dates, so a day never shifts with a time zone.
        case allDay(first: DateComponents, last: DateComponents)
        /// From a moment to a moment.
        case timed(start: Date, end: Date)
    }

    public init(id: String, title: String?, timing: Timing, location: String? = nil, notes: String? = nil) {
        self.id = id
        self.title = title
        self.timing = timing
        self.location = location
        self.notes = notes
    }

    public var isAllDay: Bool {
        if case .allDay = timing { true } else { false }
    }

    /// When the event starts: midnight of its first day, or its start.
    public func start(in calendar: Calendar = .current) -> Date? {
        switch timing {
        case .allDay(let first, _): calendar.date(from: first)
        case .timed(let start, _): start
        }
    }

    /// When the event ends: midnight after its last day, or its end.
    public func end(in calendar: Calendar = .current) -> Date? {
        switch timing {
        case .allDay(_, let last): calendar.date(from: last).flatMap { calendar.date(byAdding: .day, value: 1, to: $0) }
        case .timed(_, let end): end
        }
    }

    /// Whether the event is going on at `moment`.
    public func isOngoing(at moment: Date, in calendar: Calendar = .current) -> Bool {
        guard let start = start(in: calendar), let end = end(in: calendar) else { return false }
        return start <= moment && moment < end
    }

    /// Whether the event is over at `moment`.
    public func hasEnded(at moment: Date, in calendar: Calendar = .current) -> Bool {
        guard let end = end(in: calendar) else { return false }
        return end <= moment
    }

    /// Every calendar day the event touches, for marking them in a month view.
    public func days(in calendar: Calendar = .current) -> [DateComponents] {
        guard let start = start(in: calendar), let end = end(in: calendar) else { return [] }
        var days: [DateComponents] = []
        var day = calendar.startOfDay(for: start)
        while day < end {
            // Only year, month and day: components a calendar makes also carry
            // isLeapMonth, which would make equal days hash differently.
            let parts = calendar.dateComponents([.year, .month, .day], from: day)
            days.append(DateComponents(year: parts.year, month: parts.month, day: parts.day))
            guard let next = calendar.date(byAdding: .day, value: 1, to: day) else { break }
            day = next
        }
        return days
    }

    /// How many days the event spans.
    public func dayCount(in calendar: Calendar = .current) -> Int {
        days(in: calendar).count
    }
}
