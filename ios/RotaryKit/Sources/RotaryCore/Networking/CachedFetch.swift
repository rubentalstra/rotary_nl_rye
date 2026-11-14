public import Foundation

/// How the app loads a file that changes now and then (the camps, the news,
/// the calendar): through the URL loading system's cache, so online it is
/// revalidated with the server and offline the last copy is used.
public enum CachedFetch {
    public enum Failure: Error, Equatable {
        /// No network and no copy from before.
        case offline
        /// The server answered with something other than the file.
        case server(status: Int)
    }

    /// The file at `request`'s URL: fresh when the network is there, the
    /// cached copy when it is not.
    public static func data(for request: URLRequest, client: any HTTPClient) async throws(Failure) -> Data {
        do {
            return try await fetch(request, policy: .reloadRevalidatingCacheData, client: client)
        } catch let failure as Failure {
            throw failure
        } catch {
            do {
                return try await fetch(request, policy: .returnCacheDataDontLoad, client: client)
            } catch {
                throw .offline
            }
        }
    }

    private static func fetch(_ request: URLRequest, policy: URLRequest.CachePolicy, client: any HTTPClient) async throws -> Data {
        var request = request
        request.cachePolicy = policy
        let (data, response) = try await client.data(for: request)
        if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
            throw Failure.server(status: http.statusCode)
        }
        return data
    }
}
