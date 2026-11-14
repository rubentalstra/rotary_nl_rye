public import Foundation

/// The pages for students coming to the Netherlands for a school year, as
/// v13 wrote them (in English): welcome, flight and arrival, language,
/// insurance and travel.
public enum InboundGuide: CaseIterable, Identifiable, Hashable, Sendable {
    case welcome
    case flightAndArrival
    case language
    case insurance
    case travel

    public var id: Self { self }

    public var title: LocalizedStringResource {
        switch self {
        case .welcome: LocalizedStringResource("Welcome to the Netherlands!", bundle: #bundle, comment: "InboundGuide: the title of a page.")
        case .flightAndArrival: LocalizedStringResource("Flight and arrival", bundle: #bundle, comment: "InboundGuide: the title of a page.")
        case .language: LocalizedStringResource("Language", bundle: #bundle, comment: "InboundGuide: the title of a page.")
        case .insurance: LocalizedStringResource("Insurance", bundle: #bundle, comment: "InboundGuide: the title of a page.")
        case .travel: LocalizedStringResource("Travel", bundle: #bundle, comment: "InboundGuide: the title of a page.")
        }
    }

    /// One line on what the page tells.
    public var subtitle: LocalizedStringResource {
        switch self {
        case .welcome: LocalizedStringResource("Important information for new students", bundle: #bundle, comment: "InboundGuide: what a page tells, under its title in the list.")
        case .flightAndArrival: LocalizedStringResource("Information about traveling to the Netherlands", bundle: #bundle, comment: "InboundGuide: what a page tells, under its title in the list.")
        case .language: LocalizedStringResource("Learning Dutch and language assistance", bundle: #bundle, comment: "InboundGuide: what a page tells, under its title in the list.")
        case .insurance: LocalizedStringResource("Healthcare and insurance information", bundle: #bundle, comment: "InboundGuide: what a page tells, under its title in the list.")
        case .travel: LocalizedStringResource("Tips for exploring the Netherlands and Europe", bundle: #bundle, comment: "InboundGuide: what a page tells, under its title in the list.")
        }
    }

    public var systemImage: String {
        switch self {
        case .welcome: "hand.wave"
        case .flightAndArrival: "airplane.arrival"
        case .language: "character.bubble"
        case .insurance: "cross.case"
        case .travel: "map"
        }
    }

    public var sections: [GuideSection] {
        switch self {
        case .welcome:
            [
                GuideSection(nil, [
                    .text(LocalizedStringResource("We are very excited about your upcoming stay with us and looking forward to meeting you. We hope and believe that you will enjoy your stay with us. We have an exciting and active Rotary International Youth Exchange Program with students from around the world.", bundle: #bundle, comment: "InboundGuide welcome: a paragraph.")),
                    .fact(systemImage: "globe", title: LocalizedStringResource("Exchange students", bundle: #bundle, comment: "InboundGuide welcome: what a fact is about."), value: LocalizedStringResource("35 to 50 every year", bundle: #bundle, comment: "InboundGuide welcome: the fact.")),
                    .point(systemImage: "heart", title: nil, text: LocalizedStringResource("You will make friends from all over the world, in addition to making many Dutch friends in your school and Rotary.", bundle: #bundle, comment: "InboundGuide welcome: a point explained.")),
                ]),
                GuideSection(LocalizedStringResource("Your exchange experience", bundle: #bundle, comment: "InboundGuide welcome: a section heading."), [
                    .point(systemImage: "sparkles", title: LocalizedStringResource("One of the best years of your life", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: LocalizedStringResource("A wonderful experience in a new culture, with a new language but also with some rules to make sure that your stay will be both enjoyable for you and us alike. These rules are consistent with the International Rotary rules.", bundle: #bundle, comment: "InboundGuide welcome: a point explained.")),
                    .point(systemImage: "rosette", title: LocalizedStringResource("Ambassador", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: LocalizedStringResource("Please remember that under all circumstances you are an ambassador of Rotary and will have to behave accordingly. You will also be an ambassador of your country. Both roles will be with you at all times, and you will be regarded and judged as such throughout your exchange.", bundle: #bundle, comment: "InboundGuide welcome: a point explained.")),
                ]),
                GuideSection(LocalizedStringResource("Our motto", bundle: #bundle, comment: "InboundGuide welcome: a section heading."), [
                    .text(LocalizedStringResource("Live by these values during your exchange:", bundle: #bundle, comment: "InboundGuide welcome: a paragraph.")),
                    .point(systemImage: "checkmark.circle", title: LocalizedStringResource("Be grateful", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: nil),
                    .point(systemImage: "checkmark.circle", title: LocalizedStringResource("Be on purpose", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: nil),
                    .point(systemImage: "checkmark.circle", title: LocalizedStringResource("Be of service", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: nil),
                    .point(systemImage: "checkmark.circle", title: LocalizedStringResource("Be here now", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: nil),
                    .point(systemImage: "checkmark.circle", title: LocalizedStringResource("Be first", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: nil),
                    .point(systemImage: "checkmark.circle", title: LocalizedStringResource("Be curious", bundle: #bundle, comment: "InboundGuide welcome: a point."), text: nil),
                ]),
            ]
        case .flightAndArrival:
            [
                GuideSection(LocalizedStringResource("Flight", bundle: #bundle, comment: "InboundGuide flightAndArrival: a section heading."), [
                    .text(LocalizedStringResource("You should obtain a changeable open return airline ticket. Your arrival airport is Amsterdam Airport Schiphol.", bundle: #bundle, comment: "InboundGuide flightAndArrival: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("Arrival", bundle: #bundle, comment: "InboundGuide flightAndArrival: a section heading."), [
                    .text(LocalizedStringResource("More arrival information will be provided closer to your departure date.", bundle: #bundle, comment: "InboundGuide flightAndArrival: a paragraph.")),
                ]),
            ]
        case .language:
            [
                GuideSection(LocalizedStringResource("The challenge", bundle: #bundle, comment: "InboundGuide language: a section heading."), [
                    .text(LocalizedStringResource("There is no hiding it: Dutch is a very difficult language to learn. However, we do expect you to master the language, and within months after your arrival to be fluent in it.", bundle: #bundle, comment: "InboundGuide language: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("Dutch Orientation Course (DOC)", bundle: #bundle, comment: "InboundGuide language: a section heading."), [
                    .fact(systemImage: "calendar", title: LocalizedStringResource("When", bundle: #bundle, comment: "InboundGuide language: what a fact is about."), value: LocalizedStringResource("September and February", bundle: #bundle, comment: "InboundGuide language: the fact.")),
                    .fact(systemImage: "clock", title: LocalizedStringResource("How long", bundle: #bundle, comment: "InboundGuide language: what a fact is about."), value: LocalizedStringResource("6 intensive days", bundle: #bundle, comment: "InboundGuide language: the fact.")),
                    .fact(systemImage: "person.3", title: LocalizedStringResource("How", bundle: #bundle, comment: "InboundGuide language: what a fact is about."), value: LocalizedStringResource("In small groups", bundle: #bundle, comment: "InboundGuide language: the fact.")),
                    .fact(systemImage: "globe", title: LocalizedStringResource("What", bundle: #bundle, comment: "InboundGuide language: what a fact is about."), value: LocalizedStringResource("Language and culture", bundle: #bundle, comment: "InboundGuide language: the fact.")),
                    .note(LocalizedStringResource("Lots of fun included, with students from around the world!", bundle: #bundle, comment: "InboundGuide language: a remark.")),
                ]),
                GuideSection(LocalizedStringResource("Your host family", bundle: #bundle, comment: "InboundGuide language: a section heading."), [
                    .point(systemImage: "house", title: LocalizedStringResource("Your learning partners", bundle: #bundle, comment: "InboundGuide language: a point."), text: LocalizedStringResource("Your first host family will also help you to learn Dutch, and you will receive books to start learning the language as soon as you are in the Netherlands.", bundle: #bundle, comment: "InboundGuide language: a point explained.")),
                ]),
            ]
        case .insurance:
            [
                GuideSection(LocalizedStringResource("Compulsory coverage", bundle: #bundle, comment: "InboundGuide insurance: a section heading."), [
                    .text(LocalizedStringResource("The insurance policy from the Netherlands is compulsory. We will pre-insure you, so you are fully insured from the moment you land at Amsterdam Airport Schiphol until you leave from the airport again.", bundle: #bundle, comment: "InboundGuide insurance: a paragraph.")),
                ]),
                GuideSection(LocalizedStringResource("Coverage", bundle: #bundle, comment: "InboundGuide insurance: a section heading."), [
                    .step(title: LocalizedStringResource("Arrival at Schiphol", bundle: #bundle, comment: "InboundGuide insurance: a step or tip."), text: LocalizedStringResource("Coverage begins immediately upon landing.", bundle: #bundle, comment: "InboundGuide insurance: a step or tip explained.")),
                    .step(title: LocalizedStringResource("During your exchange", bundle: #bundle, comment: "InboundGuide insurance: a step or tip."), text: LocalizedStringResource("Full coverage throughout your stay.", bundle: #bundle, comment: "InboundGuide insurance: a step or tip explained.")),
                    .step(title: LocalizedStringResource("Departure", bundle: #bundle, comment: "InboundGuide insurance: a step or tip."), text: LocalizedStringResource("Coverage ends when you leave the airport.", bundle: #bundle, comment: "InboundGuide insurance: a step or tip explained.")),
                ]),
                GuideSection(LocalizedStringResource("Policy documents", bundle: #bundle, comment: "InboundGuide insurance: a section heading."), [
                    .point(systemImage: "envelope", title: nil, text: LocalizedStringResource("A copy of the insurance policy will be sent to you a few days before you leave your home country.", bundle: #bundle, comment: "InboundGuide insurance: a point explained.")),
                ]),
            ]
        case .travel:
            [
                GuideSection(LocalizedStringResource("Travel guidelines", bundle: #bundle, comment: "InboundGuide travel: a section heading."), [
                    .point(systemImage: "checkmark.circle", title: LocalizedStringResource("Allowed", bundle: #bundle, comment: "InboundGuide travel: a point."), text: LocalizedStringResource("Travel is allowed with your host family, with Rotary club members, and on authorised school trips. These rules apply both inside the Netherlands and abroad.", bundle: #bundle, comment: "InboundGuide travel: a point explained.")),
                    .point(systemImage: "xmark.circle", title: LocalizedStringResource("Not allowed", bundle: #bundle, comment: "InboundGuide travel: a point."), text: LocalizedStringResource("Visits to family or friends abroad are not permitted.", bundle: #bundle, comment: "InboundGuide travel: a point explained.")),
                ]),
                GuideSection(LocalizedStringResource("Holidays with your host family", bundle: #bundle, comment: "InboundGuide travel: a section heading."), [
                    .point(systemImage: "signature", title: LocalizedStringResource("Written approval from your parents", bundle: #bundle, comment: "InboundGuide travel: a point."), text: LocalizedStringResource("One of your host families might suggest a holiday somewhere abroad. This is usually fine when you have written approval from your parents.", bundle: #bundle, comment: "InboundGuide travel: a point explained.")),
                ]),
            ]
        }
    }
}
