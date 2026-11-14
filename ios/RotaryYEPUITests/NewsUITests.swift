import XCTest

/// Opens the news from Home with the live feed, a newsletter in Quick Look
/// and an article, with a screenshot of each step.
@MainActor
final class NewsUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    func testNewsDutchLight() {
        tour(language: "nl", appearance: .light, tile: "Nieuws")
    }

    func testNewsEnglishDark() {
        tour(language: "en", appearance: .dark, tile: "News")
    }

    private func tour(language: String, appearance: XCUIDevice.Appearance, tile: String) {
        XCUIDevice.shared.appearance = appearance
        let app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(\(language))", "-AppleLocale", language == "nl" ? "nl_NL" : "en_GB"]
        app.launch()

        let tileButton = app.buttons.matching(NSPredicate(format: "label == %@", tile)).firstMatch
        XCTAssertTrue(tileButton.waitForExistence(timeout: 5), "no tile \(tile)")
        tileButton.tap()

        let latest = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "Jaarverslag")).firstMatch
        XCTAssertTrue(latest.waitForExistence(timeout: 20), "the news did not load")
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "covers load")], timeout: 3)
        snapshot("\(language)-news")

        latest.tap()
        XCTAssertTrue(app.otherElements["QLPreviewControllerView"].waitForExistence(timeout: 20) || app.navigationBars.buttons.count > 1, "Quick Look did not open")
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "first page drawn")], timeout: 3)
        snapshot("\(language)-news-pdf")
        // Quick Look's close button is the first in its bar.
        app.navigationBars.buttons.firstMatch.tap()

        // The article is near the end of the list: scroll until it is on screen.
        let article = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "Corona")).firstMatch
        for _ in 0..<6 where !(article.exists && article.isHittable) {
            app.collectionViews.firstMatch.swipeUp()
        }
        XCTAssertTrue(article.waitForExistence(timeout: 5), "no article")
        article.tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "article loads")], timeout: 2)
        snapshot("\(language)-news-article")
    }

    private func snapshot(_ name: String) {
        let attachment = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
