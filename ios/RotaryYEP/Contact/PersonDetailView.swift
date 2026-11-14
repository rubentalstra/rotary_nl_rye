import RotaryCore
import SimpleIcons
import SimpleIconsSwiftUI
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
                        LabeledContent {
                            Text(verbatim: club)
                        } label: {
                            Label {
                                Text("Club")
                            } icon: {
                                RotaryWheelIcon()
                            }
                        }
                    }
                    if let district = person.district {
                        LabeledContent {
                            Text(verbatim: district)
                        } label: {
                            Label("District", systemImage: "map")
                        }
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

/// Photo, name, role and the quick actions, centred above the details. The
/// photo carries the badge of the person's organisation and opens full
/// screen when tapped, zooming in from where it is.
private struct PersonHeader: View {
    let person: Person
    @State private var showsPhoto = false
    @Namespace private var photo

    var body: some View {
        VStack(spacing: 12) {
            Button {
                showsPhoto = true
            } label: {
                PersonPhoto(url: person.photoURL, size: 120)
                    .overlay(alignment: .bottomTrailing) {
                        if let organisation = person.organisation {
                            OrganisationBadge(organisation: organisation, size: 40)
                        }
                    }
            }
            .buttonStyle(.plain)
            .disabled(person.photoURL == nil)
            .accessibilityLabel(Text("Foto van \(person.name.formatted())"))
            .accessibilityHint(Text("Toont de foto groot."))
            .matchedTransitionSource(id: "photo", in: photo)
            .fullScreenCover(isPresented: $showsPhoto) {
                if let url = person.photoURL {
                    PhotoViewer(url: url, name: person.name)
                        .navigationTransition(.zoom(sourceID: "photo", in: photo))
                }
            }
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
                    QuickAction("Bel", url: ContactLinks.call(phone)) {
                        Image(systemName: "phone.fill")
                    }
                    // A landline cannot receive a text or WhatsApp, so only a mobile number offers them.
                    if ContactLinks.isMobile(phone) {
                        QuickAction("Bericht", url: ContactLinks.message(phone)) {
                            Image(systemName: "message.fill")
                        }
                        QuickAction("WhatsApp", url: ContactLinks.whatsApp(phone)) {
                            // In WhatsApp's own green: the glass draws a plain shape too faint to read.
                            BrandIcon(.whatsapp(), relativeTo: .title3)
                                .foregroundStyle(Color(simpleIcon: .whatsapp()))
                        }
                    }
                }
                if let email = person.email {
                    QuickAction("Mail", url: ContactLinks.mail(email)) {
                        Image(systemName: "envelope.fill")
                    }
                }
            }
        }
    }
}

/// One quick action: an icon over its name, in a glass button.
private struct QuickAction<Icon: View>: View {
    let title: LocalizedStringKey
    let url: URL?
    @ViewBuilder let icon: Icon

    init(_ title: LocalizedStringKey, url: URL?, @ViewBuilder icon: () -> Icon) {
        self.title = title
        self.url = url
        self.icon = icon()
    }

    var body: some View {
        if let url {
            Link(destination: url) {
                VStack(spacing: 4) {
                    icon
                        .font(.title3)
                    Text(title)
                        .font(.caption)
                }
                .foregroundStyle(.primary)
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
                    LabeledContent {
                        Link(phone, destination: url)
                            .monospacedDigit()
                    } label: {
                        Label("Telefoon", systemImage: "phone")
                    }
                }
                if let email = person.email, let url = ContactLinks.mail(email) {
                    LabeledContent {
                        Link(email, destination: url)
                    } label: {
                        Label("E-mail", systemImage: "envelope")
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

/// The Rotary wheel in Rotary gold, sized like an SF Symbol in a label, and
/// growing with Dynamic Type as one does.
private struct RotaryWheelIcon: View {
    @ScaledMetric(relativeTo: .body) private var size = 22.0

    var body: some View {
        OrganisationLogo(organisation: .rotary)
            .frame(width: size, height: size)
            .accessibilityHidden(true)
    }
}
