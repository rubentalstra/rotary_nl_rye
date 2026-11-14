public import Foundation
public import RotaryCore

/// Where the camps come from: zomerkampen.xlsx on rotary.nl, kept by the
/// Short Term team, loaded through `CachedFetch`.
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
        let data: Data
        do {
            data = try await CachedFetch.data(for: URLRequest(url: url, timeoutInterval: 20), client: client)
        } catch {
            throw LoadError(error)
        }
        do {
            return CampSheet.camps(from: try Spreadsheet(data: data))
        } catch {
            throw .unreadable
        }
    }
}

extension CampFeed.LoadError {
    init(_ failure: CachedFetch.Failure) {
        switch failure {
        case .offline: self = .offline
        case .server(let status): self = .server(status: status)
        }
    }
}
