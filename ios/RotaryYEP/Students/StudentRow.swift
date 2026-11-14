import RotaryStudents
import SwiftUI

/// A student in a list: photo, name, and a line under it: the first line of
/// what they wrote, or where they went and when when the list is by year.
struct StudentRow: View {
    let student: ExchangeStudent
    let detail: Detail

    enum Detail {
        /// The start of the bio, for a list grouped by country.
        case bio
        /// The flag and country, for a list grouped by year.
        case country
        /// The school year, for a list of several years grouped by country.
        case year
    }

    var body: some View {
        HStack(spacing: 14) {
            PersonPhoto(url: student.photoURL, size: 52)
            VStack(alignment: .leading, spacing: 2) {
                Text(student.name, format: .name(style: .medium))
                    .font(.headline)
                Group {
                    switch detail {
                    case .bio:
                        Text(verbatim: student.bioPreview)
                            .lineLimit(2)
                    case .country:
                        Text(verbatim: "\(student.listCountry.flag) \(student.listCountry.name)")
                    case .year:
                        Text(verbatim: student.exchangeYear.description)
                    }
                }
                .font(.subheadline)
                .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 2)
    }
}
