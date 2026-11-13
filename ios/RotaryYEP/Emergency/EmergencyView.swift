import RotaryCore
import SwiftUI

/// The root of the Emergency tab: 112 first, then the people of Rotary Youth
/// Exchange and the independent confidants, each one tap from a call.
struct EmergencyView: View {
    var body: some View {
        NavigationStack {
            List {
                EmergencyServicesSection()
                ForEach(ContactGroup.emergencyGroups) { group in
                    Section {
                        ForEach(group.members) { person in
                            EmergencyRow(person: person)
                        }
                    } header: {
                        Text(group.name)
                    } footer: {
                        if let summary = group.summary {
                            Text(summary)
                        }
                    }
                }
                Section("Goed om te weten") {
                    Label("Houd het adres en telefoonnummer van je gastgezin altijd bij je.", systemImage: "house")
                    Label("Je gastouders helpen je bij een afspraak met de huisarts, het ziekenhuis of de tandarts.", systemImage: "cross.case")
                }
            }
            .navigationTitle(Text(AppTab.emergency.title))
        }
    }
}

/// 112: ambulance, fire brigade and police, the number that works everywhere in Europe.
private struct EmergencyServicesSection: View {
    var body: some View {
        Section {
            if let url = URL(string: "tel:112") {
                Link(destination: url) {
                    Label("Bel 112", systemImage: "phone.fill")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .tint(.red)
                .listRowBackground(Color.clear)
                .listRowInsets(EdgeInsets())
            }
        } footer: {
            Text("Ambulance, brandweer of politie, bij levensgevaar of een misdrijf dat nu gebeurt.")
        }
    }
}

/// A person to call, with mail as well when they have an address.
private struct EmergencyRow: View {
    let person: Person

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text(person.name, format: .name(style: .medium))
                Text(person.role.title)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            if let email = person.email, let url = ContactLinks.mail(email) {
                Link(destination: url) {
                    Image(systemName: "envelope.fill")
                }
                .accessibilityLabel(Text("Mail \(person.name.formatted())"))
            }
            if let phone = person.phone, let url = ContactLinks.call(phone) {
                Link(destination: url) {
                    Image(systemName: "phone.fill")
                }
                .accessibilityLabel(Text("Bel \(person.name.formatted())"))
            }
        }
        .buttonStyle(.borderless)
        .imageScale(.large)
    }
}

#Preview {
    EmergencyView()
}
