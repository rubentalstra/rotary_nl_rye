public import Foundation
public import RotaryCore

/// The news: news.json on rotary.nl, loaded through `CachedFetch` and
/// decoded with `JSONDecoder`, newest first.
public struct NewsFeed: Sendable {
    public static let url = URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/news.json")!

    public enum LoadError: Error, Equatable {
        case offline
        case server(status: Int)
        /// The file came, but it is not the news the app can read.
        case unreadable
    }

    private let client: any HTTPClient
    private let url: URL

    public init(client: any HTTPClient = URLSession.shared, url: URL = NewsFeed.url) {
        self.client = client
        self.url = url
    }

    /// Every item, newest first.
    public func items() async throws(LoadError) -> [NewsItem] {
        let data: Data
        do {
            data = try await CachedFetch.data(for: URLRequest(url: url, timeoutInterval: 20), client: client)
        } catch {
            throw LoadError(error)
        }
        return try Self.items(from: data)
    }

    /// The items in a news.json file, newest first. An item that is neither a
    /// PDF nor an article with text is left out: there would be nothing to open.
    static func items(from data: Data) throws(LoadError) -> [NewsItem] {
        let file: NewsFile
        do {
            file = try JSONDecoder().decode(NewsFile.self, from: data)
        } catch {
            throw .unreadable
        }
        return file.news.compactMap(\.item).sorted { $0.id > $1.id }
    }
}

// MARK: - The file as published

/// news.json: `{ "news": [ … ] }`.
private struct NewsFile: Decodable {
    let news: [RawItem]
}

/// An item as rotary.nl writes it: `isPdf` is "yes" or "no", `images` one
/// cover URL, `pdf` a URL or null, and an article's `text` a list of blocks
/// with a `heading` or a `body` of paragraphs, images and videos.
private struct RawItem: Decodable {
    let id: Int
    let title: String
    let description: String?
    let images: String?
    let isPdf: String?
    let pdf: String?
    let text: [RawBlock]?

    struct RawBlock: Decodable {
        let heading: String?
        let body: [RawBody]?
    }

    struct RawBody: Decodable {
        let paragraph: [String]?
        let imageUrl: String?
        let videoUrl: String?
    }

    var item: NewsItem? {
        let title = title.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !title.isEmpty else { return nil }
        let content: NewsItem.Content
        if isPdf?.lowercased() == "yes", let pdf = link(pdf) {
            content = .pdf(pdf)
        } else {
            let blocks = articleBlocks
            guard !blocks.isEmpty else { return nil }
            content = .article(blocks)
        }
        let summary = description?.trimmingCharacters(in: .whitespacesAndNewlines)
        return NewsItem(id: id, title: title, summary: summary?.isEmpty == false ? summary : nil, coverURL: link(images), content: content)
    }

    private var articleBlocks: [NewsItem.ArticleBlock] {
        (text ?? []).flatMap { block -> [NewsItem.ArticleBlock] in
            var blocks: [NewsItem.ArticleBlock] = []
            if let heading = block.heading?.trimmingCharacters(in: .whitespacesAndNewlines), !heading.isEmpty {
                blocks.append(.heading(heading))
            }
            for body in block.body ?? [] {
                for paragraph in body.paragraph ?? [] {
                    let paragraph = paragraph.trimmingCharacters(in: .whitespacesAndNewlines)
                    if !paragraph.isEmpty { blocks.append(.paragraph(paragraph)) }
                }
                if let image = link(body.imageUrl) { blocks.append(.image(image)) }
                if let video = link(body.videoUrl) { blocks.append(.video(video)) }
            }
            return blocks
        }
    }

    private func link(_ text: String?) -> URL? {
        guard let text = text?.trimmingCharacters(in: .whitespaces), let url = URL(string: text),
              url.scheme?.lowercased() == "https" || url.scheme?.lowercased() == "http"
        else { return nil }
        return url
    }
}

extension NewsFeed.LoadError {
    init(_ failure: CachedFetch.Failure) {
        switch failure {
        case .offline: self = .offline
        case .server(let status): self = .server(status: status)
        }
    }
}
