import SimpleIcons
import SimpleIconsSwiftUI
import SwiftUI

/// A brand's logo (WhatsApp, Instagram) from Simple Icons, drawn in the
/// foreground style at the size of an SF Symbol in the given text style, and
/// growing with Dynamic Type as a symbol does. Only the icons named in the
/// code end up in the app.
struct BrandIcon: View {
    let icon: SimpleIcon
    @ScaledMetric private var size: Double

    init(_ icon: SimpleIcon, relativeTo textStyle: Font.TextStyle = .body) {
        self.icon = icon
        _size = ScaledMetric(wrappedValue: Self.baseSize(for: textStyle), relativeTo: textStyle)
    }

    var body: some View {
        SimpleIconView(icon)
            .frame(width: size, height: size)
            .accessibilityHidden(true)
    }

    /// The point size of a symbol in each text style at the default Dynamic Type size.
    private static func baseSize(for textStyle: Font.TextStyle) -> Double {
        switch textStyle {
        case .largeTitle: 30
        case .title: 25
        case .title2: 21
        case .title3: 19
        case .headline, .body: 17
        case .callout: 16
        case .subheadline: 15
        case .footnote: 13
        case .caption: 12
        case .caption2: 11
        @unknown default: 17
        }
    }
}

#Preview {
    Label {
        Text(verbatim: "WhatsApp")
    } icon: {
        BrandIcon(.whatsapp())
    }
}
