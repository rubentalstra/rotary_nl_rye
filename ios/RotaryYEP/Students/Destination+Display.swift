import RotaryStudents
import SwiftUI

extension Destination {
    /// The country's name in the app's language, or "Europa".
    var name: String {
        switch self {
        case .country(let region): region.name
        case .europe: String(localized: "Europa", comment: "Students: the destination of a student who went somewhere in Europe.")
        }
    }

    /// The country's flag, or the European flag.
    var flag: String {
        switch self {
        case .country(let region): region.flag
        case .europe: Locale.Region("EU").flag
        }
    }
}
