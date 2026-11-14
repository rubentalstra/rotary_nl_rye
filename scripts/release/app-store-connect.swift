// scripts/release/app-store-connect.swift: what the release lane asks of
// the App Store Connect API, with the same API key that signs and uploads.
//
//   swift app-store-connect.swift text NOTES_FILE
//       Prints the notes as they will read in App Store Connect; needs no key.
//   swift app-store-connect.swift next-build-number
//       Prints a build number higher than every build of the app (and than
//       122, the React Native app's last), for the next upload.
//   swift app-store-connect.swift notes VERSION BUILD NOTES_FILE [--app-store]
//       Waits until the build is processed, then sets its TestFlight
//       "What to Test" to the notes. With --app-store (a final version) it
//       also makes sure the App Store version VERSION exists, picks this
//       build for it, and sets its "What's New" in every language. It never
//       submits anything for review.
//
// Environment: ASC_KEY_FILE (the .p8), ASC_KEY_ID, ASC_ISSUER_ID.
// The notes are the changelog's list: "- " items become "• ", continuation
// lines join their item, and issue references "(#12)" are left out.

import CryptoKit
import Foundation

/// The app's Apple ID in App Store Connect (AppIdentity.appStoreID).
let appID = "1567096118"
/// The React Native app's last build number.
let lastLegacyBuild = 122

// MARK: - Errors

struct Failure: Error, CustomStringConvertible {
    let description: String
}

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data("app-store-connect: \(message)\n".utf8))
    exit(1)
}

// MARK: - The API

struct Client {
    let keyID: String
    let issuerID: String
    let key: P256.Signing.PrivateKey

    init() {
        let environment = ProcessInfo.processInfo.environment
        guard let path = environment["ASC_KEY_FILE"], let keyID = environment["ASC_KEY_ID"], let issuerID = environment["ASC_ISSUER_ID"] else {
            fail("ASC_KEY_FILE, ASC_KEY_ID and ASC_ISSUER_ID must be set")
        }
        guard let pem = try? String(contentsOfFile: path, encoding: .utf8), let key = try? P256.Signing.PrivateKey(pemRepresentation: pem) else {
            fail("\(path) is no App Store Connect API key (.p8)")
        }
        self.keyID = keyID
        self.issuerID = issuerID
        self.key = key
    }

    /// A token for twenty minutes, as the API asks: ES256 over header and claims.
    func token() throws -> String {
        let now = Int(Date().timeIntervalSince1970)
        let header = try JSONSerialization.data(withJSONObject: ["alg": "ES256", "kid": keyID, "typ": "JWT"])
        let claims = try JSONSerialization.data(withJSONObject: ["iss": issuerID, "iat": now, "exp": now + 1200, "aud": "appstoreconnect-v1"] as [String: Any])
        let signingInput = "\(base64URL(header)).\(base64URL(claims))"
        let signature = try key.signature(for: Data(signingInput.utf8))
        return "\(signingInput).\(base64URL(signature.rawRepresentation))"
    }

    func base64URL(_ data: Data) -> String {
        data.base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
    }

    /// Calls the API and returns its JSON; fails with the API's own errors.
    @discardableResult
    func call(_ method: String, _ path: String, query: [String: String] = [:], body: [String: Any]? = nil) async throws -> [String: Any] {
        var components = URLComponents(string: "https://api.appstoreconnect.apple.com\(path)")!
        if !query.isEmpty {
            components.queryItems = query.sorted { $0.key < $1.key }.map { URLQueryItem(name: $0.key, value: $0.value) }
        }
        var request = URLRequest(url: components.url!)
        request.httpMethod = method
        request.setValue("Bearer \(try token())", forHTTPHeaderField: "Authorization")
        if let body {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        }
        let (data, response) = try await URLSession.shared.data(for: request)
        let status = (response as? HTTPURLResponse)?.statusCode ?? 0
        guard (200..<300).contains(status) else {
            throw Failure(description: "\(method) \(path) answered \(status): \(String(decoding: data, as: UTF8.self))")
        }
        if data.isEmpty { return [:] }
        return (try JSONSerialization.jsonObject(with: data) as? [String: Any]) ?? [:]
    }
}

func resources(_ json: [String: Any]) -> [[String: Any]] {
    json["data"] as? [[String: Any]] ?? []
}

func attribute(_ resource: [String: Any], _ name: String) -> Any? {
    (resource["attributes"] as? [String: Any])?[name]
}

// MARK: - Commands

/// One past the highest build number App Store Connect has for the app.
func nextBuildNumber(_ client: Client) async throws -> Int {
    let json = try await client.call("GET", "/v1/builds", query: [
        "filter[app]": appID,
        "sort": "-uploadedDate",
        "limit": "200",
        "fields[builds]": "version",
    ])
    let numbers = resources(json).compactMap { (attribute($0, "version") as? String).flatMap(Int.init) }
    return max(numbers.max() ?? 0, lastLegacyBuild) + 1
}

/// The changelog's list as App Store text.
func storeText(_ markdown: String) -> String {
    var items: [String] = []
    for line in markdown.components(separatedBy: .newlines) {
        if line.hasPrefix("- ") {
            items.append(String(line.dropFirst(2)))
        } else if line.hasPrefix("  "), !items.isEmpty {
            items[items.count - 1] += " " + line.trimmingCharacters(in: .whitespaces)
        } else if !line.trimmingCharacters(in: .whitespaces).isEmpty, !line.hasPrefix("### ") {
            items.append(line)
        }
    }
    let text = items
        .map { $0.replacingOccurrences(of: #"\s*\(#\d+\)"#, with: "", options: .regularExpression) }
        .map { "• \($0)" }
        .joined(separator: "\n")
    return String(text.prefix(4000))
}

/// Waits until App Store Connect has processed the build, for at most 45 minutes.
func processedBuild(_ client: Client, version: String, build: String) async throws -> String {
    let deadline = Date().addingTimeInterval(45 * 60)
    while Date() < deadline {
        let json = try await client.call("GET", "/v1/builds", query: [
            "filter[app]": appID,
            "filter[version]": build,
            "filter[preReleaseVersion.version]": version,
            "fields[builds]": "processingState",
        ])
        if let found = resources(json).first, let id = found["id"] as? String {
            let state = attribute(found, "processingState") as? String ?? ""
            switch state {
            case "VALID":
                return id
            case "FAILED", "INVALID":
                throw Failure(description: "build \(build) of \(version) is \(state) in App Store Connect")
            default:
                print("build \(build) is \(state.isEmpty ? "not there yet" : state); waiting")
            }
        } else {
            print("build \(build) of \(version) is not in App Store Connect yet; waiting")
        }
        try await Task.sleep(for: .seconds(30))
    }
    throw Failure(description: "build \(build) of \(version) was not processed within 45 minutes")
}

/// TestFlight's "What to Test" in every language the build has, or in
/// English when it has none yet.
func setWhatToTest(_ client: Client, buildID: String, text: String) async throws {
    let existing = resources(try await client.call("GET", "/v1/builds/\(buildID)/betaBuildLocalizations"))
    if existing.isEmpty {
        try await client.call("POST", "/v1/betaBuildLocalizations", body: ["data": [
            "type": "betaBuildLocalizations",
            "attributes": ["locale": "en-US", "whatsNew": text],
            "relationships": ["build": ["data": ["type": "builds", "id": buildID]]],
        ]])
    }
    for localization in existing {
        guard let id = localization["id"] as? String else { continue }
        try await client.call("PATCH", "/v1/betaBuildLocalizations/\(id)", body: ["data": [
            "type": "betaBuildLocalizations", "id": id, "attributes": ["whatsNew": text],
        ]])
    }
    print("TestFlight: What to Test set")
}

/// The App Store version: made when it does not exist yet, given this
/// build, and its "What's New" set in every language of the listing.
func prepareAppStoreVersion(_ client: Client, version: String, buildID: String, text: String) async throws {
    let found = resources(try await client.call("GET", "/v1/apps/\(appID)/appStoreVersions", query: [
        "filter[versionString]": version,
        "filter[platform]": "IOS",
    ]))
    let versionID: String
    if let id = found.first?["id"] as? String {
        versionID = id
    } else {
        let made = try await client.call("POST", "/v1/appStoreVersions", body: ["data": [
            "type": "appStoreVersions",
            "attributes": ["platform": "IOS", "versionString": version],
            "relationships": ["app": ["data": ["type": "apps", "id": appID]]],
        ]])
        guard let id = (made["data"] as? [String: Any])?["id"] as? String else { throw Failure(description: "App Store version \(version) was not made") }
        versionID = id
        print("App Store: version \(version) made")
    }
    try await client.call("PATCH", "/v1/appStoreVersions/\(versionID)/relationships/build", body: [
        "data": ["type": "builds", "id": buildID],
    ])
    let localizations = resources(try await client.call("GET", "/v1/appStoreVersions/\(versionID)/appStoreVersionLocalizations"))
    for localization in localizations {
        guard let id = localization["id"] as? String else { continue }
        try await client.call("PATCH", "/v1/appStoreVersionLocalizations/\(id)", body: ["data": [
            "type": "appStoreVersionLocalizations", "id": id, "attributes": ["whatsNew": text],
        ]])
    }
    print("App Store: version \(version) has this build and What's New in \(localizations.count) languages; submit it for review in App Store Connect")
}

// MARK: - Main

let arguments = Array(CommandLine.arguments.dropFirst())
do {
    switch arguments.first {
    case "text" where arguments.count == 2:
        guard let markdown = try? String(contentsOfFile: arguments[1], encoding: .utf8) else { fail("cannot read \(arguments[1])") }
        print(storeText(markdown))
    case "next-build-number":
        print(try await nextBuildNumber(Client()))
    case "notes" where arguments.count >= 4:
        let version = arguments[1]
        let build = arguments[2]
        guard let markdown = try? String(contentsOfFile: arguments[3], encoding: .utf8) else { fail("cannot read \(arguments[3])") }
        let text = storeText(markdown)
        guard !text.isEmpty else { fail("the notes in \(arguments[3]) are empty") }
        let client = Client()
        let buildID = try await processedBuild(client, version: version, build: build)
        try await setWhatToTest(client, buildID: buildID, text: text)
        if arguments.contains("--app-store") {
            try await prepareAppStoreVersion(client, version: version, buildID: buildID, text: text)
        }
    default:
        fail("usage: app-store-connect.swift text NOTES_FILE | next-build-number | notes VERSION BUILD NOTES_FILE [--app-store]")
    }
} catch {
    fail("\(error)")
}
