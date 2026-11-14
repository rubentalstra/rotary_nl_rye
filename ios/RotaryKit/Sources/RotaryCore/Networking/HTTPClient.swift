public import Foundation

/// The one way RotaryKit talks to the network, so tests can answer without it.
/// `URLSession` is the real client.
public protocol HTTPClient: Sendable {
    func data(for request: URLRequest) async throws -> (Data, URLResponse)
}

extension URLSession: HTTPClient {
    public func data(for request: URLRequest) async throws -> (Data, URLResponse) {
        try await data(for: request, delegate: nil)
    }
}
