import RotaryCore
import SwiftUI

/// The root of the Contact tab: one team at a time, chosen with a segmented
/// control in the bar under the title. A search looks within that team.
struct ContactView: View {
    @State private var team: ContactGroup = .mdjc
    @State private var query = ""

    var body: some View {
        NavigationStack {
            List {
                TeamSection(team: team, members: team.members(matching: query))
                    // Each team is its own section, so switching teams shows
                    // the other team instead of moving the people both share.
                    .id(team)
            }
            .overlay {
                if team.members(matching: query).isEmpty {
                    ContentUnavailableView.search(text: query)
                }
            }
            .safeAreaBar(edge: .top) {
                TeamPicker(team: $team)
            }
            .searchable(text: $query, prompt: Text("Naam, rol of club"))
            .navigationTitle(Text(AppTab.contact.title))
            .navigationDestination(for: Person.self) { person in
                PersonDetailView(person: person)
            }
        }
    }
}

/// The segmented control that switches between the teams.
private struct TeamPicker: View {
    @Binding var team: ContactGroup

    var body: some View {
        Picker(selection: $team) {
            ForEach(ContactGroup.teams) { team in
                Text(team.name).tag(team)
            }
        } label: {
            Text("Team")
        }
        .pickerStyle(.segmented)
        .padding(.horizontal)
    }
}

/// A team's members, with what the team is as the header.
private struct TeamSection: View {
    let team: ContactGroup
    let members: [Person]

    var body: some View {
        Section {
            ForEach(members) { person in
                NavigationLink(value: person) {
                    PersonRow(person: person)
                }
            }
        } header: {
            if let summary = team.summary {
                Text(summary)
            }
        }
    }
}

#Preview {
    ContactView()
}
