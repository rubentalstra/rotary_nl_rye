import SwiftUI

/// Photos to swipe through, with page dots; a tap opens the photo full screen,
/// zooming out of the gallery.
struct PhotoGallery: View {
    let photos: [ProgrammePhoto]
    @State private var selection: ProgrammePhoto?
    @State private var viewing: ProgrammePhoto?
    @Namespace private var zoom
    @ScaledMetric private var height: CGFloat = 260

    init(photos: [ProgrammePhoto]) {
        self.photos = photos
        self.selection = photos.first
    }

    var body: some View {
        TabView(selection: $selection) {
            ForEach(photos) { photo in
                Button {
                    viewing = photo
                } label: {
                    Image(photo.image)
                        .resizable()
                        .scaledToFill()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .clipped()
                        .contentShape(.rect)
                }
                .buttonStyle(.plain)
                .matchedTransitionSource(id: photo, in: zoom)
                .accessibilityLabel(Text(photo.caption))
                .accessibilityHint(Text("Toont de foto schermvullend"))
                .tag(Optional(photo))
            }
        }
        .tabViewStyle(.page(indexDisplayMode: photos.count > 1 ? .always : .never))
        .frame(height: min(height, 420))
        .fullScreenCover(item: $viewing) { photo in
            // Swiping full screen moves the gallery along, so closing lands on the same photo.
            PhotoPager(photos: photos, selection: $selection)
                .navigationTransition(.zoom(sourceID: photo, in: zoom))
        }
    }
}

/// The photos full screen on black, swiped through, each with its caption.
private struct PhotoPager: View {
    let photos: [ProgrammePhoto]
    @Binding var selection: ProgrammePhoto?
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            TabView(selection: $selection) {
                ForEach(photos) { photo in
                    VStack(spacing: 16) {
                        Image(photo.image)
                            .resizable()
                            .scaledToFit()
                            .accessibilityLabel(Text(photo.caption))
                        Text(photo.caption)
                            .font(.subheadline)
                            .foregroundStyle(.white.opacity(0.8))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                            .accessibilityHidden(true)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .tag(Optional(photo))
                }
            }
            .tabViewStyle(.page(indexDisplayMode: photos.count > 1 ? .always : .never))
            .background(.black)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(role: .close) {
                        dismiss()
                    }
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}
