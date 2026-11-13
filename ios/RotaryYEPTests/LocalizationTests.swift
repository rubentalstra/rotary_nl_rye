import Foundation
import Testing

/// Every text in the String Catalogs has Dutch (the source) and English, so a
/// new text never reaches the app in one language only.
@Suite struct LocalizationTests {
    static let languages = ["nl", "en"]

    /// The catalogs next to this folder: the app's, and every RotaryKit module's that has text.
    static let catalogs: [URL] = {
        let tests = URL(filePath: #filePath).deletingLastPathComponent()
        let kit = tests.appending(path: "../RotaryKit/Sources").standardizedFileURL
        let modules = (try? FileManager.default.contentsOfDirectory(atPath: kit.path(percentEncoded: false))) ?? []
        let kitCatalogs = modules.sorted()
            .map { kit.appending(path: "\($0)/Localizable.xcstrings") }
            .filter { FileManager.default.fileExists(atPath: $0.path(percentEncoded: false)) }
        return [tests.appending(path: "../RotaryYEP/Localizable.xcstrings").standardizedFileURL] + kitCatalogs
    }()

    struct Catalog: Decodable {
        struct Entry: Decodable {
            let shouldTranslate: Bool?
            let localizations: [String: Localization]?
        }
        struct Localization: Decodable {
            struct Unit: Decodable { let state: String?; let value: String? }
            let stringUnit: Unit?
            let variations: [String: [String: Localization]]?
        }
        let sourceLanguage: String
        let strings: [String: Entry]
    }

    @Test(arguments: catalogs)
    func `Every string has Dutch and English`(_ url: URL) throws {
        let catalog = try JSONDecoder().decode(Catalog.self, from: Data(contentsOf: url))
        #expect(catalog.sourceLanguage == "nl")
        var missing: [String] = []
        for (key, entry) in catalog.strings where entry.shouldTranslate != false && !key.isEmpty {
            for language in Self.languages where language != catalog.sourceLanguage {
                guard let localization = entry.localizations?[language] else {
                    missing.append("\(language): \(key)")
                    continue
                }
                let empty = localization.stringUnit?.value?.isEmpty == true
                if localization.stringUnit?.state == "new" || (localization.variations == nil && localization.stringUnit == nil) || empty {
                    missing.append("\(language) (empty): \(key)")
                }
            }
        }
        #expect(missing.isEmpty, "\(url.lastPathComponent) misses translations:\n\(missing.sorted().joined(separator: "\n"))")
    }

    /// The bundle carries both languages, so iOS offers the per-app language choice.
    @Test func `The app is localised in Dutch and English`() {
        #expect(Set(Bundle.main.localizations).isSuperset(of: Self.languages))
    }
}
