import RotaryCore
import SwiftUI

/// The exchange programmes, each opening its own page, and below them the
/// podcast and the video to listen to and watch.
struct ProgrammesView: View {
    @State private var playingVideo: PromoVideo?
    @Environment(PodcastPlayer.self) private var podcast

    var body: some View {
        List {
            Section {
                ForEach(ExchangeProgramme.allCases) { programme in
                    NavigationLink(value: programme) {
                        ProgrammeRow(programme: programme)
                    }
                }
            } header: {
                Text("Uitwisselingen")
            }

            Section("Luister en kijk") {
                NavigationLink(value: ProgrammesPage.podcast) {
                    MediaRow(title: Text("Podcast"), subtitle: Text("Gastouders vertellen over hun uitwisselingsstudent"), systemImage: "waveform", tint: .purple)
                }
                ForEach(PromoVideo.allCases) { video in
                    Button {
                        podcast.pause()
                        playingVideo = video
                    } label: {
                        MediaRow(title: Text(video.title), subtitle: Text(video.summary), systemImage: "play.fill", tint: .red)
                    }
                    .tint(.primary)
                }
            }
        }
        .navigationTitle(Text("Programma's"))
        .navigationDestination(for: ProgrammesPage.self) { page in
            switch page {
            case .podcast: PodcastView()
            }
        }
        .fullScreenCover(item: $playingVideo) { video in
            VideoPlayerView(video: video)
        }
    }
}

/// The pages under Programmes besides the programmes themselves.
nonisolated enum ProgrammesPage: Hashable {
    case podcast
}

/// A row for something to listen to or watch, with its symbol in a coloured
/// square as in Settings.
private struct MediaRow: View {
    let title: Text
    let subtitle: Text
    let systemImage: String
    let tint: Color

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: systemImage)
                .font(.body.weight(.semibold))
                .foregroundStyle(.white)
                .frame(width: 36, height: 36)
                .background(tint.gradient, in: .rect(cornerRadius: 8))
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 2) {
                title
                    .font(.body)
                subtitle
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 2)
    }
}

#Preview {
    NavigationStack {
        ProgrammesView()
    }
    .environment(PodcastPlayer())
}
