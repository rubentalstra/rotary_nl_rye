import RotaryCore
import SwiftUI

/// Everything about one person, laid out as the Contacts app does: photo and
/// name, the ways to reach them, then their roles, club and own words.
struct PersonDetailView: View {
    let person: Person

    var body: some View {
        List {
            Section {
                PersonHeader(person: person)
                    .listRowBackground(Color.clear)
            }
            ReachSection(person: person)
            if person.roles.count > 1 {
                Section("Rollen") {
                    ForEach(person.roles, id: \.self) { role in
                        Text(role.title)
                    }
                }
            }
            if person.club != nil || person.district != nil {
                Section("Rotary") {
                    if let club = person.club {
                        LabeledContent("Club", value: club)
                    }
                    if let district = person.district {
                        LabeledContent("District", value: district)
                    }
                }
            }
            if let bio = person.bio {
                Section {
                    Text(bio)
                } header: {
                    Text("Over \(person.name.givenName ?? "")")
                }
            }
        }
        .navigationTitle(Text(person.name, format: .name(style: .medium)))
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// Photo, name, role and the quick actions, centred above the details.
private struct PersonHeader: View {
    let person: Person

    var body: some View {
        VStack(spacing: 12) {
            PersonPhoto(url: person.photoURL, size: 120)
            VStack(spacing: 4) {
                Text(person.name, format: .name(style: .medium))
                    .font(.title2.bold())
                Text(person.role.title)
                    .foregroundStyle(.secondary)
            }
            .multilineTextAlignment(.center)
            QuickActions(person: person)
        }
        .frame(maxWidth: .infinity)
    }
}

/// Call, message, WhatsApp and mail, as the Contacts app shows them under a name.
private struct QuickActions: View {
    let person: Person

    var body: some View {
        GlassEffectContainer {
            HStack(spacing: 12) {
                if let phone = person.phone {
                    QuickAction("Bel", systemImage: "phone.fill", url: ContactLinks.call(phone))
                    QuickAction("Bericht", systemImage: "message.fill", url: ContactLinks.message(phone))
                    QuickAction("WhatsApp", systemImage: "bubble.left.and.text.bubble.right.fill", url: ContactLinks.whatsApp(phone))
                }
                if let email = person.email {
                    QuickAction("Mail", systemImage: "envelope.fill", url: ContactLinks.mail(email))
                }
            }
        }
    }
}

private struct QuickAction: View {
    let title: LocalizedStringKey
    let systemImage: String
    let url: URL?

    init(_ title: LocalizedStringKey, systemImage: String, url: URL?) {
        self.title = title
        self.systemImage = systemImage
        self.url = url
    }

    var body: some View {
        if let url {
            Link(destination: url) {
                VStack(spacing: 4) {
                    Image(systemName: systemImage)
                        .font(.title3)
                    Text(title)
                        .font(.caption)
                }
                .frame(minWidth: 56)
            }
            .buttonStyle(.glass)
        }
    }
}

/// The phone number and email address, each a link the system opens.
private struct ReachSection: View {
    let person: Person

    var body: some View {
        if person.phone != nil || person.email != nil {
            Section {
                if let phone = person.phone, let url = ContactLinks.call(phone) {
                    LabeledContent("Telefoon") {
                        Link(phone, destination: url)
                    }
                }
                if let email = person.email, let url = ContactLinks.mail(email) {
                    LabeledContent("E-mail") {
                        Link(email, destination: url)
                    }
                }
            }
        }
    }
}

#Preview {
    NavigationStack {
        PersonDetailView(person: ContactGroup.mdjc.members[0])
    }
}
