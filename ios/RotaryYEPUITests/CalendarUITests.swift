import XCTest

/// Opens the calendar from Home with the live MDJC calendar: the list, an
/// event, the add-to-calendar sheet and the month view, with a screenshot of
/// each step.
@MainActor
final class CalendarUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    func testCalendarDutchLight() {
        tour(language: "nl", appearance: .light, tile: "Agenda", add: "Zet in mijn agenda", month: "Maand")
    }

    func testCalendarEnglishDark() {
        tour(language: "en", appearance: .dark, tile: "Calendar", add: "Add to my calendar", month: "Month")
    }

    private func tour(language: String, appearance: XCUIDevice.Appearance, tile: String, add: String, month: String) {
        XCUIDevice.shared.appearance = appearance
        let app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(\(language))", "-AppleLocale", language == "nl" ? "nl_NL" : "en_GB"]
        app.launch()

        let tileButton = app.buttons.matching(NSPredicate(format: "label == %@", tile)).firstMatch
        XCTAssertTrue(tileButton.waitForExistence(timeout: 5), "no tile \(tile)")
        tileButton.tap()

        let firstEvent = app.collectionViews.buttons.firstMatch
        XCTAssertTrue(firstEvent.waitForExistence(timeout: 20), "the calendar did not load")
        snapshot("\(language)-calendar")

        firstEvent.tap()
        let addButton = app.buttons.matching(NSPredicate(format: "label == %@", add)).firstMatch
        XCTAssertTrue(addButton.waitForExistence(timeout: 5), "no \(add) button")
        snapshot("\(language)-calendar-event")
        addButton.tap()
        // The sheet runs outside the app and takes a moment to draw.
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "sheet shows")], timeout: 8)
        snapshot("\(language)-calendar-add")
        // Close the sheet with its first bar button (the ✕), then go back.
        app.navigationBars.buttons.firstMatch.tap()
        XCTAssertTrue(addButton.waitForExistence(timeout: 5), "the sheet did not close")
        app.navigationBars.buttons.firstMatch.tap()

        let monthSegment = app.buttons.matching(NSPredicate(format: "label == %@", month)).firstMatch
        XCTAssertTrue(monthSegment.waitForExistence(timeout: 5), "no \(month) segment")
        monthSegment.tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "month draws")], timeout: 2)
        snapshot("\(language)-calendar-month")
    }

    private func snapshot(_ name: String) {
        let attachment = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
