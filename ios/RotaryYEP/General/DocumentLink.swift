import QuickLook
import RotaryCore
import SwiftUI

/// A link to a document on the web. A PDF opens in Quick Look, the system's
/// own viewer (pages, search, Share, Save to Files, Markup), after a download
/// the URL cache keeps; anything else opens in the in-app browser.
struct DocumentLink<Label: View>: View {
    let url: URL
    @ViewBuilder let label: Label

    @State private var preview: URL?
    @State private var isDownloading = false
    @State private var failed = false

    init(_ url: URL, @ViewBuilder label: () -> Label) {
        self.url = url
        self.label = label()
    }

    private var isPDF: Bool {
        url.pathExtension.lowercased() == "pdf"
    }

    var body: some View {
        if isPDF {
            Button {
                Task { await open() }
            } label: {
                HStack {
                    label
                    Spacer()
                    if isDownloading {
                        ProgressView()
                    }
                }
            }
            .disabled(isDownloading)
            .quickLookPreview($preview)
            .alert("Document niet geopend", isPresented: $failed) {
                Button("OK", role: .cancel) {}
            } message: {
                Text("Het document kon niet worden geladen. Controleer je verbinding en probeer het opnieuw.")
            }
        } else {
            Link(destination: url) {
                label
            }
            .onOpenURL(prefersInApp: true)
        }
    }

    private func open() async {
        isDownloading = true
        defer { isDownloading = false }
        do {
            preview = try await RemoteDocument.download(url)
        } catch {
            failed = true
        }
    }
}
