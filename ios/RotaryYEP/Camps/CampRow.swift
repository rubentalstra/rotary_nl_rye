import RotaryCamps
import SwiftUI

/// A camp in the list: the flag, then the title in full and the country
/// (with "Vol" when the camp is full); below them the dates and ages, with the
/// price on the trailing side of that block. Nothing sits beside the title,
/// so it never gets cut off. The month is in the section header, so the
/// dates leave out the year.
struct CampRow: View {
    let camp: Camp

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            Text(camp.country.flag)
                .font(.title)
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 6) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(camp.title)
                        .font(.headline)
                    HStack(spacing: 8) {
                        Text(camp.country.name)
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                        if camp.isFull {
                            FullBadge()
                        }
                    }
                }
                HStack(alignment: .lastTextBaseline) {
                    VStack(alignment: .leading, spacing: 3) {
                        // Dates and ages decide whether a camp fits, so they read in full colour.
                        Label {
                            CampDates(camp: camp)
                        } icon: {
                            Image(systemName: "calendar")
                                .foregroundStyle(.tint)
                        }
                        .font(.subheadline.weight(.medium))
                        Label {
                            Text("\(camp.ages.lowerBound)–\(camp.ages.upperBound) jaar")
                        } icon: {
                            Image(systemName: "person")
                                .foregroundStyle(.tint)
                        }
                        .font(.subheadline.weight(.medium))
                    }
                    .labelStyle(.titleAndIcon)
                    .imageScale(.small)
                    Spacer(minLength: 8)
                    if let contribution = camp.contribution {
                        Text(contribution.amount, format: .currency(code: contribution.currency.identifier).precision(.fractionLength(0)))
                            .font(.headline)
                            .monospacedDigit()
                    }
                }
            }
        }
        .padding(.vertical, 6)
        .opacity(camp.isFull ? 0.6 : 1)
    }
}

/// "26 dec – 8 jan": the first and last day without the year.
struct CampDates: View {
    let camp: Camp

    var body: some View {
        if let start = camp.startDate(), let end = camp.endDate() {
            Text("\(start, format: .dateTime.day().month(.abbreviated)) – \(end, format: .dateTime.day().month(.abbreviated))", comment: "A camp's first and last day, such as 26 Dec – 8 Jan.")
        }
    }
}

/// "Vol": a camp that takes nobody more.
struct FullBadge: View {
    var body: some View {
        Text("Vol")
            .font(.caption.weight(.semibold))
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .foregroundStyle(.red)
            .background(.red.opacity(0.12), in: .capsule)
    }
}

extension Locale.Region {
    /// The country's name in the app's language.
    var name: String {
        Locale.current.localizedString(forRegionCode: identifier) ?? identifier
    }

    /// The country's flag emoji: its two letters as Unicode regional indicator symbols.
    var flag: String {
        String(String.UnicodeScalarView(identifier.unicodeScalars.compactMap { Unicode.Scalar(127_397 + $0.value) }))
    }
}
