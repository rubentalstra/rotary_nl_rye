import Foundation
import Observation
import RotaryNews

/// The news screen's state: loading news.json and the items, newest first.
@Observable
final class NewsModel {
    enum State: Equatable {
        case loading
        case loaded
        case failed(NewsFeed.LoadError)
    }

    private(set) var state: State = .loading
    private(set) var items: [NewsItem] = []

    @ObservationIgnored private let feed: NewsFeed
    @ObservationIgnored private var loadTask: Task<Void, Never>?

    init(feed: NewsFeed = NewsFeed()) {
        self.feed = feed
    }

    /// The newest item, shown large at the top.
    var latest: NewsItem? { items.first }

    /// Everything before the newest item.
    var earlier: ArraySlice<NewsItem> { items.dropFirst() }

    /// Loads the news once; a second call while loading does nothing.
    func startLoading() {
        guard loadTask == nil, items.isEmpty else { return }
        loadTask = Task {
            defer { loadTask = nil }
            await load()
        }
    }

    /// Loads the news again, for pull to refresh.
    func load() async {
        do {
            items = try await feed.items()
            state = .loaded
        } catch {
            state = items.isEmpty ? .failed(error) : .loaded
        }
    }
}
