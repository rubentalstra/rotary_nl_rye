import SwiftUI

/// The root of the about tab.
struct AboutView: View {
    var body: some View {
        NavigationStack {
            ComingSoonView(title: AppTab.about.title, systemImage: AppTab.about.systemImage)
                .navigationTitle(Text(AppTab.about.title))
        }
    }
}

#Preview {
    AboutView()
}
