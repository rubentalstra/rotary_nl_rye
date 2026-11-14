import XCTest

/// Walks every tab and a person's details in both languages and both
/// appearances, failing when a screen does not show, and keeps a screenshot of
/// each step in the result bundle for review.
@MainActor
final class TabTourUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    func testTourDutchLight() {
        tour(language: "nl", appearance: .light, tabs: ["Home", "Over", "Noodgeval", "Contact", "Instellingen"], call: "Bel Barbara Tusveld", image112: "112, als elke seconde telt")
    }

    func testTourEnglishDark() {
        tour(language: "en", appearance: .dark, tabs: ["Home", "About", "Emergency", "Contact", "Settings"], call: "Call Barbara Tusveld", image112: "112, when every second counts")
    }

    private func tour(language: String, appearance: XCUIDevice.Appearance, tabs: [String], call: String, image112: String) {
        XCUIDevice.shared.appearance = appearance
        let app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(\(language))", "-AppleLocale", language == "nl" ? "nl_NL" : "en_GB"]
        app.launch()

        for tab in tabs {
            let button = app.tabBars.buttons[tab]
            XCTAssertTrue(button.waitForExistence(timeout: 5), "no tab \(tab)")
            button.tap()
            snapshot("\(language)-\(tab)")
        }

        app.tabBars.buttons[tabs[2]].tap()
        XCTAssertTrue(app.images[image112].waitForExistence(timeout: 5), "no 112 image")
        XCTAssertTrue(app.links[call].waitForExistence(timeout: 5), "no \(call) button")

        app.tabBars.buttons[tabs[3]].tap()
        // The row reads as one element for VoiceOver: name, then role.
        let person = app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "Barbara Tusveld")).firstMatch
        XCTAssertTrue(person.waitForExistence(timeout: 5), "Barbara Tusveld is not in Contact")
        person.tap()
        XCTAssertTrue(app.navigationBars["Barbara Tusveld"].waitForExistence(timeout: 5), "no detail for Barbara Tusveld")
        snapshot("\(language)-person")
    }

    private func snapshot(_ name: String) {
        let attachment = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
