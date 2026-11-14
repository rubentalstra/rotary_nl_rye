import Testing
@testable import RotaryYEP

/// Every package's licence ships in the app, as its licence requires.
@MainActor @Suite struct LicensesTests {
    @Test(arguments: License.all)
    func `Every licence text is in the app`(license: License) {
        #expect(!license.text.isEmpty, "\(license.file).txt is not in the app")
    }
}
