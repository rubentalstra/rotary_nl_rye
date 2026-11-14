public import Foundation

/// A page of information for students: sections of text, points, facts,
/// numbered steps, questions and a mail address. The text is the v13 app's,
/// in the language it was written in (Dutch for outbounds, English for
/// inbounds), and is not translated.
public struct GuideSection: Identifiable, Sendable {
    public let title: LocalizedStringResource?
    public let items: [GuideItem]

    public init(_ title: LocalizedStringResource? = nil, _ items: [GuideItem]) {
        self.title = title
        self.items = items
    }

    public var id: String { title?.key ?? items.first?.id ?? "" }
}

/// One piece of a guide's section.
public enum GuideItem: Identifiable, Sendable {
    /// A paragraph.
    case text(LocalizedStringResource)
    /// A symbol with a title, a text or both.
    case point(systemImage: String, title: LocalizedStringResource?, text: LocalizedStringResource?)
    /// A labelled value, such as an age.
    case fact(systemImage: String, title: LocalizedStringResource, value: LocalizedStringResource)
    /// A numbered step or tip; the number is its place in the section.
    case step(title: LocalizedStringResource?, text: LocalizedStringResource?)
    /// A question, as asked at the selection day.
    case question(LocalizedStringResource)
    /// A remark in smaller type.
    case note(LocalizedStringResource)
    /// An address to mail, with a subject filled in.
    case mail(address: String, subject: String?)

    public var id: String {
        switch self {
        case .text(let text), .question(let text), .note(let text): text.key
        case .point(_, let title, let text): (title ?? text)?.key ?? ""
        case .fact(_, let title, _): title.key
        case .step(let title, let text): (text ?? title)?.key ?? ""
        case .mail(let address, _): address
        }
    }
}
