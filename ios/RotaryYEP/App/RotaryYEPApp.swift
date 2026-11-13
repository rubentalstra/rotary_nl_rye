import SwiftUI

/// The app's entry point: one window scene for iPhone and iPad, with the
/// models every screen reads put in its environment.
@main
struct RotaryYEPApp: App {
    @State private var router = AppRouter()

    var body: some Scene {
        WindowGroup {
            MainTabView()
                .environment(router)
        }
    }
}
