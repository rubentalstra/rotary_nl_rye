import Foundation
import ZIPFoundation

/// The first worksheet of an XLSX file, as rows of cells. An XLSX file is a
/// ZIP archive of XML parts (ECMA-376, SpreadsheetML): ZIPFoundation unpacks
/// it and Foundation's XMLParser reads the workbook, its relationships, the
/// shared strings and the sheet. Only what the summer camps need is read:
/// values, not styles or formulas.
struct Spreadsheet {
    /// A cell's value as stored: text, or a number written as text.
    struct Cell: Equatable {
        let text: String
        /// Numbers include dates, which Excel stores as days since 1899-12-30.
        let isNumber: Bool
    }

    /// Each row: its cells by column, `0` for A, `1` for B.
    let rows: [[Int: Cell]]

    enum ReadError: Error, Equatable {
        case notAnArchive
        case missingPart(String)
        case malformedPart(String)
    }

    init(rows: [[Int: Cell]]) {
        self.rows = rows
    }

    init(data: Data) throws(ReadError) {
        let archive: Archive
        do {
            archive = try Archive(data: data, accessMode: .read)
        } catch {
            throw .notAnArchive
        }
        let sheetPath = try Self.firstSheetPath(in: archive)
        var sharedStrings: [String] = []
        if let part = try archive.part("xl/sharedStrings.xml", required: false) {
            sharedStrings = try SharedStringsParser.parse(part)
        }
        guard let sheet = try archive.part(sheetPath, required: true) else { throw .missingPart(sheetPath) }
        rows = try SheetParser.parse(sheet, sharedStrings: sharedStrings)
    }

    /// The path of the workbook's first sheet: `xl/workbook.xml` names it, and
    /// its relationships say which part holds it (usually `worksheets/sheet1.xml`).
    private static func firstSheetPath(in archive: Archive) throws(ReadError) -> String {
        guard let workbook = try archive.part("xl/workbook.xml", required: true),
              let relationships = try archive.part("xl/_rels/workbook.xml.rels", required: true)
        else { throw .missingPart("xl/workbook.xml") }
        let sheetID = try FirstSheetParser.parse(workbook)
        let targets = try RelationshipsParser.parse(relationships)
        guard let target = targets[sheetID] else { throw .malformedPart("xl/_rels/workbook.xml.rels") }
        return target.hasPrefix("/") ? String(target.dropFirst()) : "xl/" + target
    }
}

private extension Archive {
    /// The contents of a part, or nil when an optional part is absent.
    func part(_ path: String, required: Bool) throws(Spreadsheet.ReadError) -> Data? {
        guard let entry = self[path] else {
            if required { throw .missingPart(path) }
            return nil
        }
        var data = Data()
        do {
            _ = try extract(entry) { chunk in data.append(chunk) }
        } catch {
            throw .malformedPart(path)
        }
        return data
    }
}

/// The column of a cell reference: `A1` is 0, `K35` is 10, `AA2` is 26.
func columnIndex(of reference: String) -> Int? {
    let letters = reference.prefix { $0.isLetter && $0.isASCII }.uppercased()
    guard !letters.isEmpty else { return nil }
    return letters.unicodeScalars.reduce(0) { $0 * 26 + Int($1.value) - 64 } - 1
}
