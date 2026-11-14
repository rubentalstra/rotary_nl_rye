import Foundation
import RotaryCore
import Testing

@Suite struct RotaryClubsTests {
    @Test func `Every document is in at least one guide`() {
        let listed = Set(ClubGuide.allCases.flatMap(\.documents))
        #expect(listed == Set(ClubDocument.allCases))
    }

    @Test(arguments: ClubDocument.allCases)
    func `Every document is a PDF on rotary.nl over https`(document: ClubDocument) {
        #expect(document.url.scheme == "https")
        #expect(document.url.host() == "www.rotary.nl")
        #expect(document.url.pathExtension == "pdf")
    }

    @Test func `No two documents share a link`() {
        let urls = ClubDocument.allCases.map(\.url)
        #expect(Set(urls).count == urls.count)
    }

    @Test(arguments: ClubGuide.allCases)
    func `No document is twice in a guide`(guide: ClubGuide) {
        #expect(Set(guide.documents).count == guide.documents.count)
    }

    @Test func `The shared documents are one document in several guides`() {
        #expect(ClubGuide.allCases.filter { $0.documents.contains(.firstNightQuestions) }.count == 3)
        #expect(ClubGuide.allCases.filter { $0.documents.contains(.travelRules) }.count == 3)
    }

    @Test(arguments: ClubTopic.allCases)
    func `Every topic has text`(topic: ClubTopic) {
        #expect(!topic.paragraphs.isEmpty)
    }
}
