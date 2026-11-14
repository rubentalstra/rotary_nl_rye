public import Foundation
public import RotaryCore

/// Where the camps come from: zomerkampen.xlsx on rotary.nl, kept by the
/// Short Term team. Loaded through the URL loading system's cache: a fresh
/// copy when the network is there (revalidated with the server's
/// Last-Modified), the last copy when it is not.
public struct CampFeed: Sendable {
    public static let url = URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/outbounds/camps-and-tours/zomerkampen.xlsx")!

    public enum LoadError: Error, Equatable {
        /// No network and no copy from before.
        case offline
        /// The server answered with something other than the file.
        case server(status: Int)
        /// The file came, but it is not a spreadsheet the app can read.
        case unreadable
    }

    private let client: any HTTPClient
    private let url: URL

    public init(client: any HTTPClient = URLSession.shared, url: URL = CampFeed.url) {
        self.client = client
        self.url = url
    }

    /// Every camp in the sheet, by start date.
    public func camps() async throws(LoadError) -> [Camp] {
        let data = try await download()
        do {
            return CampSheet.camps(from: try Spreadsheet(data: data))
        } catch {
            throw .unreadable
        }
    }

    private func download() async throws(LoadError) -> Data {
        do {
            return try await fetch(.reloadRevalidatingCacheData)
        } catch let error as LoadError {
            throw error
        } catch {
            // No network: the copy the cache kept from the last time, if any.
            do {
                return try await fetch(.returnCacheDataDontLoad)
            } catch {
                throw .offline
            }
        }
    }

    private func fetch(_ policy: URLRequest.CachePolicy) async throws -> Data {
        let request = URLRequest(url: url, cachePolicy: policy, timeoutInterval: 20)
        let (data, response) = try await client.data(for: request)
        if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
            throw LoadError.server(status: http.statusCode)
        }
        return data
    }
}
