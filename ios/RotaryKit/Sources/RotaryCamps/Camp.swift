public import Foundation

/// A summer camp or tour abroad, as listed in zomerkampen.xlsx.
public struct Camp: Identifiable, Equatable, Sendable {
    /// A camp is known by its title and its first day: the same camp held in
    /// another year is another camp.
    public struct ID: Hashable, Sendable {
        public let title: String
        public let start: DateComponents
    }

    public let title: String
    /// Calendar dates (year, month, day), so a day never shifts with a time zone.
    public let start: DateComponents
    public let end: DateComponents
    /// The host country; the system names it in the app's language.
    public let country: Locale.Region
    /// The Rotary district or districts that host the camp; can be empty.
    public let hostDistricts: [Int]
    /// The ages that may join, inclusive.
    public let ages: ClosedRange<Int>
    /// What the camp costs, or nil when the sheet gives no amount.
    public let contribution: Contribution?
    public let isFull: Bool
    /// The invitation: a PDF, or the organiser's website.
    public let invitation: URL?

    public var id: ID { ID(title: title, start: start) }

    /// An amount in a currency, for the system's currency format.
    public struct Contribution: Equatable, Sendable {
        public let amount: Decimal
        public let currency: Locale.Currency

        public init(amount: Decimal, currency: Locale.Currency) {
            self.amount = amount
            self.currency = currency
        }
    }

    public init(
        title: String, start: DateComponents, end: DateComponents, country: Locale.Region,
        hostDistricts: [Int] = [], ages: ClosedRange<Int>, contribution: Contribution? = nil,
        isFull: Bool = false, invitation: URL? = nil
    ) {
        self.title = title
        self.start = start
        self.end = end
        self.country = country
        self.hostDistricts = hostDistricts
        self.ages = ages
        self.contribution = contribution
        self.isFull = isFull
        self.invitation = invitation
    }

    // MARK: - Dates

    /// The first day at midnight in `calendar`, for formatting and sorting.
    public func startDate(in calendar: Calendar = .current) -> Date? {
        calendar.date(from: start)
    }

    public func endDate(in calendar: Calendar = .current) -> Date? {
        calendar.date(from: end)
    }

    /// The nights between the first and the last day.
    public func nights(in calendar: Calendar = .current) -> Int? {
        guard let start = startDate(in: calendar), let end = endDate(in: calendar) else { return nil }
        return calendar.dateComponents([.day], from: start, to: end).day
    }

    /// Whether the camp's last day is before `day`.
    public func hasEnded(before day: Date, in calendar: Calendar = .current) -> Bool {
        guard let end = endDate(in: calendar) else { return false }
        return end < calendar.startOfDay(for: day)
    }

    // MARK: - Filtering

    public func accepts(age: Int) -> Bool {
        ages.contains(age)
    }

    /// Whether `query` matches the title or the country's name in `locale`.
    public func matches(_ query: String, locale: Locale = .current) -> Bool {
        let query = query.trimmingCharacters(in: .whitespaces)
        guard !query.isEmpty else { return true }
        let countryName = locale.localizedString(forRegionCode: country.identifier) ?? ""
        return [title, countryName, country.identifier].contains { $0.localizedStandardContains(query) }
    }

    /// Whether the invitation is a PDF rather than a website.
    public var invitationIsPDF: Bool {
        invitation?.pathExtension.lowercased() == "pdf"
    }
}

/// Camps are the same camp when they have the same identity; hashing that
/// alone keeps the title and the rest out of the hasher.
extension Camp: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
