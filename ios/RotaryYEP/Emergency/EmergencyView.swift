import RotaryCore
import SwiftUI

/// The root of the Emergency tab: 112 first, then the people of Rotary Youth
/// Exchange and the independent confidants, each with their number and a call
/// and mail button. A red glow behind the title marks it as the emergency tab,
/// as Health and Fitness tint the top of their screens.
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
            .scrollContentBackground(.hidden)
            .background {
                EmergencyBackground()
            }
            .navigationTitle(Text(AppTab.emergency.title))
        }
    }
}

/// The grouped background with a red glow that fades out under the title.
private struct EmergencyBackground: View {
    var body: some View {
        ZStack(alignment: .top) {
            Color(.systemGroupedBackground)
            LinearGradient(colors: [.red.opacity(0.45), .red.opacity(0)], startPoint: .top, endPoint: .bottom)
                .frame(height: 360)
        }
        .ignoresSafeArea()
    }
}

/// 112 with the national campaign image "112, als elke seconde telt".
private struct EmergencyServicesSection: View {
    var body: some View {
        Section {
            VStack(spacing: 12) {
                Image(.emergency112)
                    .resizable()
                    .scaledToFit()
                    .accessibilityLabel(Text("112, als elke seconde telt"))
                Text("Ambulance, brandweer of politie, bij levensgevaar of een misdrijf dat nu gebeurt.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }
            .padding(.vertical, 8)
            // The image is drawn on white; the card stays white in dark mode, so it never shows an edge.
            .listRowBackground(Color.white)
            .environment(\.colorScheme, .light)
        }
    }
}

/// A person with their role and number, and round buttons to call and mail.
private struct EmergencyRow: View {
    let person: Person

    var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(person.name, format: .name(style: .medium))
                    .font(.headline)
                Text(person.role.title)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                if let phone = person.phone {
                    Text(verbatim: phone)
                        .font(.subheadline)
                        .monospacedDigit()
                        .foregroundStyle(.secondary)
                }
            }
            Spacer(minLength: 0)
            if let email = person.email, let url = ContactLinks.mail(email) {
                RoundAction(systemImage: "envelope.fill", url: url)
                    .accessibilityLabel(Text("Mail \(person.name.formatted())"))
            }
            if let phone = person.phone, let url = ContactLinks.call(phone) {
                RoundAction(systemImage: "phone.fill", url: url)
                    .accessibilityLabel(Text("Bel \(person.name.formatted())"))
            }
        }
        // Two buttons in one row: each is its own tap target.
        .buttonStyle(.borderless)
        .padding(.vertical, 2)
    }
}

/// A round button that opens a link, as the Contacts app's quick actions.
private struct RoundAction: View {
    let systemImage: String
    let url: URL

    var body: some View {
        Link(destination: url) {
            Image(systemName: systemImage)
                .font(.body)
                .frame(width: 24, height: 24)
        }
        .buttonStyle(.bordered)
        .buttonBorderShape(.circle)
    }
}

#Preview {
    EmergencyView()
}
