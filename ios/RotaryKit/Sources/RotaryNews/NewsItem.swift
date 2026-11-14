public import Foundation

/// A news item of Rotary Youth Exchange Netherlands: most are a newsletter
/// or report as a PDF, a few an article with text, images and video.
public struct NewsItem: Identifiable, Hashable, Sendable {
    /// The number rotary.nl gives each item; a newer item has a higher one.
    public let id: Int
    public let title: String
    /// One or two sentences about the item, when the feed gives them.
    public let summary: String?
    /// The cover: usually a wide banner with the title in it.
    public let coverURL: URL?
    public let content: Content

    public enum Content: Hashable, Sendable {
        /// A newsletter, report or flyer to read in the system's PDF viewer.
        case pdf(URL)
        /// An article in the app.
        case article([ArticleBlock])
    }

    /// A part of an article, in order.
    public enum ArticleBlock: Hashable, Sendable {
        case heading(String)
        case paragraph(String)
        case image(URL)
        case video(URL)
    }

    public init(id: Int, title: String, summary: String? = nil, coverURL: URL? = nil, content: Content) {
        self.id = id
        self.title = title
        self.summary = summary
        self.coverURL = coverURL
        self.content = content
    }

    /// Whether the item opens as a PDF.
    public var isPDF: Bool {
        if case .pdf = content { true } else { false }
    }
}
