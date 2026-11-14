import RotaryCore
import RotaryStudents
import SwiftUI

/// The students going one way in one exchange year: "Klas van 2026/2027".
nonisolated struct StudentClass: Hashable {
    let direction: ExchangeDirection
    let year: ExchangeYear

    var students: [ExchangeStudent] { ExchangeStudent.students(direction, in: year) }

    var title: LocalizedStringResource {
        LocalizedStringResource("Klas van \(year.description)", comment: "Students: a class, the students of one exchange year, such as Klas van 2026/2027.")
    }
}

/// A class in a list: a few of its students' photos overlapping, its name,
/// and how many students in how many countries.
struct ClassRow: View {
    let studentClass: StudentClass
    private let students: [ExchangeStudent]
    private let countryCount: Int

    init(studentClass: StudentClass) {
        self.studentClass = studentClass
        students = studentClass.students
        countryCount = Set(students.map(\.listCountry)).count
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            PhotoStack(students: Array(students.prefix(6)), remaining: max(students.count - 6, 0))
            VStack(alignment: .leading, spacing: 2) {
                Text(studentClass.title)
                    .font(.headline)
                Group {
                    switch studentClass.direction {
                    case .inbound:
                        Text("\(students.count) studenten uit \(countryCount) landen", comment: "Students: the size of a class of inbounds, such as 23 studenten uit 12 landen.")
                    case .outbound:
                        Text("\(students.count) studenten naar \(countryCount) landen", comment: "Students: the size of a class of outbounds, such as 26 studenten naar 14 landen.")
                    }
                }
                .font(.subheadline)
                .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.vertical, 6)
    }
}

/// Photos that overlap, each with a ring in the row's colour, and "+20"
/// for the rest.
private struct PhotoStack: View {
    let students: [ExchangeStudent]
    let remaining: Int
    @ScaledMetric private var size: CGFloat = 44

    var body: some View {
        HStack(spacing: -size * 0.28) {
            ForEach(students) { student in
                PersonPhoto(url: student.photoURL, size: size)
                    .overlay {
                        Circle().stroke(Color(.secondarySystemGroupedBackground), lineWidth: 3)
                    }
            }
            if remaining > 0 {
                Text(verbatim: "+\(remaining)")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .frame(width: size, height: size)
                    .background(Color(.tertiarySystemFill), in: .circle)
                    .overlay {
                        Circle().stroke(Color(.secondarySystemGroupedBackground), lineWidth: 3)
                    }
            }
        }
        .accessibilityHidden(true)
    }
}

/// The pages under Op exchange and Naar Nederland besides a class, a
/// student and a guide.
nonisolated enum StudentsPage: Hashable {
    /// A programme for outbounds: its class (for the year exchange) and its pages.
    case outbound(ExchangeProgramme)
    /// Every inbound of the years before this one, in one list.
    case earlierInbounds
}
