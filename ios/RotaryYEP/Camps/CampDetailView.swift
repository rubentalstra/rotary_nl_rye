import RotaryCamps
import SwiftUI

/// Everything about one camp: where and when, for whom, what it costs, which
/// district hosts it, and its invitation, opened in the app.
struct CampDetailView: View {
    let camp: Camp

    var body: some View {
        List {
            Section {
                CampHeader(camp: camp)
                    .listRowBackground(Color.clear)
            }
            WhenSection(camp: camp)
            Section("Voor wie") {
                LabeledContent {
                    Text("\(camp.ages.lowerBound) tot \(camp.ages.upperBound) jaar")
                } label: {
                    Label("Leeftijd", systemImage: "person")
                }
                LabeledContent {
                    if let contribution = camp.contribution {
                        Text(contribution.amount, format: .currency(code: contribution.currency.identifier).precision(.fractionLength(0...2)))
                    } else {
                        Text("Niet bekend")
                    }
                } label: {
                    Label("Kosten", systemImage: "banknote")
                }
                if !camp.hostDistricts.isEmpty {
                    LabeledContent {
                        Text(camp.hostDistricts.map { String($0) }.formatted(.list(type: .and)))
                    } label: {
                        Label(camp.hostDistricts.count == 1 ? "Gastdistrict" : "Gastdistricten", systemImage: "map")
                    }
                }
            }
            if let invitation = camp.invitation {
                InvitationSection(url: invitation, isPDF: camp.invitationIsPDF)
            }
        }
        .navigationTitle(Text(camp.country.name))
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// The flag, the title, the country and whether it is full.
private struct CampHeader: View {
    let camp: Camp

    var body: some View {
        VStack(spacing: 8) {
            Text(camp.country.flag)
                .font(.system(size: 64))
                .accessibilityHidden(true)
            Text(camp.title)
                .font(.title2.bold())
                .multilineTextAlignment(.center)
            Text(camp.country.name)
                .foregroundStyle(.secondary)
            if camp.isFull {
                FullBadge()
            }
        }
        .frame(maxWidth: .infinity)
    }
}

/// The first and last day, and how many nights that is.
private struct WhenSection: View {
    let camp: Camp

    var body: some View {
        Section("Wanneer") {
            if let start = camp.startDate() {
                LabeledContent {
                    Text(start, format: .dateTime.weekday(.wide).day().month(.wide).year())
                } label: {
                    Label("Van", systemImage: "calendar")
                }
            }
            if let end = camp.endDate() {
                LabeledContent {
                    Text(end, format: .dateTime.weekday(.wide).day().month(.wide).year())
                } label: {
                    Label("Tot en met", systemImage: "calendar.badge.checkmark")
                }
            }
            if let nights = camp.nights(), nights > 0 {
                LabeledContent {
                    Text(nights, format: .number)
                } label: {
                    Label("Nachten", systemImage: "moon.stars")
                }
            }
        }
    }
}

/// The invitation: a PDF in Quick Look, a website in the in-app browser; and a way to share it.
private struct InvitationSection: View {
    let url: URL
    let isPDF: Bool

    var body: some View {
        Section {
            DocumentLink(url) {
                Label(isPDF ? "Bekijk de uitnodiging" : "Bekijk de website", systemImage: isPDF ? "doc.richtext" : "safari")
            }
            ShareLink(item: url) {
                Label("Deel", systemImage: "square.and.arrow.up")
            }
        }
    }
}
