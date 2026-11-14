import XCTest

/// Opens the summer camps from Home with the live sheet, the filter menu and a
/// camp's details, with a screenshot of each step.
@MainActor
final class CampsUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    func testSummerCampsDutchLight() {
        tour(language: "nl", appearance: .light, tile: "Zomerkampen", filter: "Filter")
    }

    func testSummerCampsEnglishDark() {
        tour(language: "en", appearance: .dark, tile: "Summer camps", filter: "Filter")
    }

    private func tour(language: String, appearance: XCUIDevice.Appearance, tile: String, filter: String) {
        XCUIDevice.shared.appearance = appearance
        let app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(\(language))", "-AppleLocale", language == "nl" ? "nl_NL" : "en_GB"]
        app.launch()

        let tileButton = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", tile)).firstMatch
        XCTAssertTrue(tileButton.waitForExistence(timeout: 5), "no tile \(tile)")
        tileButton.tap()

        let firstCamp = app.collectionViews.buttons.firstMatch
        XCTAssertTrue(firstCamp.waitForExistence(timeout: 20), "no camps loaded")
        snapshot("\(language)-camps")

        app.navigationBars.buttons[filter].tap()
        snapshot("\(language)-camps-filter")
        // Close the menu by tapping the empty list below it.
        app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.75)).tap()

        let showPast = app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", language == "nl" ? "Toon" : "Show")).firstMatch
        if showPast.waitForExistence(timeout: 3) {
            showPast.tap()
            snapshot("\(language)-camps-all")
        }

        app.collectionViews.buttons.firstMatch.tap()
        snapshot("\(language)-camp")

        // A camp with a PDF invitation: it opens in Quick Look.
        app.navigationBars.buttons.firstMatch.tap()
        let search = app.searchFields.firstMatch
        if !search.exists { app.collectionViews.firstMatch.swipeDown() }
        XCTAssertTrue(search.waitForExistence(timeout: 5), "no search field")
        search.tap()
        // Type only once the field has focus: the keyboard is up.
        XCTAssertTrue(app.keyboards.firstMatch.waitForExistence(timeout: 10), "the search field did not get focus")
        search.typeText("India")
        let india = app.collectionViews.buttons.matching(NSPredicate(format: "label CONTAINS %@", "India")).firstMatch
        XCTAssertTrue(india.waitForExistence(timeout: 5), "India is not found")
        india.tap()
        let invitation = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", language == "nl" ? "uitnodiging" : "invitation")).firstMatch
        XCTAssertTrue(invitation.waitForExistence(timeout: 5), "no invitation button")
        invitation.tap()
        // Quick Look's bar shows the document's name once it is open.
        let quickLook = app.descendants(matching: .any).matching(NSPredicate(format: "label CONTAINS %@", "discover-india-international-youth-camp")).firstMatch
        XCTAssertTrue(quickLook.waitForExistence(timeout: 40), "Quick Look did not open the document")
        // A large PDF takes a moment to draw its first page.
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "first page drawn")], timeout: 4)
        snapshot("\(language)-camp-invitation")
    }

    private func snapshot(_ name: String) {
        let attachment = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
