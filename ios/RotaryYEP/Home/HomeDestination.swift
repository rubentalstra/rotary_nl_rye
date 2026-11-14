import SwiftUI

/// The places the home page opens, one tile each, in the order they show.
nonisolated enum HomeDestination: CaseIterable, Identifiable, Hashable {
    case programmes
    case news
    case calendar
    case outbound
    case inbound
    case rebound
    case summerCamps
    case rotaryClubs

    var id: Self { self }

    var title: LocalizedStringResource {
        switch self {
        case .programmes: LocalizedStringResource("Programma's", comment: "Home tile: the exchange programmes.")
        case .news: LocalizedStringResource("Nieuws", comment: "Home tile: news.")
        case .calendar: LocalizedStringResource("Agenda", comment: "Home tile: the calendar of events.")
        case .outbound: LocalizedStringResource("Op exchange", comment: "Home tile: for Dutch students going abroad.")
        case .inbound: LocalizedStringResource("Naar Nederland", comment: "Home tile: for foreign students coming to the Netherlands.")
        case .rebound: LocalizedStringResource("Rebound", comment: "Home tile: for students back from their exchange.")
        case .summerCamps: LocalizedStringResource("Zomerkampen", comment: "Home tile: the list of summer camps.")
        case .rotaryClubs: LocalizedStringResource("Voor Rotary-clubs", comment: "Home tile: information for Rotary clubs.")
        }
    }

    /// The SF Symbol of the tile; the Rotary clubs tile shows the Rotary wheel instead.
    var systemImage: String {
        switch self {
        case .programmes: "list.bullet.rectangle.portrait"
        case .news: "newspaper"
        case .calendar: "calendar"
        case .outbound: "airplane.departure"
        case .inbound: "airplane.arrival"
        case .rebound: "house.and.flag"
        case .summerCamps: "tent"
        case .rotaryClubs: "building.columns"
        }
    }
}
