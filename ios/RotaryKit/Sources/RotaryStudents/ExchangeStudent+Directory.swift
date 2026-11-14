public import Foundation

extension ExchangeStudent {
    /// Every inbound, newest year first, then by name.
    public static let inbound: [ExchangeStudent] = load(.inbound)

    /// Every outbound, current and rebound, newest year first, then by name.
    public static let outbound: [ExchangeStudent] = load(.outbound)

    public static func all(_ direction: ExchangeDirection) -> [ExchangeStudent] {
        switch direction {
        case .inbound: inbound
        case .outbound: outbound
        }
    }

    /// The years with students going this way, newest first.
    public static func years(_ direction: ExchangeDirection) -> [ExchangeYear] {
        Array(Set(all(direction).map(\.exchangeYear))).sorted(by: >)
    }

    /// The students of one year.
    public static func students(_ direction: ExchangeDirection, in year: ExchangeYear) -> [ExchangeStudent] {
        all(direction).filter { $0.exchangeYear == year }
    }

    /// The students going this way whose exchange year is over on a date.
    public static func returned(_ direction: ExchangeDirection, on date: Date, calendar: Calendar = .current) -> [ExchangeStudent] {
        all(direction).filter { $0.status(on: date, calendar: calendar) == .returned }
    }

    /// The outbounds whose year is over on a date: the rebounds.
    public static func rebounds(on date: Date, calendar: Calendar = .current) -> [ExchangeStudent] {
        returned(.outbound, on: date, calendar: calendar)
    }

    // MARK: - Resources

    /// A student as the JSON resources hold them: the content of the v13 app.
    private struct Record: Decodable {
        let given: String
        let family: String
        let year: Int
        let home: String
        let destination: String
        let photo: URL?
        let bio: String
    }

    private static func load(_ direction: ExchangeDirection) -> [ExchangeStudent] {
        let name = switch direction {
        case .inbound: "inbound"
        case .outbound: "outbound"
        }
        guard let url = Bundle.module.url(forResource: name, withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let records = try? JSONDecoder().decode([Record].self, from: data)
        else { return [] }
        return records.map { record in
            var components = PersonNameComponents()
            components.givenName = record.given
            components.familyName = record.family.isEmpty ? nil : record.family
            return ExchangeStudent(
                name: components,
                direction: direction,
                exchangeYear: ExchangeYear(startYear: record.year),
                homeCountry: Locale.Region(record.home),
                destination: record.destination == "europe" ? .europe : .country(Locale.Region(record.destination)),
                photoURL: record.photo,
                bio: record.bio,
                bioPreview: record.bio.split(whereSeparator: \.isNewline).map { $0.trimmingCharacters(in: .whitespaces) }.filter { !$0.isEmpty }.joined(separator: " ")
            )
        }
    }
}
