import RotaryCore
import SimpleIcons
import SwiftUI
import UIKit

/// The root of the Settings tab: the app's language, reviewing the app, its
/// legal pages and which version this is; sharing the app is the toolbar's
/// action.
struct SettingsView: View {
    var body: some View {
        NavigationStack {
            Form {
                LanguageSection()
                AppSection()
                LegalSection()
                AboutAppSection()
            }
            .navigationTitle(Text(AppTab.settings.title))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    ShareLink(
                        item: AppIdentity.appStoreURL,
                        subject: Text(verbatim: "Rotary YEP NL"),
                        message: Text("De app van Rotary Youth Exchange Nederland.")
                    ) {
                        Label("Deel de app", systemImage: "square.and.arrow.up")
                    }
                    .help(Text("Deel de app"))
                }
            }
        }
    }
}

/// Opens the app's page in iOS Settings, where its language is chosen. The
/// app has no picker of its own: iOS keeps a language per app.
private struct LanguageSection: View {
    @Environment(\.openURL) private var openURL

    var body: some View {
        Section {
            Button {
                if let url = URL(string: UIApplication.openSettingsURLString) {
                    openURL(url)
                }
            } label: {
                LabeledContent {
                    Image(systemName: "arrow.up.forward.app")
                        .foregroundStyle(.secondary)
                        .accessibilityHidden(true)
                } label: {
                    Label("Taal", systemImage: "globe")
                }
            }
            .foregroundStyle(.primary)
        } footer: {
            Text("De app volgt de taal van je iPhone. Kies een andere taal voor alleen deze app in Instellingen.")
        }
    }
}

/// Reviewing the app and ROTEX on Instagram.
private struct AppSection: View {
    var body: some View {
        Section {
            Link(destination: AppIdentity.writeReviewURL) {
                Label("Beoordeel de app", systemImage: "star")
            }
            Link(destination: AppIdentity.instagramURL) {
                LabeledContent {
                    Text(verbatim: "@rotexnederland")
                } label: {
                    Label {
                        Text("ROTEX op Instagram")
                    } icon: {
                        BrandIcon(.instagram())
                    }
                }
            }
        }
    }
}

/// The privacy policy and terms, read in the app.
private struct LegalSection: View {
    var body: some View {
        Section {
            Link(destination: AppIdentity.privacyPolicyURL) {
                Label("Privacybeleid", systemImage: "hand.raised")
            }
            Link(destination: AppIdentity.termsURL) {
                Label("Algemene voorwaarden", systemImage: "doc.text")
            }
            NavigationLink {
                LicensesView()
            } label: {
                Label("Licenties", systemImage: "text.badge.checkmark")
            }
        }
        .onOpenURL(prefersInApp: true)
    }
}

/// Which version is running.
private struct AboutAppSection: View {
    var body: some View {
        Section {
            LabeledContent("Versie", value: Bundle.main.versionDescription)
        } footer: {
            Text(verbatim: "Rotary Youth Exchange Nederland")
                .frame(maxWidth: .infinity)
                .padding(.top)
        }
    }
}

private extension Bundle {
    /// "14.0.0 (3)": the version and the build number, as Settings shows them.
    var versionDescription: String {
        let version = object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? ""
        let build = object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? ""
        return "\(version) (\(build))"
    }
}

#Preview {
    SettingsView()
}
