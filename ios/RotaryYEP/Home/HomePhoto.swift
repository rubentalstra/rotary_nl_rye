import SwiftUI

/// The photos of the home page carousel, in the order they show.
enum HomePhoto: CaseIterable, Identifiable {
    case informationMorning
    case outbounds
    case inbounds
    case arrival

    var id: Self { self }

    var image: ImageResource {
        switch self {
        case .informationMorning: .homePhotoInformationMorning
        case .outbounds: .homePhotoOutbounds
        case .inbounds: .homePhotoInbounds
        case .arrival: .homePhotoArrival
        }
    }

    /// What the photo shows, over its bottom edge and for VoiceOver.
    var caption: LocalizedStringResource {
        switch self {
        case .informationMorning: LocalizedStringResource("Informatieochtend, 19 september 2026", comment: "Home carousel: caption of a photo of the information morning.")
        case .outbounds: LocalizedStringResource("De outbounds van 2025-2026", comment: "Home carousel: caption of a group photo of the Dutch students going abroad that year.")
        case .inbounds: LocalizedStringResource("Inbounds met de vlaggen van hun land", comment: "Home carousel: caption of a photo of foreign students holding their flags.")
        case .arrival: LocalizedStringResource("Aankomst van een inbound op Schiphol", comment: "Home carousel: caption of a photo of a foreign student arriving at Schiphol airport.")
        }
    }
}
