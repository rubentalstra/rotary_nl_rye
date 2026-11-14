import RotaryCore
import SwiftUI

/// The playing podcast episode above the tab bar, as Music and Podcasts show
/// it: tap it for the podcast page, or pause and skip from the bar itself.
struct NowPlayingAccessory: ViewModifier {
    @Environment(PodcastPlayer.self) private var player

    func body(content: Content) -> some View {
        if #available(iOS 26.1, *) {
            content
                .tabViewBottomAccessory(isEnabled: player.episode != nil) {
                    NowPlayingBar(player: player)
                }
        } else {
            content
        }
    }
}

/// The bar's contents; the forward button only when the bar is full width.
private struct NowPlayingBar: View {
    let player: PodcastPlayer
    @State private var showsPodcast = false
    @Environment(\.tabViewBottomAccessoryPlacement) private var placement

    var body: some View {
        HStack(spacing: 12) {
            Button {
                showsPodcast = true
            } label: {
                HStack(spacing: 10) {
                    PodcastArtwork()
                        .frame(width: 30, height: 30)
                    VStack(alignment: .leading, spacing: 0) {
                        Text(verbatim: player.episode?.guests ?? "")
                            .font(.subheadline.weight(.semibold))
                            .lineLimit(1)
                        Text("Podcast")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                    }
                    Spacer(minLength: 0)
                }
                .contentShape(.rect)
            }
            .buttonStyle(.plain)
            .accessibilityHint(Text("Opent de podcast"))

            Button {
                player.togglePlayback()
            } label: {
                Label(player.isPlaying ? "Pauzeer" : "Speel af", systemImage: player.isPlaying ? "pause.fill" : "play.fill")
                    .contentTransition(.symbolEffect(.replace))
            }
            if placement != .inline {
                Button {
                    player.skip(by: PodcastPlayer.skipInterval)
                } label: {
                    Label("15 seconden vooruit", systemImage: "goforward.15")
                }
            }
        }
        .labelStyle(.iconOnly)
        .font(.title3)
        .buttonStyle(.borderless)
        .tint(.primary)
        .padding(.horizontal, 14)
        .sheet(isPresented: $showsPodcast) {
            NavigationStack {
                PodcastView()
                    .toolbar {
                        ToolbarItem(placement: .topBarTrailing) {
                            Button(role: .close) {
                                showsPodcast = false
                            }
                        }
                    }
            }
        }
    }
}
