import XCTest

/// Opens Programmes from Home: the overview, the year exchange with its photo
/// full screen, Family to Family, the podcast playing with the bar above the
/// tabs, and the video, with a screenshot of each step.
@MainActor
final class ProgrammesUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    func testProgrammesDutchLight() {
        tour(language: "nl", appearance: .light, labels: Labels(tile: "Programma's", longTerm: "Long Term Exchange", familyToFamily: "Family to Family", podcast: "Podcast", episode: "Sharon en Michel Teunissen", video: "Avenue", signUp: "interesse@rotaryyep.nl"))
    }

    func testProgrammesEnglishDark() {
        tour(language: "en", appearance: .dark, labels: Labels(tile: "Programmes", longTerm: "Long Term Exchange", familyToFamily: "Family to Family", podcast: "Podcast", episode: "Sharon en Michel Teunissen", video: "Avenue", signUp: "interesse@rotaryyep.nl"))
    }

    private struct Labels {
        let tile, longTerm, familyToFamily, podcast, episode, video, signUp: String
    }

    private func tour(language: String, appearance: XCUIDevice.Appearance, labels: Labels) {
        XCUIDevice.shared.appearance = appearance
        let app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(\(language))", "-AppleLocale", language == "nl" ? "nl_NL" : "en_GB"]
        app.launch()

        button(labels.tile, in: app).tap()
        let longTerm = button(labels.longTerm, in: app, contains: true)
        snapshot("\(language)-programmes")

        longTerm.tap()
        let gallery = app.collectionViews.buttons.firstMatch
        XCTAssertTrue(gallery.waitForExistence(timeout: 5), "no photos")
        snapshot("\(language)-programme-long-term")
        gallery.tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "zoom")], timeout: 1.5)
        snapshot("\(language)-programme-photo")
        app.navigationBars.buttons.firstMatch.tap()
        let signUp = app.descendants(matching: .any).matching(NSPredicate(format: "label CONTAINS %@", labels.signUp)).firstMatch
        for _ in 0..<8 where !signUp.isHittable {
            app.swipeUp()
        }
        XCTAssertTrue(signUp.isHittable, "no sign-up mail")
        snapshot("\(language)-programme-long-term-end")
        app.navigationBars.buttons.firstMatch.tap()

        button(labels.familyToFamily, in: app, contains: true).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "push")], timeout: 1)
        snapshot("\(language)-programme-family-to-family")
        app.navigationBars.buttons.firstMatch.tap()

        button(labels.podcast, in: app, contains: true).tap()
        button(labels.episode, in: app, contains: true).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "audio loads")], timeout: 6)
        snapshot("\(language)-podcast-playing")
        app.navigationBars.buttons.firstMatch.tap()
        snapshot("\(language)-programmes-now-playing")

        button(labels.video, in: app, contains: true).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "video loads")], timeout: 8)
        snapshot("\(language)-video")
    }

    private func button(_ label: String, in app: XCUIApplication, contains: Bool = false) -> XCUIElement {
        let element = app.buttons.matching(NSPredicate(format: contains ? "label CONTAINS %@" : "label == %@", label)).firstMatch
        XCTAssertTrue(element.waitForExistence(timeout: 10), "no \(label)")
        return element
    }

    private func snapshot(_ name: String) {
        let attachment = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
