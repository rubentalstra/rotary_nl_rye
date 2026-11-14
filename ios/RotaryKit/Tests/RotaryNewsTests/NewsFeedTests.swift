import Foundation
@testable import RotaryNews
import Testing

/// news.json as published on rotary.nl (last modified 2 October 2025).
@Suite struct NewsFeedTests {
    let items: [NewsItem]

    init() throws {
        let url = try #require(Bundle.module.url(forResource: "news", withExtension: "json", subdirectory: "Fixtures"))
        items = try NewsFeed.items(from: Data(contentsOf: url))
    }

    @Test func `All 17 items are read, newest first`() {
        #expect(items.count == 17)
        #expect(items.map(\.id) == Array((0...16).reversed()))
        #expect(items.first?.title == "Jaarverslag 2024-2025")
    }

    @Test func `Newsletters and reports are PDFs`() throws {
        #expect(items.filter(\.isPDF).count == 15)
        let report = try #require(items.first)
        #expect(report.content == .pdf(URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/jaarverslag-2024-2025.pdf")!))
    }

    @Test func `An article keeps its heading, paragraphs, images and video in order`() throws {
        let corona = try #require(items.first { $0.id == 3 })
        guard case .article(let blocks) = corona.content else {
            Issue.record("item 3 is no article")
            return
        }
        #expect(blocks.first == .heading("Belangrijke update inzake Rotary uitwisselingen"))
        #expect(blocks.filter { if case .paragraph = $0 { true } else { false } }.count == 4)
        #expect(blocks.last == .image(URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/news/rotary-youth-ex.png")!))

        let avenue = try #require(items.first { $0.id == 4 })
        guard case .article(let avenueBlocks) = avenue.content else {
            Issue.record("item 4 is no article")
            return
        }
        #expect(avenueBlocks.contains { if case .video = $0 { true } else { false } })
    }

    @Test func `An empty description is no summary`() throws {
        #expect(try #require(items.first).summary == nil)
        #expect(try #require(items.first { $0.id == 2 }).summary?.hasPrefix("NGSE") == true)
    }

    @Test func `Every item has a cover`() {
        #expect(items.allSatisfy { $0.coverURL != nil })
    }

    @Test func `A file that is not the news is unreadable`() {
        #expect(throws: NewsFeed.LoadError.unreadable) {
            try NewsFeed.items(from: Data("<html>".utf8))
        }
    }

    @Test func `An item without anything to open is left out`() throws {
        let json = #"{"news":[{"id":1,"title":"Empty","description":"","images":"","isPdf":"no","pdf":null}]}"#
        #expect(try NewsFeed.items(from: Data(json.utf8)).isEmpty)
    }
}
