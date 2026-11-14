import Foundation

/// The SpreadsheetML parts the reader needs, each read with Foundation's
/// XMLParser. Element names are matched without their namespace prefix.

/// `xl/sharedStrings.xml`: the table of strings that text cells point into.
/// A string item is all the text of its runs (`<si><r><t>`) together.
final class SharedStringsParser: NSObject, XMLParserDelegate {
    private var strings: [String] = []
    private var current: String?
    private var inText = false

    static func parse(_ data: Data) throws(Spreadsheet.ReadError) -> [String] {
        let delegate = SharedStringsParser()
        try run(data, delegate, part: "xl/sharedStrings.xml")
        return delegate.strings
    }

    func parser(_ parser: XMLParser, didStartElement name: String, namespaceURI: String?, qualifiedName: String?, attributes: [String: String] = [:]) {
        switch local(name) {
        case "si": current = ""
        case "t": inText = current != nil
        default: break
        }
    }

    func parser(_ parser: XMLParser, foundCharacters string: String) {
        if inText { current?.append(string) }
    }

    func parser(_ parser: XMLParser, didEndElement name: String, namespaceURI: String?, qualifiedName: String?) {
        switch local(name) {
        case "t": inText = false
        case "si":
            strings.append(current ?? "")
            current = nil
        default: break
        }
    }
}

/// A worksheet: its rows, each cell resolved to its text. Cell types (ECMA-376
/// 18.18.11): `s` points into the shared strings, `inlineStr` holds its text,
/// `str` and `b` hold a value as text, and no type is a number.
final class SheetParser: NSObject, XMLParserDelegate {
    private let sharedStrings: [String]
    private var rows: [[Int: Spreadsheet.Cell]] = []
    private var row: [Int: Spreadsheet.Cell] = [:]
    private var column: Int?
    private var type: String?
    private var value = ""
    private var inValue = false

    private init(sharedStrings: [String]) {
        self.sharedStrings = sharedStrings
    }

    static func parse(_ data: Data, sharedStrings: [String]) throws(Spreadsheet.ReadError) -> [[Int: Spreadsheet.Cell]] {
        let delegate = SheetParser(sharedStrings: sharedStrings)
        try run(data, delegate, part: "worksheet")
        return delegate.rows
    }

    func parser(_ parser: XMLParser, didStartElement name: String, namespaceURI: String?, qualifiedName: String?, attributes: [String: String] = [:]) {
        switch local(name) {
        case "row": row = [:]
        case "c":
            column = attributes["r"].flatMap(columnIndex(of:)) ?? (row.keys.max().map { $0 + 1 } ?? 0)
            type = attributes["t"]
            value = ""
        case "v", "t": inValue = column != nil
        default: break
        }
    }

    func parser(_ parser: XMLParser, foundCharacters string: String) {
        if inValue { value.append(string) }
    }

    func parser(_ parser: XMLParser, didEndElement name: String, namespaceURI: String?, qualifiedName: String?) {
        switch local(name) {
        case "v", "t": inValue = false
        case "c":
            if let column {
                let text = type == "s" ? Int(value).flatMap { sharedStrings.indices.contains($0) ? sharedStrings[$0] : nil } ?? "" : value
                row[column] = Spreadsheet.Cell(text: text, isNumber: type == nil || type == "n")
            }
            column = nil
        case "row": rows.append(row)
        default: break
        }
    }
}

/// `xl/workbook.xml`: the relationship id of the first `<sheet>`.
final class FirstSheetParser: NSObject, XMLParserDelegate {
    private var id: String?

    static func parse(_ data: Data) throws(Spreadsheet.ReadError) -> String {
        let delegate = FirstSheetParser()
        try run(data, delegate, part: "xl/workbook.xml")
        guard let id = delegate.id else { throw .malformedPart("xl/workbook.xml") }
        return id
    }

    func parser(_ parser: XMLParser, didStartElement name: String, namespaceURI: String?, qualifiedName: String?, attributes: [String: String] = [:]) {
        guard id == nil, local(name) == "sheet" else { return }
        id = attributes.first { $0.key == "r:id" || $0.key.hasSuffix(":id") }?.value
    }
}

/// A relationships part (`.rels`): the target of each relationship id.
final class RelationshipsParser: NSObject, XMLParserDelegate {
    private var targets: [String: String] = [:]

    static func parse(_ data: Data) throws(Spreadsheet.ReadError) -> [String: String] {
        let delegate = RelationshipsParser()
        try run(data, delegate, part: "relationships")
        return delegate.targets
    }

    func parser(_ parser: XMLParser, didStartElement name: String, namespaceURI: String?, qualifiedName: String?, attributes: [String: String] = [:]) {
        if local(name) == "Relationship", let id = attributes["Id"], let target = attributes["Target"] {
            targets[id] = target
        }
    }
}

/// An element name without its namespace prefix: `x:row` is `row`.
private func local(_ name: String) -> Substring {
    name.split(separator: ":").last ?? Substring(name)
}

/// Runs a parser over a part; a part that is not well-formed XML is malformed.
private func run(_ data: Data, _ delegate: some XMLParserDelegate, part: String) throws(Spreadsheet.ReadError) {
    let parser = XMLParser(data: data)
    parser.delegate = delegate
    guard parser.parse() else { throw .malformedPart(part) }
}
