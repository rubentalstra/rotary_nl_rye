import SwiftUI

/// A person's photo on its own, as large as the screen allows. It zooms in
/// from the photo that was tapped and closes with a swipe down or Close.
struct PhotoViewer: View {
    let url: URL
    let name: PersonNameComponents
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            AsyncImage(url: url) { phase in
                if let image = phase.image {
                    image.resizable().scaledToFit()
                } else {
                    ProgressView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(.black)
            .accessibilityLabel(Text("Foto van \(name.formatted())"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(role: .close) {
                        dismiss()
                    }
                }
            }
        }
        .colorScheme(.dark)
    }
}
