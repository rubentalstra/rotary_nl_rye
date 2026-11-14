import RotaryCore
import SwiftUI

/// The root of the Home tab: the Rotary Youth Exchange Netherlands banner,
/// the photo carousel, then a large tile for each part of the app.
struct HomeView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    Banner()
                    PhotoCarousel()
                    DestinationGrid()
                }
                .padding(.bottom, 24)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle(Text(AppTab.home.title))
            // The banner is the title: the bar stays out of the way until a screen is pushed.
            .toolbarVisibility(.hidden, for: .navigationBar)
            .navigationDestination(for: HomeDestination.self) { destination in
                switch destination {
                case .news:
                    NewsView()
                case .summerCamps:
                    CampsView()
                case .rotaryClubs:
                    RotaryClubsView()
                default:
                    ComingSoonView(title: destination.title, systemImage: destination.systemImage)
                        .navigationTitle(Text(destination.title))
                }
            }
        }
    }
}

/// The Rotary Youth Exchange Netherlands banner, straight on the page. In dark
/// mode the Asset Catalog gives its reversed variant, with white lettering.
private struct Banner: View {
    var body: some View {
        Image(.rotaryYouthExchangeBanner)
            .resizable()
            .scaledToFit()
            .padding(.horizontal, 24)
            .padding(.top, 8)
            .accessibilityLabel(Text(verbatim: "Rotary Youth Exchange Netherlands"))
            .accessibilityAddTraits(.isHeader)
    }
}

/// The tiles in rows: three to a row when they fit, as on a Pro Max, with a
/// last row of two wider tiles; two to a row on a smaller iPhone or with the
/// largest text sizes. The grid measures its own width to choose.
private struct DestinationGrid: View {
    @State private var width: CGFloat = 0
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize

    /// Three columns need about 120 points per tile.
    private var columns: Int {
        width >= 400 && !dynamicTypeSize.isAccessibilitySize ? 3 : 2
    }

    var body: some View {
        VStack(spacing: 12) {
            ForEach(TileRow.rows(of: columns)) { row in
                HStack(spacing: 12) {
                    ForEach(row.destinations) { destination in
                        NavigationLink(value: destination) {
                            DestinationTile(destination: destination)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
        }
        .padding(.horizontal, 20)
        .onGeometryChange(for: CGFloat.self) { proxy in
            proxy.size.width
        } action: { newWidth in
            width = newWidth
        }
    }
}

/// A row of tiles, identified by its first destination.
private struct TileRow: Identifiable {
    let destinations: [HomeDestination]

    var id: HomeDestination { destinations[0] }

    /// Every destination in rows of `columns`; the last row holds the rest.
    static func rows(of columns: Int) -> [TileRow] {
        stride(from: 0, to: HomeDestination.allCases.count, by: columns).map { start in
            let end = min(start + columns, HomeDestination.allCases.count)
            return TileRow(destinations: Array(HomeDestination.allCases[start..<end]))
        }
    }
}

/// One tile: a large icon in the app's accent colour with the title under it,
/// both centred, on the grouped surface. One colour for every tile keeps the
/// grid calm.
private struct DestinationTile: View {
    let destination: HomeDestination

    var body: some View {
        VStack(spacing: 10) {
            TileIcon(destination: destination)
            Text(destination.title)
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.primary)
                .lineLimit(2, reservesSpace: true)
                .multilineTextAlignment(.center)
        }
        .padding(.vertical, 18)
        .padding(.horizontal, 10)
        .frame(maxWidth: .infinity, minHeight: 120)
        .background(Color(.secondarySystemGroupedBackground), in: .rect(cornerRadius: 20))
        .contentShape(.rect(cornerRadius: 20))
        .accessibilityElement(children: .combine)
    }
}

/// The tile's symbol in the accent colour; the Rotary wheel for Rotary clubs.
private struct TileIcon: View {
    let destination: HomeDestination
    @ScaledMetric(relativeTo: .largeTitle) private var size = 36.0

    var body: some View {
        Group {
            if destination == .rotaryClubs {
                Image(.rotaryWheel)
                    .resizable()
                    .scaledToFit()
            } else {
                Image(systemName: destination.systemImage)
                    .resizable()
                    .scaledToFit()
                    .symbolRenderingMode(.hierarchical)
            }
        }
        .frame(width: size, height: size)
        .foregroundStyle(.tint)
        .accessibilityHidden(true)
    }
}

#Preview {
    HomeView()
}
