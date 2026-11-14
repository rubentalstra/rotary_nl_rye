import Foundation
import RotaryCore
import Testing

/// Answers every request with the same data and status, or as if offline.
private struct FixedClient: HTTPClient {
    let data: Data?
    var status = 200

    func data(for request: URLRequest) async throws -> (Data, URLResponse) {
        guard let data else { throw URLError(.notConnectedToInternet) }
        return (data, HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: nil, headerFields: nil)!)
    }
}

@Suite struct RemoteDocumentTests {
    let url = URL(string: "https://www.rotary.nl/yep/camp-invitation.pdf")!

    @Test func `A document is saved as a file named as on the server`() async throws {
        let file = try await RemoteDocument.download(url, client: FixedClient(data: Data("%PDF-1.7".utf8)))
        #expect(file.lastPathComponent == "camp-invitation.pdf")
        #expect(try Data(contentsOf: file) == Data("%PDF-1.7".utf8))
    }

    @Test func `Offline without a cached copy says so`() async {
        await #expect(throws: RemoteDocument.DownloadError.offline) {
            try await RemoteDocument.download(url, client: FixedClient(data: nil))
        }
    }

    @Test func `A missing document is a server error`() async {
        await #expect(throws: RemoteDocument.DownloadError.server(status: 404)) {
            try await RemoteDocument.download(url, client: FixedClient(data: Data(), status: 404))
        }
    }
}
