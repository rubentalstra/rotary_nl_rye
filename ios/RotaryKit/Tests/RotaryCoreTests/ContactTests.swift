import Foundation
import RotaryCore
import Testing

@Suite struct PersonTests {
    let person = Person(
        name: PersonNameComponents(givenName: "Toon", familyName: "ter Ellen"),
        roles: [.chairYouthExchange, .secretary],
        phone: "06 12 34 56 78", club: "RC Lelystad"
    )

    @Test func `The first role is the one under the name`() {
        #expect(person.role == .chairYouthExchange)
    }

    @Test func `The name is the identity`() {
        #expect(person.id == PersonNameComponents(givenName: "Toon", familyName: "ter Ellen"))
    }

    @Test(arguments: ["toon", "ter ellen", "lelystad", "", "  "])
    func `Search matches name and club`(query: String) {
        #expect(person.matches(query))
    }

    @Test func `Search does not match what is not there`() {
        #expect(!person.matches("Groningen"))
    }

    @Test func `A Dutch number is dialled internationally, so it works from abroad`() {
        #expect(ContactLinks.call("06 12 34 56 78")?.absoluteString == "tel:+31612345678")
        #expect(ContactLinks.call("0182 61 26 76")?.absoluteString == "tel:+31182612676")
        #expect(ContactLinks.message("06 12 34 56 78")?.absoluteString == "sms:+31612345678")
        #expect(ContactLinks.whatsApp("06 12 34 56 78")?.absoluteString == "https://wa.me/31612345678")
        #expect(ContactLinks.call("+49 30 1234567")?.absoluteString == "tel:+49301234567")
    }

    @Test(arguments: [("06 12 34 56 78", true), ("+31 6 12345678", true), ("0182 61 26 76", false), ("+49 30 1234567", false)])
    func `Only a mobile number can receive a text or WhatsApp`(phone: String, mobile: Bool) {
        #expect(ContactLinks.isMobile(phone) == mobile)
        #expect(ContactLinks.mail(" chair@rotaryyep.nl")?.absoluteString == "mailto:chair@rotaryyep.nl")
    }
}

@Suite struct OrganisationTests {
    private var everyone: [Person] {
        ContactGroup.allCases.flatMap(\.members)
    }

    @Test func `The Contact tab has the four teams`() {
        #expect(ContactGroup.teams == [.mdjc, .longTerm, .shortTerm, .rotex])
        #expect(Set(ContactGroup.teams.flatMap(\.members)).count == 40)
    }

    @Test func `The emergency group is people from the teams`() {
        let team = Set(ContactGroup.teams.flatMap(\.members))
        #expect(ContactGroup.emergency.members.allSatisfy(team.contains))
    }

    @Test func `The confidants are not in the Contact tab`() {
        let team = Set(ContactGroup.teams.flatMap(\.members))
        #expect(ContactGroup.confidants.members.allSatisfy { !team.contains($0) })
    }

    @Test(arguments: ContactGroup.emergencyGroups)
    func `Everyone in an emergency group can be called`(group: ContactGroup) {
        #expect(group.members.allSatisfy { $0.phone != nil })
    }

    /// The name is the identity, so two different people never share one.
    @Test func `No two people share a name`() {
        var byName: [PersonNameComponents: Person] = [:]
        for person in everyone {
            if let other = byName[person.name] { #expect(other == person, "two people named \(person.name.formatted())") }
            byName[person.name] = person
        }
    }

    @Test(arguments: ContactGroup.allCases)
    func `No one is twice in a group`(group: ContactGroup) {
        #expect(Set(group.members).count == group.members.count)
    }

    /// Mobile numbers as `06 12 34 56 78`, landlines as `0182 61 26 76`
    /// (area code, then pairs): ten digits, the way Dutch numbers are written.
    @Test func `Every phone number is written the Dutch way and every photo is https`() {
        let dutch = /0(6( \d\d){4}|\d{3}( \d\d){3})/
        for person in everyone {
            if let phone = person.phone { #expect(phone.wholeMatch(of: dutch) != nil, "\(person.name.formatted()): \(phone)") }
            if let url = person.photoURL { #expect(url.scheme == "https", "\(person.name.formatted()): \(url)") }
        }
    }

    @Test func `The organisation follows from the groups`() {
        #expect(ContactGroup.rotex.members.allSatisfy { $0.organisation == .rotex })
        #expect(ContactGroup.mdjc.members.allSatisfy { $0.organisation == .rotary })
        #expect(ContactGroup.confidants.members.allSatisfy { $0.organisation == nil })
    }

    /// A district number is an identifier: never "1.590" or "1,590".
    @Test func `A district number is shown as written`() {
        var dutch = Role.districtYouthCommissioner(district: 1590).title
        dutch.locale = Locale(identifier: "nl")
        #expect(String(localized: dutch) == "Districtsjeugdcommissaris 1590")
    }

    /// Text comes from RotaryCore's String Catalog, not from the caller's bundle.
    @Test func `Role titles come from the module's catalog`() {
        var dutch = Role.secretary.title
        dutch.locale = Locale(identifier: "nl")
        #expect(String(localized: dutch) == "Secretaris")
        var english = Role.secretary.title
        english.locale = Locale(identifier: "en")
        #expect(String(localized: english) == "Secretary")
    }
}
