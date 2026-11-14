import Foundation
import Observation
import RotaryStudents

/// A list of students in sections by country or by exchange year, narrowed by
/// a search on name or country. The sections are worked out when the search
/// or grouping changes, never while drawing.
@Observable
final class StudentListModel {
    enum Grouping: Hashable {
        case country
        case year
    }

    /// A section: a country with its students, or an exchange year.
    struct StudentSection: Identifiable {
        enum ID: Hashable {
            case country(Destination)
            case year(ExchangeYear)
        }

        let id: ID
        let students: [ExchangeStudent]
    }

    var query = "" {
        didSet { update() }
    }

    var grouping: Grouping {
        didSet { update() }
    }

    private(set) var sections: [StudentSection] = []

    let students: [ExchangeStudent]
    /// Whether the students are of more than one exchange year, so grouping
    /// by year means something.
    let spansYears: Bool

    init(students: [ExchangeStudent], grouping: Grouping = .country) {
        self.students = students
        self.grouping = grouping
        spansYears = Set(students.map(\.exchangeYear)).count > 1
        update()
    }

    private func update() {
        let needle = query.trimmingCharacters(in: .whitespaces)
        let matching = needle.isEmpty ? students : students.filter { student in
            student.name.formatted().localizedStandardContains(needle)
                || student.listCountry.name.localizedStandardContains(needle)
        }
        switch grouping {
        case .country:
            sections = Dictionary(grouping: matching, by: \.listCountry)
                .map { StudentSection(id: .country($0.key), students: $0.value.sorted(by: Self.byName)) }
                .sorted { lhs, rhs in
                    guard case .country(let left) = lhs.id, case .country(let right) = rhs.id else { return false }
                    return left.name.localizedStandardCompare(right.name) == .orderedAscending
                }
        case .year:
            sections = Dictionary(grouping: matching, by: \.exchangeYear)
                .sorted { $0.key > $1.key }
                .map { StudentSection(id: .year($0.key), students: $0.value.sorted(by: Self.byName)) }
        }
    }

    private static func byName(_ lhs: ExchangeStudent, _ rhs: ExchangeStudent) -> Bool {
        lhs.name.formatted().localizedStandardCompare(rhs.name.formatted()) == .orderedAscending
    }
}
