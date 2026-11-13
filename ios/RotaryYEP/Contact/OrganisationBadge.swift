import RotaryCore
import SwiftUI

/// The logo of the organisation someone is part of, in a small circle that
/// sits on the edge of their photo.
struct OrganisationBadge: View {
    let organisation: Organisation
    let size: CGFloat

    var body: some View {
        OrganisationLogo(organisation: organisation)
            .padding(size * 0.16)
            .frame(width: size, height: size)
            .background(.background, in: .circle)
            .overlay {
                Circle().strokeBorder(.separator)
            }
            .accessibilityLabel(Text(organisation.name))
    }
}

/// An organisation's logo in its own colours: the Rotary wheel in Rotary
/// gold (a template image, so it takes the colour), the ROTEX logo as drawn.
struct OrganisationLogo: View {
    let organisation: Organisation

    var body: some View {
        switch organisation {
        case .rotary:
            Image(.rotaryWheel)
                .resizable()
                .scaledToFit()
                .foregroundStyle(Color(.rotaryGold))
        case .rotex:
            Image(.rotexLogo)
                .resizable()
                .scaledToFit()
        }
    }
}

extension Organisation {
    var name: LocalizedStringResource {
        switch self {
        case .rotary: "Rotary"
        case .rotex: "ROTEX"
        }
    }
}

#Preview {
    HStack {
        OrganisationBadge(organisation: .rotary, size: 40)
        OrganisationBadge(organisation: .rotex, size: 40)
    }
}
