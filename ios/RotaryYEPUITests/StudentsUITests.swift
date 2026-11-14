import XCTest

/// Walks Op exchange, Naar Nederland and Rebound from Home: the hubs, a
/// class, a student's page, a guide, and the rebounds per country and per
/// year, with a screenshot of each step.
@MainActor
final class StudentsUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    func testStudentsDutchLight() {
        tour(language: "nl", appearance: .light, labels: Labels(outbound: "Op exchange", inbound: "Naar Nederland", rebound: "Rebound", classPrefix: "Klas van", earlier: "Eerdere klassen", group: "Groeperen", byYear: "Per uitwisselingsjaar"))
    }

    func testStudentsEnglishDark() {
        tour(language: "en", appearance: .dark, labels: Labels(outbound: "Going abroad", inbound: "To the Netherlands", rebound: "Rebound", classPrefix: "Class of", earlier: "Earlier classes", group: "Group", byYear: "By exchange year"))
    }

    private struct Labels {
        let outbound, inbound, rebound, classPrefix, earlier, group, byYear: String
    }

    private func tour(language: String, appearance: XCUIDevice.Appearance, labels: Labels) {
        XCUIDevice.shared.appearance = appearance
        let app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(\(language))", "-AppleLocale", language == "nl" ? "nl_NL" : "en_GB"]
        app.launch()

        // Outbound: the hub, the class, a student, a guide.
        button(labels.outbound, in: app).tap()
        let outboundClass = button(labels.classPrefix, in: app, contains: true)
        snapshot("\(language)-outbound")
        button("Long Term Exchange", in: app, contains: true).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "push")], timeout: 1)
        snapshot("\(language)-outbound-long-term")
        app.swipeUp()
        button("Selectiedag", in: app, contains: true).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "push")], timeout: 1)
        snapshot("\(language)-outbound-selection-day")
        back(app)
        back(app)
        button("Family to Family", in: app, contains: true).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "push")], timeout: 1)
        snapshot("\(language)-outbound-family")
        back(app)
        outboundClass.tap()
        let student = app.collectionViews.buttons.firstMatch
        XCTAssertTrue(student.waitForExistence(timeout: 5), "no students")
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "photos")], timeout: 3)
        snapshot("\(language)-outbound-class")
        student.tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "photo")], timeout: 3)
        snapshot("\(language)-outbound-student")
        back(app)
        back(app)
        back(app)

        // Inbound: the hub, the class, a guide.
        button(labels.inbound, in: app).tap()
        let inboundClass = button(labels.classPrefix, in: app, contains: true)
        snapshot("\(language)-inbound")
        inboundClass.tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "photos")], timeout: 3)
        snapshot("\(language)-inbound-class")
        back(app)
        button(labels.earlier, in: app).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "photos")], timeout: 3)
        snapshot("\(language)-inbound-earlier")
        back(app)
        button("Welcome to the Netherlands", in: app, contains: true).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "push")], timeout: 1)
        snapshot("\(language)-inbound-welcome")
        back(app)
        back(app)

        // Rebound: per country, then per year.
        button(labels.rebound, in: app).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "photos")], timeout: 3)
        snapshot("\(language)-rebound")
        button(labels.group, in: app).tap()
        button(labels.byYear, in: app).tap()
        _ = XCTWaiter.wait(for: [XCTestExpectation(description: "regroup")], timeout: 1)
        snapshot("\(language)-rebound-by-year")
    }

    private func back(_ app: XCUIApplication) {
        app.navigationBars.buttons.firstMatch.tap()
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
