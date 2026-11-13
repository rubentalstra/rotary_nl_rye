import SwiftUI

/// What a screen shows until it is rebuilt from the v13 app (epic #74).
struct ComingSoonView: View {
    let title: LocalizedStringResource
    let systemImage: String

    var body: some View {
        ContentUnavailableView {
            Label(title, systemImage: systemImage)
        } description: {
            Text("Dit scherm komt in een volgende versie.")
        }
    }
}

#Preview {
    ComingSoonView(title: AppTab.home.title, systemImage: AppTab.home.systemImage)
}
