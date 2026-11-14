import RotaryCore
import RotaryNews
import SwiftUI

/// The news of Rotary Youth Exchange Netherlands: the newest item large at
/// the top, the rest below it. A newsletter opens in Quick Look, an article
/// in the app.
struct NewsView: View {
    @State private var model = NewsModel()

    var body: some View {
        content
            .navigationTitle(Text("Nieuws"))
            .navigationDestination(for: NewsItem.self) { item in
                ArticleView(item: item)
            }
            .task {
                model.startLoading()
            }
    }

    @ViewBuilder private var content: some View {
        switch model.state {
        case .loading where model.items.isEmpty:
            ProgressView("Nieuws laden…")
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        case .failed(let error):
            ContentUnavailableView {
                Label(error == .offline ? "Geen verbinding" : "Nieuws niet beschikbaar", systemImage: error == .offline ? "wifi.slash" : "exclamationmark.triangle")
            } description: {
                Text(error == .offline ? "Maak verbinding met internet om het nieuws te laden." : "Het nieuws kon niet worden gelezen. Probeer het later opnieuw.")
            } actions: {
                Button("Probeer opnieuw") {
                    Task { await model.load() }
                }
                .buttonStyle(.borderedProminent)
            }
        default:
            NewsList(model: model)
        }
    }
}

/// The newest item as a large card, then the earlier items as rows.
private struct NewsList: View {
    let model: NewsModel

    var body: some View {
        List {
            if let latest = model.latest {
                Section {
                    NewsLink(item: latest) {
                        LatestNewsCard(item: latest)
                    }
                } header: {
                    Text("Nieuwste")
                }
            }
            if !model.earlier.isEmpty {
                Section("Eerder") {
                    ForEach(model.earlier) { item in
                        NewsLink(item: item) {
                            NewsRow(item: item)
                        }
                    }
                }
            }
        }
        .refreshable {
            await model.load()
        }
    }
}

/// Opens an item: a PDF in Quick Look, an article on its own page.
private struct NewsLink<Label: View>: View {
    let item: NewsItem
    @ViewBuilder let label: Label

    var body: some View {
        switch item.content {
        case .pdf(let url):
            DocumentLink(url) {
                label
            }
            .foregroundStyle(.primary)
        case .article:
            NavigationLink(value: item) {
                label
            }
        }
    }
}

/// The newest item: its cover whole, then the title and what it is.
private struct LatestNewsCard: View {
    let item: NewsItem

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            NewsCover(url: item.coverURL)
                .frame(maxHeight: 180)
            VStack(alignment: .leading, spacing: 4) {
                Text(item.title)
                    .font(.title3.bold())
                if let summary = item.summary {
                    Text(summary)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .lineLimit(3)
                }
                NewsKind(item: item)
            }
        }
        .padding(.vertical, 6)
    }
}

/// An earlier item: a small cover, the title and what it is.
private struct NewsRow: View {
    let item: NewsItem

    var body: some View {
        HStack(spacing: 14) {
            NewsCover(url: item.coverURL)
                .frame(width: 96, height: 56)
            VStack(alignment: .leading, spacing: 4) {
                Text(item.title)
                    .font(.headline)
                NewsKind(item: item)
            }
        }
        .padding(.vertical, 2)
    }
}

/// "PDF" or "Artikel", with a symbol.
private struct NewsKind: View {
    let item: NewsItem

    var body: some View {
        Label(item.isPDF ? "PDF" : "Artikel", systemImage: item.isPDF ? "doc.richtext" : "text.alignleft")
            .font(.footnote)
            .foregroundStyle(.secondary)
            .labelStyle(.titleAndIcon)
            .imageScale(.small)
    }
}

/// A cover whole on a white card: covers are banners with the title in them
/// on white, so they are never cropped. The Rotary wheel while it loads or
/// when it is missing.
struct NewsCover: View {
    let url: URL?

    var body: some View {
        AsyncImage(url: url) { phase in
            if let image = phase.image {
                image.resizable().scaledToFit()
            } else {
                OrganisationLogo(organisation: .rotary)
                    .padding(8)
                    .opacity(phase.error == nil ? 0.3 : 0.6)
            }
        }
        .padding(6)
        .frame(maxWidth: .infinity)
        .background(.white, in: .rect(cornerRadius: 12))
        .overlay {
            RoundedRectangle(cornerRadius: 12).strokeBorder(.separator)
        }
        .accessibilityHidden(true)
    }
}

#Preview {
    NavigationStack {
        NewsView()
    }
}
