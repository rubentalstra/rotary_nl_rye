import RotaryCore
import SwiftUI

/// The root of the Contact tab: the teams of Rotary Youth Exchange
/// Netherlands, searchable by name, role and club.
struct ContactView: View {
    @State private var query = ""

    var body: some View {
        NavigationStack {
            List {
                ForEach(ContactGroup.teams) { team in
                    TeamSection(team: team, query: query)
                }
            }
            .overlay {
                if ContactGroup.teams.allSatisfy({ $0.members(matching: query).isEmpty }) {
                    ContentUnavailableView.search(text: query)
                }
            }
            .searchable(text: $query, prompt: Text("Naam, rol of club"))
            .navigationTitle(Text(AppTab.contact.title))
            .navigationDestination(for: Person.self) { person in
                PersonDetailView(person: person)
            }
        }
    }
}

/// One team, with only the members that match the search.
private struct TeamSection: View {
    let team: ContactGroup
    let query: String

    var body: some View {
        let members = team.members(matching: query)
        if !members.isEmpty {
            Section {
                ForEach(members) { person in
                    NavigationLink(value: person) {
                        PersonRow(person: person)
                    }
                }
            } header: {
                Text(team.name)
            } footer: {
                if let summary = team.summary {
                    Text(summary)
                }
            }
        }
    }
}

#Preview {
    ContactView()
}
