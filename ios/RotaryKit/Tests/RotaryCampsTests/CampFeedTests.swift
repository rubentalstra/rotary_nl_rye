import Foundation
import RotaryCamps
import RotaryCore
import Synchronization
import Testing

/// An HTTP client that answers from a script instead of the network.
final class ScriptedClient: HTTPClient {
    enum Answer: Sendable {
        case file(Data, status: Int)
        case noNetwork
    }

    private let answers: Mutex<[URLRequest.CachePolicy: Answer]>
    let policies = Mutex<[URLRequest.CachePolicy]>([])

    init(_ answers: [URLRequest.CachePolicy: Answer]) {
        self.answers = Mutex(answers)
    }

    func data(for request: URLRequest) async throws -> (Data, URLResponse) {
        policies.withLock { $0.append(request.cachePolicy) }
        switch answers.withLock({ $0[request.cachePolicy] }) {
        case .file(let data, let status):
            return (data, HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: nil, headerFields: nil)!)
        case .noNetwork, nil:
            throw URLError(.notConnectedToInternet)
        }
    }
}

@Suite struct CampFeedTests {
    let file: Data

    init() throws {
        let url = try #require(Bundle.module.url(forResource: "zomerkampen", withExtension: "xlsx", subdirectory: "Fixtures"))
        file = try Data(contentsOf: url)
    }

    @Test func `Online, the file is revalidated and read`() async throws {
        let client = ScriptedClient([.reloadRevalidatingCacheData: .file(file, status: 200)])
        let camps = try await CampFeed(client: client).camps()
        #expect(camps.count == 74)
        #expect(client.policies.withLock { $0 } == [.reloadRevalidatingCacheData])
    }

    @Test func `Offline, the cached copy is used`() async throws {
        let client = ScriptedClient([.reloadRevalidatingCacheData: .noNetwork, .returnCacheDataDontLoad: .file(file, status: 200)])
        let camps = try await CampFeed(client: client).camps()
        #expect(camps.count == 74)
    }

    @Test func `Offline without a copy says so`() async {
        let client = ScriptedClient([:])
        await #expect(throws: CampFeed.LoadError.offline) {
            try await CampFeed(client: client).camps()
        }
    }

    @Test func `A server error is not read as a file`() async {
        let client = ScriptedClient([.reloadRevalidatingCacheData: .file(Data(), status: 404)])
        await #expect(throws: CampFeed.LoadError.server(status: 404)) {
            try await CampFeed(client: client).camps()
        }
    }

    @Test func `A page that is no spreadsheet is unreadable`() async {
        let client = ScriptedClient([.reloadRevalidatingCacheData: .file(Data("<html>".utf8), status: 200)])
        await #expect(throws: CampFeed.LoadError.unreadable) {
            try await CampFeed(client: client).camps()
        }
    }
}
