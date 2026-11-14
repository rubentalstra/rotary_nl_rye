import RotaryCore
import SwiftUI

/// The podcast: what it is, its episodes, and the controls of the one
/// playing. Playback goes on when a person leaves the page.
struct PodcastView: View {
    @Environment(PodcastPlayer.self) private var player

    var body: some View {
        List {
            PodcastHeader()
            if player.episode != nil {
                Section("Nu aan het afspelen") {
                    PlayerControls(player: player)
                }
            }
            Section("Afleveringen") {
                ForEach(PodcastEpisode.allCases) { episode in
                    EpisodeRow(episode: episode, player: player)
                }
            }
        }
        .navigationTitle(Text("Podcast"))
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// The podcast's artwork, name and what it is about, as the Podcasts app
/// shows a show.
private struct PodcastHeader: View {
    @ScaledMetric private var artworkSize: CGFloat = 132

    var body: some View {
        Section {
            VStack(spacing: 12) {
                PodcastArtwork()
                    .frame(width: artworkSize, height: artworkSize)
                Text("Rotary Youth Exchange Podcast")
                    .font(.title2.bold())
                    .multilineTextAlignment(.center)
                Text("Gastouders vertellen hoe het is om een uitwisselingsstudent in huis te hebben.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .listRowBackground(Color.clear)
        }
    }
}

/// The podcast's artwork: its symbol on purple, in the shape of a cover.
struct PodcastArtwork: View {
    var body: some View {
        GeometryReader { proxy in
            RoundedRectangle(cornerRadius: proxy.size.width * 0.18)
                .fill(Color.purple.gradient)
                .overlay {
                    Image(systemName: "waveform")
                        .font(.system(size: proxy.size.width * 0.45, weight: .semibold))
                        .foregroundStyle(.white)
                }
        }
        .aspectRatio(1, contentMode: .fit)
        .accessibilityHidden(true)
    }
}

/// An episode: its number, guests and summary, and a button that plays or
/// pauses it, with how far it is when it is the one loaded.
private struct EpisodeRow: View {
    let episode: PodcastEpisode
    let player: PodcastPlayer

    private var isCurrent: Bool { player.episode == episode }
    private var isPlaying: Bool { isCurrent && player.isPlaying }

    var body: some View {
        Button {
            isPlaying ? player.pause() : player.play(episode)
        } label: {
            HStack(alignment: .top, spacing: 14) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Aflevering \(episode.number)")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.secondary)
                        .textCase(.uppercase)
                    Text(verbatim: episode.guests)
                        .font(.headline)
                    Text(episode.summary)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                    if isCurrent, player.duration > 0 {
                        ProgressView(value: player.progress)
                            .padding(.top, 4)
                    }
                }
                Spacer(minLength: 0)
                Image(systemName: isPlaying ? "pause.circle.fill" : "play.circle.fill")
                    .font(.largeTitle)
                    .foregroundStyle(.tint)
                    .contentTransition(.symbolEffect(.replace))
                    .accessibilityHidden(true)
            }
            .padding(.vertical, 4)
            .contentShape(.rect)
        }
        .buttonStyle(.plain)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(.isButton)
        .accessibilityHint(isPlaying ? Text("Pauzeert de aflevering") : Text("Speelt de aflevering af"))
    }
}

/// The playing episode's position to drag, the time played and left, and
/// back, play or pause, and forward.
struct PlayerControls: View {
    let player: PodcastPlayer
    /// The slider's position: the time played, or where the finger is while dragging.
    @State private var position: TimeInterval = 0
    @State private var isScrubbing = false

    var body: some View {
        VStack(spacing: 12) {
            if let episode = player.episode {
                Text(verbatim: episode.guests)
                    .font(.headline)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            Slider(value: $position, in: 0...max(player.duration, 1)) {
                Text("Positie")
            } onEditingChanged: { editing in
                isScrubbing = editing
                if !editing {
                    player.seek(to: position)
                }
            }
            .disabled(player.duration == 0)
            .onChange(of: player.elapsed, initial: true) { _, elapsed in
                if !isScrubbing { position = elapsed }
            }
            HStack {
                Text(Duration.seconds(position), format: .time(pattern: .minuteSecond))
                Spacer()
                Text("-\(Duration.seconds(max(player.duration - position, 0)), format: .time(pattern: .minuteSecond))")
            }
            .font(.caption.monospacedDigit())
            .foregroundStyle(.secondary)
            .accessibilityHidden(true)

            HStack(spacing: 44) {
                Button {
                    player.skip(by: -PodcastPlayer.skipInterval)
                } label: {
                    Label("15 seconden terug", systemImage: "gobackward.15")
                }
                Button {
                    player.togglePlayback()
                } label: {
                    Label(player.isPlaying ? "Pauzeer" : "Speel af", systemImage: player.isPlaying ? "pause.fill" : "play.fill")
                        .font(.system(size: 40))
                        .contentTransition(.symbolEffect(.replace))
                }
                Button {
                    player.skip(by: PodcastPlayer.skipInterval)
                } label: {
                    Label("15 seconden vooruit", systemImage: "goforward.15")
                }
            }
            .labelStyle(.iconOnly)
            .font(.title)
            .buttonStyle(.borderless)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 4)
        }
        .padding(.vertical, 6)
    }
}

#Preview {
    NavigationStack {
        PodcastView()
    }
    .environment(PodcastPlayer())
}
