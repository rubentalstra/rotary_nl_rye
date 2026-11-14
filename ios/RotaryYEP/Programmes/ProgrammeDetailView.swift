import RotaryCore
import SwiftUI

/// A programme's page: its photos, the facts at a glance, what it is, why to
/// go or who it suits, where it goes and how to sign up.
struct ProgrammeDetailView: View {
    let programme: ExchangeProgramme

    var body: some View {
        List {
            ProgrammeHeader(programme: programme)
            FactsSection(programme: programme)
            Section("Over het programma") {
                ForEach(programme.about, id: \.key) { paragraph in
                    Text(paragraph)
                }
            }
            HighlightsSection(highlights: programme.highlights)
            ForEach(programme.destinations.groups) { group in
                DestinationSection(group: group)
            }
            if programme == .summerCamps {
                Section {
                    NavigationLink(value: HomeDestination.summerCamps) {
                        Label("Bekijk de zomerkampen", systemImage: "tent")
                    }
                } footer: {
                    Text("Alle kampen van dit jaar, met data, leeftijden en prijzen.")
                }
            }
            SignUpSection(programme: programme)
        }
        .navigationTitle(Text(programme.title))
    }
}

/// The photos to swipe through, each opening full screen, and the line on
/// what the programme is; the programme's symbol when it has no photos.
private struct ProgrammeHeader: View {
    let programme: ExchangeProgramme

    var body: some View {
        Section {
            if programme.photos.isEmpty {
                Image(systemName: programme.systemImage)
                    .font(.system(size: 56))
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity, minHeight: 180)
                    .background(Color.accentColor.gradient)
                    .accessibilityHidden(true)
                    .listRowInsets(EdgeInsets())
            } else {
                PhotoGallery(photos: programme.photos)
                    .listRowInsets(EdgeInsets())
            }
            Text(programme.tagline)
                .font(.title3.weight(.semibold))
                .padding(.vertical, 4)
        }
    }
}

/// Age, length, price and selection, each with its symbol.
private struct FactsSection: View {
    let programme: ExchangeProgramme

    var body: some View {
        Section {
            FactRow(title: Text("Leeftijd"), systemImage: "person") {
                Text(programme.ageText)
            }
            FactRow(title: Text("Duur"), systemImage: "calendar") {
                Text(programme.durationText)
            }
            FactRow(title: Text("Kosten"), systemImage: "eurosign.circle") {
                let price = programme.cost.amount.formatted(.currency(code: "EUR"))
                if programme.cost.isMinimum {
                    Text("Vanaf \(price)")
                } else {
                    Text(verbatim: price)
                }
            }
            if let selection = programme.selection {
                FactRow(title: Text("Selectie"), systemImage: "checklist") {
                    Text(selection)
                }
            }
        } header: {
            Text("In het kort")
        } footer: {
            Text(programme.cost.note)
        }
    }
}

/// A fact: its symbol, a small title and the value under it, so long values
/// wrap at every text size.
private struct FactRow<Value: View>: View {
    let title: Text
    let systemImage: String
    @ViewBuilder let value: Value

    var body: some View {
        Label {
            VStack(alignment: .leading, spacing: 2) {
                title
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                value
                    .font(.body)
            }
        } icon: {
            Image(systemName: systemImage)
                .foregroundStyle(.tint)
        }
        .accessibilityElement(children: .combine)
    }
}

/// Why to take part or who it suits, a symbol per point.
private struct HighlightsSection: View {
    let highlights: ExchangeProgramme.Highlights

    var body: some View {
        Section {
            ForEach(highlights.points) { point in
                Label {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(point.title)
                            .font(.headline)
                        if let text = point.text {
                            Text(text)
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }
                    }
                } icon: {
                    Image(systemName: point.systemImage)
                        .foregroundStyle(.tint)
                }
                .padding(.vertical, 2)
            }
        } header: {
            Text(highlights.title)
        }
    }
}

/// The countries of a destination group, with their flags and names in the
/// person's language.
private struct DestinationSection: View {
    let group: ExchangeProgramme.DestinationGroup

    var body: some View {
        Section {
            ForEach(group.countries, id: \.identifier) { country in
                Label {
                    Text(verbatim: country.name)
                } icon: {
                    Text(country.flag)
                        .accessibilityHidden(true)
                }
            }
        } header: {
            Text(group.name)
        } footer: {
            if let note = group.note {
                Text(note)
            }
        }
    }
}

/// How to sign up, and the address to mail.
private struct SignUpSection: View {
    let programme: ExchangeProgramme

    var body: some View {
        Section {
            Text(programme.signUpText)
            if let url = ContactLinks.mail(programme.signUpEmail) {
                Link(destination: url) {
                    Label {
                        Text(verbatim: programme.signUpEmail)
                    } icon: {
                        Image(systemName: "envelope")
                    }
                }
            }
        } header: {
            Text("Aanmelden")
        }
    }
}

#Preview {
    NavigationStack {
        ProgrammeDetailView(programme: .longTerm)
    }
}
