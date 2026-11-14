public import Foundation

/// A document on the web (a PDF) that the system's viewers show from a file:
/// Quick Look needs a local copy. The download goes through the URL loading
/// system, so its cache serves a document opened before, offline too.
public enum RemoteDocument {
    public enum DownloadError: Error, Equatable {
        case offline
        case server(status: Int)
        case notSaved
    }

    /// The document saved as a file in the temporary folder, named as on the server.
    public static func download(_ url: URL, client: any HTTPClient = URLSession.shared) async throws(DownloadError) -> URL {
        let data = try await fetch(url, client: client)
        let folder = FileManager.default.temporaryDirectory.appending(path: "Documents", directoryHint: .isDirectory)
        let file = folder.appending(path: url.lastPathComponent.isEmpty ? "document.pdf" : url.lastPathComponent)
        do {
            try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
            try data.write(to: file, options: .atomic)
        } catch {
            throw .notSaved
        }
        return file
    }

    private static func fetch(_ url: URL, client: any HTTPClient) async throws(DownloadError) -> Data {
        for policy in [URLRequest.CachePolicy.useProtocolCachePolicy, .returnCacheDataDontLoad] {
            do {
                let (data, response) = try await client.data(for: URLRequest(url: url, cachePolicy: policy, timeoutInterval: 30))
                if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
                    throw DownloadError.server(status: http.statusCode)
                }
                return data
            } catch let error as DownloadError {
                throw error
            } catch {
                continue
            }
        }
        throw .offline
    }
}
