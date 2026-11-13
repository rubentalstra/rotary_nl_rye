import SwiftUI

/// The root of the contact tab.
struct ContactView: View {
    var body: some View {
        NavigationStack {
            ComingSoonView(title: AppTab.contact.title, systemImage: AppTab.contact.systemImage)
                .navigationTitle(Text(AppTab.contact.title))
        }
    }
}

#Preview {
    ContactView()
}
