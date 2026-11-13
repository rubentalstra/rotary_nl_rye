import SwiftUI

/// The tabs of the app, in the order the tab bar shows them.
enum AppTab: Hashable, CaseIterable {
    case home
    case about
    case emergency
    case contact
    case settings

    /// The label under the tab's icon.
    var title: LocalizedStringResource {
        switch self {
        case .home: "Home"
        case .about: "Over"
        case .emergency: "Noodgeval"
        case .contact: "Contact"
        case .settings: "Instellingen"
        }
    }

    /// The SF Symbol of the tab; the tab bar fills it when selected.
    var systemImage: String {
        switch self {
        case .home: "house"
        case .about: "info.circle"
        case .emergency: "exclamationmark.triangle"
        case .contact: "person.2"
        case .settings: "gearshape"
        }
    }
}
