import SwiftUI

/// The root of the emergency tab.
struct EmergencyView: View {
    var body: some View {
        NavigationStack {
            ComingSoonView(title: AppTab.emergency.title, systemImage: AppTab.emergency.systemImage)
                .navigationTitle(Text(AppTab.emergency.title))
        }
    }
}

#Preview {
    EmergencyView()
}
