import Foundation
import RotaryCore
import RotaryStudents
import Testing

@Suite struct StudentsTests {
    let calendar: Calendar = {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "Europe/Amsterdam")!
        return calendar
    }()

    func date(_ year: Int, _ month: Int, _ day: Int) -> Date {
        calendar.date(from: DateComponents(year: year, month: month, day: day))!
    }

    @Test func `Every student of v13 is there`() {
        #expect(ExchangeStudent.inbound.count == 73)
        #expect(ExchangeStudent.outbound.count == 139)
    }

    @Test func `The years are exchange years, newest first`() {
        #expect(ExchangeStudent.years(.inbound).map(\.description) == ["2026/2027", "2025/2026", "2024/2025"])
        #expect(ExchangeStudent.years(.outbound).map(\.startYear) == [2026, 2025, 2024, 2023, 2022])
    }

    @Test func `Inbounds come to the Netherlands and outbounds leave from it`() {
        #expect(ExchangeStudent.inbound.allSatisfy { $0.destination == .country(Locale.Region("NL")) && $0.direction == .inbound })
        #expect(ExchangeStudent.outbound.allSatisfy { $0.homeCountry == Locale.Region("NL") && $0.direction == .outbound })
    }

    @Test(arguments: ExchangeStudent.inbound + ExchangeStudent.outbound)
    func `Every student has a name, a bio and real countries`(student: ExchangeStudent) {
        #expect(student.name.givenName?.isEmpty == false)
        #expect(!student.bio.isEmpty)
        #expect(Locale.Region.isoRegions.contains(student.homeCountry))
        if case .country(let country) = student.destination {
            #expect(Locale.Region.isoRegions.contains(country))
        }
        if let url = student.photoURL {
            #expect(url.scheme == "https" && url.host() == "www.rotary.nl")
        }
    }

    @Test func `Students are unique`() {
        let all = ExchangeStudent.inbound + ExchangeStudent.outbound
        #expect(Set(all.map(\.id)).count == all.count)
    }

    @Test func `An exchange year runs from August to July`() {
        let student = ExchangeStudent.students(.outbound, in: ExchangeYear(startYear: 2026))[0]
        #expect(student.status(on: date(2026, 7, 31), calendar: calendar) == .upcoming)
        #expect(student.status(on: date(2026, 8, 1), calendar: calendar) == .onExchange)
        #expect(student.status(on: date(2027, 6, 30), calendar: calendar) == .onExchange)
        #expect(student.status(on: date(2027, 7, 1), calendar: calendar) == .returned)
    }

    @Test func `In November 2026 the rebounds are the outbounds of 2022 to 2026`() {
        let rebounds = ExchangeStudent.rebounds(on: date(2026, 11, 14), calendar: calendar)
        #expect(rebounds.count == 113)
        #expect(Set(rebounds.map(\.exchangeYear.startYear)) == [2022, 2023, 2024, 2025])
    }

    @Test func `In November 2026 the earlier inbounds are the classes of 2024 and 2025`() {
        let earlier = ExchangeStudent.returned(.inbound, on: date(2026, 11, 14), calendar: calendar)
        #expect(earlier.count == 50)
    }

    @Test func `A bio preview folds its line breaks`() {
        #expect(ExchangeStudent.outbound.allSatisfy { !$0.bioPreview.contains("\n") && !$0.bioPreview.isEmpty })
    }

    @Test func `One outbound went somewhere in Europe`() {
        #expect(ExchangeStudent.outbound.filter { $0.destination == .europe }.count == 1)
    }

    @Test(arguments: OutboundGuide.allCases)
    func `Every outbound page has content`(guide: OutboundGuide) {
        #expect(!guide.sections.isEmpty && guide.sections.allSatisfy { !$0.items.isEmpty })
    }

    @Test(arguments: ExchangeProgramme.allCases)
    func `Every programme has its outbound pages`(programme: ExchangeProgramme) {
        #expect(OutboundGuide.guides(for: programme).count >= 4)
    }

    @Test(arguments: InboundGuide.allCases)
    func `Every inbound page has content`(guide: InboundGuide) {
        #expect(!guide.sections.isEmpty && guide.sections.allSatisfy { !$0.items.isEmpty })
    }
}
