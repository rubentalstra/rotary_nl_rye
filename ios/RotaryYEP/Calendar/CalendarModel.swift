import Foundation
import Observation
import RotaryCalendar

/// The calendar screen's state: loading the events and what to show of them.
/// The derived lists are stored and recomputed when the events or the chosen
/// day change, never on each redraw.
@Observable
final class CalendarModel {
    enum State: Equatable {
        case loading
        case loaded
        case failed(CalendarFeed.LoadError)
    }

    /// The events in sections per month of their start.
    struct Month: Identifiable, Equatable {
        /// Year and month.
        let id: DateComponents
        let events: [CalendarEvent]
    }

    private(set) var state: State = .loading
    private(set) var events: [CalendarEvent] = [] { didSet { derive() } }
    var showsPastEvents = false { didSet { derive() } }
    /// The day picked in the month view.
    var selectedDay: DateComponents? { didSet { deriveSelectedDay() } }

    /// Going on right now.
    private(set) var ongoing: [CalendarEvent] = []
    /// Still to come (and the past ones when asked), per month.
    private(set) var months: [Month] = []
    private(set) var pastEventCount = 0
    /// Every day with an event, for the month view's marks.
    private(set) var eventDays: Set<DateComponents> = []
    /// The events on the picked day.
    private(set) var selectedDayEvents: [CalendarEvent] = []

    @ObservationIgnored private let feed: CalendarFeed
    @ObservationIgnored private var loadTask: Task<Void, Never>?

    init(feed: CalendarFeed = CalendarFeed(apiKey: Bundle.main.object(forInfoDictionaryKey: "RotaryGoogleAPIKey") as? String ?? "")) {
        self.feed = feed
    }

    // MARK: - Loading

    /// Loads the events once; a second call while loading does nothing.
    func startLoading() {
        guard loadTask == nil, events.isEmpty else { return }
        loadTask = Task {
            defer { loadTask = nil }
            await load()
        }
    }

    /// Loads the events again, for pull to refresh.
    func load() async {
        do {
            events = try await feed.events()
            state = .loaded
        } catch {
            state = events.isEmpty ? .failed(error) : .loaded
        }
    }

    // MARK: - Deriving

    private func derive() {
        let now = Date.now
        let calendar = Calendar.current
        ongoing = events.filter { $0.isOngoing(at: now, in: calendar) }
        let past = events.filter { $0.hasEnded(at: now, in: calendar) }
        pastEventCount = past.count
        let upcoming = events.filter { !$0.hasEnded(at: now, in: calendar) && !$0.isOngoing(at: now, in: calendar) }
        let listed = showsPastEvents ? past + upcoming : upcoming
        var grouped: [Month] = []
        for event in listed {
            guard let start = event.start(in: calendar) else { continue }
            let month = calendar.dateComponents([.year, .month], from: start)
            if grouped.last?.id == month {
                grouped[grouped.count - 1] = Month(id: month, events: grouped[grouped.count - 1].events + [event])
            } else {
                grouped.append(Month(id: month, events: [event]))
            }
        }
        months = grouped
        eventDays = Set(events.flatMap { $0.days(in: calendar) })
        deriveSelectedDay()
    }

    private func deriveSelectedDay() {
        guard let selectedDay else {
            selectedDayEvents = []
            return
        }
        let calendar = Calendar.current
        selectedDayEvents = events.filter { $0.days(in: calendar).contains(selectedDay) }
    }
}
