public import Foundation

/// A student of Rotary Youth Exchange Netherlands: an inbound who comes to
/// the Netherlands for a school year, or an outbound who goes abroad.
///
/// An outbound whose year is over is a rebound; `status(on:)` says which.
public struct ExchangeStudent: Identifiable, Hashable, Sendable {
    /// A student by name, year and home country: two students of the same
    /// year can share a first name.
    public struct ID: Hashable, Sendable {
        public let name: PersonNameComponents
        public let exchangeYear: ExchangeYear
        public let homeCountry: Locale.Region
    }

    public let name: PersonNameComponents
    public let direction: ExchangeDirection
    public let exchangeYear: ExchangeYear
    public let homeCountry: Locale.Region
    public let destination: Destination
    public let photoURL: URL?
    /// What the student wrote about themselves, shown as written.
    public let bio: String
    /// The bio on one line, its line breaks folded, for a list.
    public let bioPreview: String

    public var id: ID { ID(name: name, exchangeYear: exchangeYear, homeCountry: homeCountry) }

    /// The country that groups the student in a list: where an inbound comes
    /// from, where an outbound goes.
    public var listCountry: Destination {
        switch direction {
        case .inbound: .country(homeCountry)
        case .outbound: destination
        }
    }

    /// Before, during or after the student's exchange year on a date.
    public func status(on date: Date, calendar: Calendar = .current) -> ExchangeStatus {
        let interval = exchangeYear.dateInterval(in: calendar)
        if date < interval.start { return .upcoming }
        if date < interval.end { return .onExchange }
        return .returned
    }
}

/// Which way a student goes.
public enum ExchangeDirection: CaseIterable, Identifiable, Hashable, Sendable {
    /// From abroad to the Netherlands.
    case inbound
    /// From the Netherlands abroad.
    case outbound

    public var id: Self { self }
}

/// Where a student goes: a country, or somewhere in Europe when the country
/// was not known yet.
public enum Destination: Hashable, Sendable {
    case country(Locale.Region)
    case europe
}

/// Where a student is in the exchange's year.
public enum ExchangeStatus: CaseIterable, Identifiable, Hashable, Sendable {
    /// The year has not begun.
    case upcoming
    /// The student is on exchange now.
    case onExchange
    /// The year is over: an outbound is a rebound, an inbound has gone home.
    case returned

    public var id: Self { self }
}

/// The exchange year of a student, such as 2026/2027.
public struct ExchangeYear: Hashable, Comparable, Sendable {
    /// The year it begins: 2026 for 2026/2027.
    public let startYear: Int

    public init(startYear: Int) {
        self.startYear = startYear
    }

    public var endYear: Int { startYear + 1 }

    /// "2026/2027", as an exchange year is written.
    public var description: String { "\(startYear)/\(endYear)" }

    /// From 1 August, when students leave, to 1 July of the next year, when
    /// the last are home.
    public func dateInterval(in calendar: Calendar) -> DateInterval {
        let start = calendar.date(from: DateComponents(year: startYear, month: 8, day: 1)) ?? .distantPast
        let end = calendar.date(from: DateComponents(year: endYear, month: 7, day: 1)) ?? .distantFuture
        return DateInterval(start: start, end: end)
    }

    public static func < (lhs: ExchangeYear, rhs: ExchangeYear) -> Bool {
        lhs.startYear < rhs.startYear
    }
}
