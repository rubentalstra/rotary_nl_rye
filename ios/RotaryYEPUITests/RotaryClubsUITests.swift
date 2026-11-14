import XCTest

/// Opens "For Rotary clubs" from Home, the costs topic, and a handbook in
/// Quick Look, with a screenshot of each step.
@MainActor
final class RotaryClubsUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    func testRotaryClubsDutchLight() {
        tour(language: "nl", appearance: .light, tile: "Voor Rotary-clubs", topic: "Kosten", document: "Handboek gastgezin")
    }

    func testRotaryClubsEnglishDark() {
        tour(language: "en", appearance: .dark, tile: "For Rotary clubs", topic: "Costs", document: "Host family handbook")
    }

    private func tour(language: String, appearance: XCUIDevice.Appearance, tile: String, topic: String, document: String) {
        XCUIDevice.shared.appearance = appearance
        let app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(\(language))", "-AppleLocale", language == "nl" ? "nl_NL" : "en_GB"]
        app.launch()

        let tileButton = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", tile)).firstMatch
        XCTAssertTrue(tileButton.waitForExistence(timeout: 5), "no tile \(tile)")
        tileButton.tap()
        XCTAssertTrue(app.navigationBars[tile].waitForExistence(timeout: 5), "Rotary clubs did not open")
        snapshot("\(language)-clubs")

        app.buttons.matching(NSPredicate(format: "label == %@", topic)).firstMatch.tap()
        XCTAssertTrue(app.navigationBars[topic].waitForExistence(timeout: 5), "the topic did not open")
        snapshot("\(language)-clubs-topic")
        app.navigationBars.buttons.firstMatch.tap()

        let documentButton = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", document)).firstMatch
        if !documentButton.isHittable { app.collectionViews.firstMatch.swipeUp() }
        XCTAssertTrue(documentButton.waitForExistence(timeout: 5), "no document \(document)")
        snapshot("\(language)-clubs-documents")
        documentButton.tap()
        XCTAssertTrue(app.otherElements["QLPreviewControllerView"].waitForExistence(timeout: 20) || app.navigationBars.buttons.count > 1, "Quick Look did not open")
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "first page drawn")], timeout: 3)
        snapshot("\(language)-clubs-document")
    }

    private func snapshot(_ name: String) {
        let attachment = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
