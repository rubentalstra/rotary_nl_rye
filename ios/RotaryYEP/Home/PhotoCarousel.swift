import SwiftUI

/// The home page's photos: a paging carousel with the next photo peeking in,
/// a caption on each, page dots, and an automatic turn every few seconds that
/// pauses while someone scrolls it and stays off with Reduce Motion.
struct PhotoCarousel: View {
    @State private var current: HomePhoto? = HomePhoto.allCases.first
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        VStack(spacing: 10) {
            ScrollView(.horizontal) {
                LazyHStack(spacing: 12) {
                    ForEach(HomePhoto.allCases) { photo in
                        PhotoCard(photo: photo)
                            .containerRelativeFrame(.horizontal)
                            .scrollTransition(axis: .horizontal) { content, phase in
                                content
                                    .scaleEffect(phase.isIdentity ? 1 : 0.92)
                                    .opacity(phase.isIdentity ? 1 : 0.7)
                            }
                    }
                }
                .scrollTargetLayout()
            }
            .scrollTargetBehavior(.viewAligned)
            .scrollPosition(id: $current)
            .scrollIndicators(.hidden)
            // The cards keep the page margins and the next one peeks in.
            .safeAreaPadding(.horizontal, 20)
            PageDots(current: current)
        }
        .task(id: reduceMotion) {
            guard !reduceMotion else { return }
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(5))
                guard !Task.isCancelled else { return }
                withAnimation(.smooth) {
                    current = current?.next
                }
            }
        }
    }
}

/// One photo with its caption under it: some photos are posters with text of
/// their own, so nothing is drawn over them.
private struct PhotoCard: View {
    let photo: HomePhoto

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Color.clear
                .aspectRatio(16 / 10, contentMode: .fit)
                .overlay {
                    Image(photo.image)
                        .resizable()
                        .scaledToFill()
                }
                .clipShape(.rect(cornerRadius: 24))
            Text(photo.caption)
                .font(.footnote.weight(.medium))
                .foregroundStyle(.secondary)
                .lineLimit(1)
                .padding(.horizontal, 4)
        }
        .accessibilityElement(children: .ignore)
            .accessibilityLabel(Text(photo.caption))
            .accessibilityAddTraits(.isImage)
    }
}

/// A dot per photo, the current one wide.
private struct PageDots: View {
    let current: HomePhoto?

    var body: some View {
        HStack(spacing: 6) {
            ForEach(HomePhoto.allCases) { photo in
                Capsule()
                    .fill(photo == current ? Color.primary : Color.secondary.opacity(0.4))
                    .frame(width: photo == current ? 18 : 6, height: 6)
            }
        }
        .animation(.smooth, value: current)
        .accessibilityHidden(true)
    }
}

private extension HomePhoto {
    /// The photo after this one, back to the first after the last.
    var next: HomePhoto {
        let all = HomePhoto.allCases
        let index = all.firstIndex(of: self) ?? all.startIndex
        let after = all.index(after: index)
        return after == all.endIndex ? all[all.startIndex] : all[after]
    }
}

#Preview {
    PhotoCarousel()
}
