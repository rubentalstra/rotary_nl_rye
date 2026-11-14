import Foundation
import Observation
import RotaryCamps

/// The summer camps screen's state: loading the sheet, the camps, and the
/// search, filters and order a person chose. Views read what to show from
/// `months`; they never filter themselves.
@Observable
final class CampsModel {
    enum State: Equatable {
        case loading
        case loaded
        case failed(CampFeed.LoadError)
    }

    /// How the list is ordered.
    enum Order: Hashable, CaseIterable {
        /// By first day, in sections per month.
        case date
        /// By contribution, cheapest first; camps without an amount last.
        case price
    }

    /// The camps that start in one month, for a section of the list.
    struct Month: Identifiable, Equatable {
        /// Year and month.
        let id: DateComponents
        let camps: [Camp]
    }

    private(set) var state: State = .loading
    private(set) var camps: [Camp] = [] { didSet { deriveFromCamps() } }

    var query = "" { didSet { deriveVisible() } }
    /// Only camps a person of this age may join; nil for every age.
    var age: Int? { didSet { deriveVisible() } }
    /// Only camps in these countries; empty for every country.
    var countries: Set<Locale.Region> = [] { didSet { deriveVisible() } }
    var hidesFullCamps = false { didSet { deriveVisible() } }
    var showsPastCamps = false { didSet { deriveVisible() } }
    var order: Order = .date { didSet { deriveVisible() } }

    // MARK: - What to show
    //
    // Stored, not computed: the list reads these on every redraw, and while
    // someone types a search, filtering 74 camps (with a country name lookup
    // each) on every read kept the screen busy. They change only when the
    // camps or a filter change.

    /// The camps that pass the search and filters, in the chosen order.
    private(set) var visibleCamps: [Camp] = []
    /// The visible camps in sections per month of their first day.
    private(set) var months: [Month] = []
    /// How many camps are over, for the button that shows them.
    private(set) var pastCampCount = 0
    /// The countries in the sheet, by their name in the app's language.
    private(set) var availableCountries: [Locale.Region] = []
    /// The youngest and oldest age any camp accepts.
    private(set) var availableAges: ClosedRange<Int>?

    @ObservationIgnored private let feed: CampFeed
    @ObservationIgnored private var loadTask: Task<Void, Never>?

    init(feed: CampFeed = CampFeed()) {
        self.feed = feed
    }

    // MARK: - Loading

    /// Loads the sheet once; a second call while loading does nothing.
    func startLoading() {
        guard loadTask == nil, camps.isEmpty else { return }
        loadTask = Task {
            defer { loadTask = nil }
            await load()
        }
    }

    /// Loads the sheet again, for pull to refresh.
    func load() async {
        do {
            camps = try await feed.camps()
            state = .loaded
        } catch {
            // Keep camps shown before when a refresh fails.
            state = camps.isEmpty ? .failed(error) : .loaded
        }
    }

    // MARK: - Deriving

    /// What depends on the camps alone, then what the filters show of them.
    private func deriveFromCamps() {
        let today = Date.now
        pastCampCount = camps.filter { $0.hasEnded(before: today) }.count
        availableCountries = Set(camps.map(\.country)).sorted { $0.name.localizedStandardCompare($1.name) == .orderedAscending }
        if let low = camps.map(\.ages.lowerBound).min(), let high = camps.map(\.ages.upperBound).max() {
            availableAges = low...high
        } else {
            availableAges = nil
        }
        deriveVisible()
    }

    /// The visible camps and their months, after a change of camps or filters.
    private func deriveVisible() {
        let today = Date.now
        let shown = camps.filter { camp in
            (showsPastCamps || !camp.hasEnded(before: today))
                && (!hidesFullCamps || !camp.isFull)
                && (age.map(camp.accepts(age:)) ?? true)
                && (countries.isEmpty || countries.contains(camp.country))
                && camp.matches(query)
        }
        let ordered = switch order {
        case .date: shown
        case .price: shown.sorted { ($0.contribution?.amount ?? .greatestFiniteMagnitude) < ($1.contribution?.amount ?? .greatestFiniteMagnitude) }
        }
        var grouped: [Month] = []
        for camp in ordered {
            let month = DateComponents(year: camp.start.year, month: camp.start.month)
            if grouped.last?.id == month {
                grouped[grouped.count - 1] = Month(id: month, camps: grouped[grouped.count - 1].camps + [camp])
            } else {
                grouped.append(Month(id: month, camps: [camp]))
            }
        }
        visibleCamps = ordered
        months = grouped
    }

    /// Whether any filter narrows the list (the search and order aside).
    var isFiltered: Bool {
        age != nil || !countries.isEmpty || hidesFullCamps || showsPastCamps
    }

    /// Whether `country` is among the chosen countries, for a toggle per country.
    subscript(country country: Locale.Region) -> Bool {
        get { countries.contains(country) }
        set {
            if newValue { countries.insert(country) } else { countries.remove(country) }
        }
    }

    func clearFilters() {
        age = nil
        countries = []
        hidesFullCamps = false
        showsPastCamps = false
    }
}
