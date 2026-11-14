import SwiftUI

/// The open-source software in the app, with its licence text as the licence
/// asks: each text is the package's own file, copied verbatim into
/// `Settings/Licenses/`.
struct LicensesView: View {
    var body: some View {
        List(License.all) { license in
            NavigationLink {
                LicenseTextView(license: license)
            } label: {
                VStack(alignment: .leading, spacing: 2) {
                    Text(verbatim: license.name)
                    Text(license.summary)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .navigationTitle(Text("Licenties"))
    }
}

/// One package's licence, in full.
private struct LicenseTextView: View {
    let license: License
    @State private var text = ""

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(license.summary)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text(verbatim: text)
                    .font(.footnote.monospaced())
                    .textSelection(.enabled)
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .navigationTitle(Text(verbatim: license.name))
        .navigationBarTitleDisplayMode(.inline)
        .task {
            text = license.text
        }
    }
}

/// A package the app contains and its licence file.
nonisolated struct License: Identifiable, Sendable {
    let name: String
    let summary: LocalizedStringResource
    /// The licence file's name in the app bundle, without `.txt`.
    let file: String

    var id: String { name }

    var text: String {
        guard let url = Bundle.main.url(forResource: file, withExtension: "txt"),
              let text = try? String(contentsOf: url, encoding: .utf8)
        else { return "" }
        return text
    }

    static let all: [License] = [
        License(
            name: "simple-icons-swift",
            summary: "MIT. De merklogo's komen van Simple Icons (CC0); de merken zijn van hun eigenaren.",
            file: "simple-icons-swift-LICENSE"
        ),
    ]
}

#Preview {
    NavigationStack {
        LicensesView()
    }
}
