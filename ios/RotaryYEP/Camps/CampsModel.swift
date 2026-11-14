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
    private(set) var camps: [Camp] = []

    var query = ""
    /// Only camps a person of this age may join; nil for every age.
    var age: Int?
    /// Only camps in these countries; empty for every country.
    var countries: Set<Locale.Region> = []
    var hidesFullCamps = false
    var showsPastCamps = false
    var order: Order = .date

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

    // MARK: - What to show

    /// The camps that pass the search and filters, in the chosen order.
    var visibleCamps: [Camp] {
        let today = Date.now
        let shown = camps.filter { camp in
            (showsPastCamps || !camp.hasEnded(before: today))
                && (!hidesFullCamps || !camp.isFull)
                && (age.map(camp.accepts(age:)) ?? true)
                && (countries.isEmpty || countries.contains(camp.country))
                && camp.matches(query)
        }
        switch order {
        case .date:
            return shown
        case .price:
            return shown.sorted { ($0.contribution?.amount ?? .greatestFiniteMagnitude) < ($1.contribution?.amount ?? .greatestFiniteMagnitude) }
        }
    }

    /// The visible camps in sections per month of their first day.
    var months: [Month] {
        var months: [Month] = []
        for camp in visibleCamps {
            let month = DateComponents(year: camp.start.year, month: camp.start.month)
            if months.last?.id == month {
                months[months.count - 1] = Month(id: month, camps: months[months.count - 1].camps + [camp])
            } else {
                months.append(Month(id: month, camps: [camp]))
            }
        }
        return months
    }

    /// How many camps are over, for the button that shows them.
    var pastCampCount: Int {
        let today = Date.now
        return camps.filter { $0.hasEnded(before: today) }.count
    }

    /// The countries in the sheet, by their name in the app's language.
    var availableCountries: [Locale.Region] {
        Set(camps.map(\.country)).sorted {
            (Locale.current.localizedString(forRegionCode: $0.identifier) ?? $0.identifier)
                .localizedStandardCompare(Locale.current.localizedString(forRegionCode: $1.identifier) ?? $1.identifier) == .orderedAscending
        }
    }

    /// The youngest and oldest age any camp accepts.
    var availableAges: ClosedRange<Int>? {
        guard let low = camps.map(\.ages.lowerBound).min(), let high = camps.map(\.ages.upperBound).max() else { return nil }
        return low...high
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
