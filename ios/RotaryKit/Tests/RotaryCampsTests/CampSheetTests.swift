import Foundation
@testable import RotaryCamps
import Testing

/// The real zomerkampen.xlsx as published on 16 September 2026.
@Suite struct CampSheetTests {
    let camps: [Camp]

    init() throws {
        let url = try #require(Bundle.module.url(forResource: "zomerkampen", withExtension: "xlsx", subdirectory: "Fixtures"))
        camps = CampSheet.camps(from: try Spreadsheet(data: Data(contentsOf: url)))
    }

    private func camp(_ title: String) throws -> Camp {
        try #require(camps.first { $0.title == title }, "no camp \(title)")
    }

    @Test func `Every one of the 74 rows becomes a camp`() {
        #expect(camps.count == 74)
    }

    @Test func `Camps are in order of their first day`() {
        let days = camps.compactMap { $0.startDate() }
        #expect(days == days.sorted())
    }

    @Test func `A date written as dd/mm/yyyy is read`() throws {
        let taiwan = try camp("Discover SUn Moon Lake, the heart of Taiwan")
        #expect(taiwan.start == DateComponents(year: 2025, month: 12, day: 26))
        #expect(taiwan.end == DateComponents(year: 2026, month: 1, day: 8))
    }

    @Test func `A date written as dd-mm-yyyy is read`() throws {
        let finland = try camp("Exploring Finnish Maritime Nature")
        #expect(finland.start == DateComponents(year: 2026, month: 8, day: 1))
        #expect(finland.end == DateComponents(year: 2026, month: 8, day: 15))
    }

    @Test(arguments: [("46194", DateComponents(year: 2026, month: 6, day: 21)), ("45658", DateComponents(year: 2025, month: 1, day: 1))])
    func `An Excel serial number is a day since 1899-12-30`(serial: String, day: DateComponents) {
        #expect(CampSheet.day(from: Spreadsheet.Cell(text: serial, isNumber: true)) == day)
    }

    @Test(arguments: ["31/02/2026", "2026", "", "soon"])
    func `A date that does not exist is no date`(text: String) {
        #expect(CampSheet.day(from: Spreadsheet.Cell(text: text, isNumber: false)) == nil)
    }

    @Test(arguments: [("3521,3522,3523", [3521, 3522, 3523]), ("5950, 5960", [5950, 5960]), ("3481.3481999999999", [3481]), ("2042", [2042]), ("", [Int]())])
    func `Districts are read as written, lists and floats included`(text: String, districts: [Int]) {
        #expect(CampSheet.districts(from: text) == districts)
    }

    @Test func `A currency with a trailing space is still the currency`() {
        #expect(CampSheet.contribution(amount: "450", currency: "EUR ") == Camp.Contribution(amount: 450, currency: Locale.Currency("EUR")))
    }

    @Test(arguments: [("0", "EUR"), ("", "EUR"), ("450", "XYZ")])
    func `No amount or an unknown currency is no contribution`(amount: String, currency: String) {
        #expect(CampSheet.contribution(amount: amount, currency: currency) == nil)
    }

    @Test func `Fully booked is an x`() throws {
        #expect(try camp("Exploring Finnish Lapland in the Spring").isFull)
        #expect(try !camp("Discover India International cultural Youth Camp").isFull)
        #expect(camps.filter(\.isFull).count == 18)
    }

    @Test func `Invitations are PDFs or websites, and some camps have none`() {
        #expect(camps.filter(\.invitationIsPDF).count == 68)
        #expect(camps.filter { $0.invitation != nil && !$0.invitationIsPDF }.count == 2)
        #expect(camps.filter { $0.invitation == nil }.count == 4)
    }

    @Test func `Ages and country are typed`() throws {
        let india = try camp("Discover India International cultural Youth Camp")
        #expect(india.ages == 16...22)
        #expect(india.country == Locale.Region("IN"))
        #expect(india.accepts(age: 16) && !india.accepts(age: 15))
    }

    @Test func `Search finds the title and the country's name`() throws {
        let india = try camp("Discover India International cultural Youth Camp")
        #expect(india.matches("india"))
        #expect(india.matches("indi", locale: Locale(identifier: "nl")))
        #expect(!india.matches("Brazilië", locale: Locale(identifier: "nl")))
    }

    @Test func `Columns are found by their header, wherever they are`() throws {
        let sheet = Spreadsheet(rows: [
            [0: .init(text: "kamp_titel", isNumber: false), 1: .init(text: "landcode_iso3166_1_alpha2", isNumber: false),
             2: .init(text: "einddatum_dd_mm_jjjj", isNumber: false), 3: .init(text: "startdatum_dd_mm_jjjj", isNumber: false),
             4: .init(text: "leeftijd_min", isNumber: false), 5: .init(text: "leeftijd_max", isNumber: false)],
            [0: .init(text: "Moved columns", isNumber: false), 1: .init(text: "nl", isNumber: false),
             2: .init(text: "20/07/2026", isNumber: false), 3: .init(text: "10/07/2026", isNumber: false),
             4: .init(text: "15", isNumber: true), 5: .init(text: "18", isNumber: true)],
        ])
        let camp = try #require(CampSheet.camps(from: sheet).first)
        #expect(camp.start == DateComponents(year: 2026, month: 7, day: 10))
        #expect(camp.country == Locale.Region("NL"))
    }

    @Test(arguments: [("A1", 0), ("K35", 10), ("Z9", 25), ("AA2", 26), ("12", nil)])
    func `A cell reference names its column`(reference: String, column: Int?) {
        #expect(columnIndex(of: reference) == column)
    }

    @Test func `A file that is no spreadsheet is refused`() {
        #expect(throws: Spreadsheet.ReadError.notAnArchive) {
            try Spreadsheet(data: Data("not a zip".utf8))
        }
    }
}
