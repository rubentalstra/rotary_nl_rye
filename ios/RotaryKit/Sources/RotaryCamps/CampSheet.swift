import Foundation

/// Turns the rows of zomerkampen.xlsx into camps. The sheet is kept by hand,
/// so every column is read leniently:
///
/// - Columns are found by their header, so a moved column changes nothing.
/// - Dates come as Excel serial numbers (days since 1899-12-30), as
///   `dd/mm/yyyy` or as `dd-mm-yyyy`.
/// - Districts can be one number, a list (`3521,3522,3523`, `5950, 5960`) or a
///   float a spreadsheet made of one (`3481.3481999999999`).
/// - Currency codes can carry spaces (`"EUR "`); an amount of 0 is "not given".
/// - Fully booked is an `x`.
///
/// A row without a title, valid dates, a country or ages is left out: it
/// cannot be shown truthfully.
enum CampSheet {
    /// The columns, by the start of their header (lower case).
    enum Column: CaseIterable {
        case start, end, title, country, districts, ageMin, ageMax, currency, contribution, full, invitation

        var headerPrefix: String {
            switch self {
            case .start: "startdatum"
            case .end: "einddatum"
            case .title: "kamp_titel"
            case .country: "landcode"
            case .districts: "gastdistrict"
            case .ageMin: "leeftijd_min"
            case .ageMax: "leeftijd_max"
            case .currency: "valuta"
            case .contribution: "kosten"
            case .full: "volgeboekt"
            case .invitation: "link"
            }
        }
    }

    static func camps(from sheet: Spreadsheet) -> [Camp] {
        guard let header = sheet.rows.first else { return [] }
        var columns: [Column: Int] = [:]
        for (index, cell) in header {
            let name = cell.text.trimmingCharacters(in: .whitespaces).lowercased()
            if let column = Column.allCases.first(where: { name.hasPrefix($0.headerPrefix) }) {
                columns[column] = index
            }
        }
        return sheet.rows.dropFirst()
            .compactMap { camp(from: $0, columns: columns) }
            .sorted { dayNumber($0.start) < dayNumber($1.start) }
    }

    private static func camp(from row: [Int: Spreadsheet.Cell], columns: [Column: Int]) -> Camp? {
        func cell(_ column: Column) -> Spreadsheet.Cell? {
            columns[column].flatMap { row[$0] }
        }
        func text(_ column: Column) -> String {
            cell(column)?.text.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        }

        let title = text(.title)
        guard !title.isEmpty,
              let start = cell(.start).flatMap(day(from:)),
              let end = cell(.end).flatMap(day(from:)),
              let country = region(from: text(.country)),
              let minimum = integer(from: text(.ageMin)),
              let maximum = integer(from: text(.ageMax)),
              minimum <= maximum
        else { return nil }

        return Camp(
            title: title,
            start: start,
            end: end,
            country: country,
            hostDistricts: districts(from: text(.districts)),
            ages: minimum...maximum,
            contribution: contribution(amount: text(.contribution), currency: text(.currency)),
            isFull: text(.full).lowercased() == "x",
            invitation: invitation(from: text(.invitation))
        )
    }

    // MARK: - Values

    /// A calendar day from an Excel serial number, `dd/mm/yyyy` or `dd-mm-yyyy`.
    static func day(from cell: Spreadsheet.Cell) -> DateComponents? {
        let text = cell.text.trimmingCharacters(in: .whitespaces)
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .gmt
        // Only a number cell holds a serial; a number typed as text is no date.
        if cell.isNumber, let serial = Double(text) {
            // Excel's day 0 is 1899-12-30 in the 1900 date system.
            guard let epoch = calendar.date(from: DateComponents(year: 1899, month: 12, day: 30)),
                  let date = calendar.date(byAdding: .day, value: Int(serial), to: epoch)
            else { return nil }
            return calendar.dateComponents([.year, .month, .day], from: date)
        }
        let parts = text.split(whereSeparator: { $0 == "/" || $0 == "-" }).compactMap { Int($0) }
        guard parts.count == 3 else { return nil }
        let components = DateComponents(year: parts[2], month: parts[1], day: parts[0])
        guard components.isValidDate(in: calendar) else { return nil }
        return components
    }

    /// A country from its ISO 3166-1 alpha-2 code, any case.
    static func region(from text: String) -> Locale.Region? {
        let code = text.uppercased()
        guard code.count == 2, Locale.Region.isoRegions.contains(where: { $0.identifier == code }) else { return nil }
        return Locale.Region(code)
    }

    /// The district numbers in a cell: a list, and floats cut to their whole part.
    static func districts(from text: String) -> [Int] {
        text.split(separator: ",")
            .compactMap { part in
                let part = part.trimmingCharacters(in: .whitespaces)
                return Int(part) ?? Double(part).map { Int($0) }
            }
            .filter { $0 > 0 }
    }

    /// An amount in a known currency; 0 or an unknown currency is no amount.
    static func contribution(amount: String, currency: String) -> Camp.Contribution? {
        let code = currency.trimmingCharacters(in: .whitespaces).uppercased()
        guard let value = Decimal(string: amount, locale: Locale(identifier: "en_US_POSIX")), value > 0,
              Locale.Currency.isoCurrencies.contains(where: { $0.identifier == code })
        else { return nil }
        return Camp.Contribution(amount: value, currency: Locale.Currency(code))
    }

    /// An http(s) link; anything else is no invitation.
    static func invitation(from text: String) -> URL? {
        guard let url = URL(string: text), let scheme = url.scheme?.lowercased(), scheme == "https" || scheme == "http" else { return nil }
        return url
    }

    /// A day as one sortable number: 2026-07-14 is 20260714.
    private static func dayNumber(_ day: DateComponents) -> Int {
        let year = day.year ?? 0, month = day.month ?? 0, date = day.day ?? 0
        return year * 10_000 + month * 100 + date
    }

    private static func integer(from text: String) -> Int? {
        Int(text) ?? Double(text).map { Int($0) }
    }
}
