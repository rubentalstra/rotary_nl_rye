import AVKit
import RotaryCore
import SwiftUI

/// A video full screen with the system's playback controls; it starts by
/// itself and stops when closed.
struct VideoPlayerView: View {
    let video: PromoVideo
    @State private var player: AVPlayer
    @Environment(\.dismiss) private var dismiss

    init(video: PromoVideo) {
        self.video = video
        self.player = AVPlayer(url: video.url)
    }

    var body: some View {
        NavigationStack {
            VideoPlayer(player: player)
                .ignoresSafeArea(edges: .bottom)
                .background(.black)
                .navigationTitle(Text(video.title))
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .topBarTrailing) {
                        Button(role: .close) {
                            dismiss()
                        }
                    }
                }
        }
        .preferredColorScheme(.dark)
        .onAppear {
            try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .moviePlayback)
            player.play()
        }
        .onDisappear {
            player.pause()
        }
    }
}
