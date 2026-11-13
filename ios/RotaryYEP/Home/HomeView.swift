import SwiftUI

/// The root of the home tab.
struct HomeView: View {
    var body: some View {
        NavigationStack {
            ComingSoonView(title: AppTab.home.title, systemImage: AppTab.home.systemImage)
                .navigationTitle(Text(AppTab.home.title))
        }
    }
}

#Preview {
    HomeView()
}
