import AVKit
import RotaryNews
import SwiftUI

/// A news article to read: its cover, title and blocks in order, with
/// images whole and a video in the system player.
struct ArticleView: View {
    let item: NewsItem

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                NewsCover(url: item.coverURL)
                    .frame(maxHeight: 200)
                Text(item.title)
                    .font(.largeTitle.bold())
                if case .article(let blocks) = item.content {
                    ForEach(blocks, id: \.self) { block in
                        ArticleBlockView(block: block)
                    }
                }
            }
            .padding()
            .frame(maxWidth: 700, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// One block of an article.
private struct ArticleBlockView: View {
    let block: NewsItem.ArticleBlock

    var body: some View {
        switch block {
        case .heading(let text):
            Text(verbatim: text)
                .font(.title2.bold())
        case .paragraph(let text):
            Text(verbatim: text)
                .font(.body)
                .textSelection(.enabled)
        case .image(let url):
            AsyncImage(url: url) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                ProgressView()
                    .frame(maxWidth: .infinity, minHeight: 120)
            }
            .clipShape(.rect(cornerRadius: 12))
            .accessibilityHidden(true)
        case .video(let url):
            ArticleVideo(url: url)
        }
    }
}

/// A video in the system player, made when it appears.
private struct ArticleVideo: View {
    let url: URL
    @State private var player: AVPlayer?

    var body: some View {
        VideoPlayer(player: player)
            .aspectRatio(16 / 9, contentMode: .fit)
            .clipShape(.rect(cornerRadius: 12))
            .task {
                player = AVPlayer(url: url)
            }
            .onDisappear {
                player?.pause()
            }
    }
}
