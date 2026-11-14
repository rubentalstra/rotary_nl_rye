import RotaryCore
import SwiftUI

/// A programme: its photo or symbol, name, one line on it and who it is for.
struct ProgrammeRow: View {
    let programme: ExchangeProgramme
    @ScaledMetric(relativeTo: .headline) private var thumbnailSize: CGFloat = 64

    var body: some View {
        HStack(spacing: 14) {
            ProgrammeThumbnail(programme: programme)
                .frame(width: thumbnailSize, height: thumbnailSize)
                .clipShape(.rect(cornerRadius: 12))
            VStack(alignment: .leading, spacing: 3) {
                Text(programme.title)
                    .font(.headline)
                Text(programme.tagline)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                // Who it is for decides whether to read on, so it reads in full colour, as on the camps.
                Label {
                    Text(programme.ageText)
                } icon: {
                    Image(systemName: "person")
                        .foregroundStyle(.tint)
                }
                .labelStyle(.titleAndIcon)
                .imageScale(.small)
                .font(.subheadline.weight(.medium))
                .padding(.top, 2)
            }
        }
        .padding(.vertical, 4)
    }
}

/// The programme's first photo, or its symbol on the accent colour when it has
/// none.
struct ProgrammeThumbnail: View {
    let programme: ExchangeProgramme

    var body: some View {
        if let photo = programme.photos.first {
            Image(photo.image)
                .resizable()
                .scaledToFill()
                .accessibilityHidden(true)
        } else {
            Rectangle()
                .fill(Color.accentColor.gradient)
                .overlay {
                    Image(systemName: programme.systemImage)
                        .font(.title2)
                        .foregroundStyle(.white)
                }
                .accessibilityHidden(true)
        }
    }
}
