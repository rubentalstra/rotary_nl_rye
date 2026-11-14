import RotaryCore
import SwiftUI

/// For Rotary clubs that host a student: the welcome and what hosting means
/// on this page, and a page per role with its documents. A search finds a
/// topic or a document across every role.
struct RotaryClubsView: View {
    @State private var query = ""

    var body: some View {
        List {
            if query.isEmpty {
                Section {
                    Introduction()
                }
                TopicsSection(topics: ClubTopic.allCases)
                GuidesSection()
            } else {
                SearchResults(query: query)
            }
        }
        .searchable(text: $query, prompt: Text("Onderwerp of document"))
        .navigationTitle(Text("Voor Rotary-clubs"))
        .navigationDestination(for: ClubTopic.self) { topic in
            ClubTopicView(topic: topic)
        }
        .navigationDestination(for: ClubGuide.self) { guide in
            ClubGuideView(guide: guide)
        }
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

/// A row per role, each opening its page of documents.
private struct GuidesSection: View {
    var body: some View {
        Section("Documenten") {
            ForEach(ClubGuide.allCases) { guide in
                NavigationLink(value: guide) {
                    Label {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(guide.title)
                            Text(guide.summary)
                                .font(.footnote)
                                .foregroundStyle(.secondary)
                        }
                    } icon: {
                        Image(systemName: guide.systemImage)
                            .foregroundStyle(.tint)
                    }
                }
            }
        }
    }
}

/// The topics and documents whose title matches the search; a document in
/// several roles shows once.
private struct SearchResults: View {
    let query: String

    private func matches(_ title: LocalizedStringResource) -> Bool {
        String(localized: title).localizedStandardContains(query)
    }

    var body: some View {
        let topics = ClubTopic.allCases.filter { matches($0.title) }
        let documents = ClubDocument.allCases.filter { matches($0.title) }
        if topics.isEmpty, documents.isEmpty {
            ContentUnavailableView.search(text: query)
                .listRowBackground(Color.clear)
        }
        TopicsSection(topics: topics)
        if !documents.isEmpty {
            Section("Documenten") {
                ForEach(documents) { document in
                    DocumentRow(document: document)
                }
            }
        }
    }
}

/// One role's page: what it is for, and its documents.
struct ClubGuideView: View {
    let guide: ClubGuide

    var body: some View {
        List {
            Section {
                ForEach(guide.documents) { document in
                    DocumentRow(document: document)
                }
            } header: {
                Text(guide.summary)
                    .textCase(nil)
            }
        }
        .navigationTitle(Text(guide.title))
    }
}

/// A document, opening in Quick Look.
private struct DocumentRow: View {
    let document: ClubDocument

    var body: some View {
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
