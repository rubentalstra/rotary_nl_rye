import RotaryCore
import SwiftUI

/// For Rotary clubs that host a student: a welcome, what hosting means, and
/// the documents per role, each opening in Quick Look. A search narrows the
/// topics and documents by title.
struct RotaryClubsView: View {
    @State private var query = ""

    var body: some View {
        List {
            if query.isEmpty {
                Section {
                    Introduction()
                }
            }
            TopicsSection(topics: ClubTopic.allCases.filter { matches($0.title) })
            ForEach(ClubGuide.allCases) { guide in
                GuideSection(guide: guide, documents: guide.documents.filter { matches($0.title) })
            }
        }
        .overlay {
            if !query.isEmpty, ClubTopic.allCases.allSatisfy({ !matches($0.title) }), ClubDocument.allCases.allSatisfy({ !matches($0.title) }) {
                ContentUnavailableView.search(text: query)
            }
        }
        .searchable(text: $query, prompt: Text("Onderwerp of document"))
        .navigationTitle(Text("Voor Rotary-clubs"))
        .navigationDestination(for: ClubTopic.self) { topic in
            ClubTopicView(topic: topic)
        }
    }

    /// Whether a title matches the search, in the app's language.
    private func matches(_ title: LocalizedStringResource) -> Bool {
        query.isEmpty || String(localized: title).localizedStandardContains(query)
    }
}

/// The Rotary wheel and the welcome.
private struct Introduction: View {
    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            OrganisationLogo(organisation: .rotary)
                .frame(width: 40, height: 40)
                .accessibilityHidden(true)
            Text(ClubTopic.introduction)
                .font(.subheadline)
        }
        .padding(.vertical, 4)
    }
}

/// What a club should know, each topic opening its text.
private struct TopicsSection: View {
    let topics: [ClubTopic]

    var body: some View {
        if !topics.isEmpty {
            Section("Algemene informatie") {
                ForEach(topics) { topic in
                    NavigationLink(value: topic) {
                        Label {
                            Text(topic.title)
                        } icon: {
                            Image(systemName: topic.systemImage)
                                .foregroundStyle(.tint)
                        }
                    }
                }
            }
        }
    }
}

/// One role's documents, each opening in Quick Look.
private struct GuideSection: View {
    let guide: ClubGuide
    let documents: [ClubDocument]

    var body: some View {
        if !documents.isEmpty {
            Section {
                ForEach(documents) { document in
                    DocumentLink(document.url) {
                        Label {
                            Text(document.title)
                                .foregroundStyle(.primary)
                        } icon: {
                            Image(systemName: document.systemImage)
                                .foregroundStyle(.tint)
                        }
                    }
                }
            } header: {
                Text(guide.title)
            } footer: {
                Text(guide.summary)
            }
        }
    }
}

/// One topic's text, to read.
struct ClubTopicView: View {
    let topic: ClubTopic

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                ForEach(topic.paragraphs, id: \.key) { paragraph in
                    Text(paragraph)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
        }
        .navigationTitle(Text(topic.title))
        .navigationBarTitleDisplayMode(.large)
    }
}

#Preview {
    NavigationStack {
        RotaryClubsView()
    }
}
