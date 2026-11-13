import SwiftUI
import UIKit

/// The root of the Settings tab. The app's language is the iOS per-app
/// language (Settings, Rotary YEP NL, Language), so the app has no picker of
/// its own; this row opens that page.
struct SettingsView: View {
    var body: some View {
        NavigationStack {
            Form {
                LanguageSection()
            }
            .navigationTitle(Text(AppTab.settings.title))
        }
    }
}

/// Opens the app's page in iOS Settings, where its language is chosen.
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

#Preview {
    SettingsView()
}
