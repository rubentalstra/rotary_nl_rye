import RotaryCore
import SwiftUI

/// The photos shown with a programme, from the students who took part.
enum ProgrammePhoto: CaseIterable, Identifiable, Hashable {
    case arrivalBrazil
    case arrivalCanada
    case arrivalItaly
    case hostClub
    case amazonTour
    case riverDolphins

    var id: Self { self }

    var image: ImageResource {
        switch self {
        case .arrivalBrazil: .programmePhotoOutboundNilla
        case .arrivalCanada: .programmePhotoOutboundSimon
        case .arrivalItaly: .programmePhotoOutboundArrival
        case .hostClub: .programmePhotoOutbound
        case .amazonTour: .programmePhotoAmazonTour
        case .riverDolphins: .programmePhotoAmazonTourGroup
        }
    }

    /// What the photo shows, under it and for VoiceOver.
    var caption: LocalizedStringResource {
        switch self {
        case .arrivalBrazil: LocalizedStringResource("Welkom in Brazilië", comment: "Programme photo: a Dutch student welcomed at the airport in Brazil.")
        case .arrivalCanada: LocalizedStringResource("Welkom in Canada", comment: "Programme photo: a Dutch student welcomed at the airport in Canada.")
        case .arrivalItaly: LocalizedStringResource("Welkom in Italië", comment: "Programme photo: a Dutch student welcomed at the airport in Italy.")
        case .hostClub: LocalizedStringResource("Bij de Rotary-club in het gastland", comment: "Programme photo: students with the members of their host Rotary club.")
        case .amazonTour: LocalizedStringResource("Zomerkamp Amazon Tour in Brazilië", comment: "Programme photo: a summer camp group with their flags on a boat on the Amazon.")
        case .riverDolphins: LocalizedStringResource("Zwemmen met roze rivierdolfijnen", comment: "Programme photo: summer camp members swimming with Amazon river dolphins.")
        }
    }
}

extension ExchangeProgramme {
    /// The programme's photos, the first one leading; none for a programme
    /// without photos yet.
    var photos: [ProgrammePhoto] {
        switch self {
        case .longTerm: [.arrivalBrazil, .arrivalCanada, .arrivalItaly, .hostClub]
        case .familyToFamily: []
        case .summerCamps: [.amazonTour, .riverDolphins]
        }
    }
}
