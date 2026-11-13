import SwiftUI

/// The app's tab bar. Each tab owns its navigation stack, so switching tabs
/// keeps where a person was in each.
struct MainTabView: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        @Bindable var router = router
        TabView(selection: $router.selectedTab) {
            Tab(AppTab.home.title, systemImage: AppTab.home.systemImage, value: .home) {
                HomeView()
            }
            Tab(AppTab.about.title, systemImage: AppTab.about.systemImage, value: .about) {
                AboutView()
            }
            Tab(AppTab.emergency.title, systemImage: AppTab.emergency.systemImage, value: .emergency) {
                EmergencyView()
            }
            Tab(AppTab.contact.title, systemImage: AppTab.contact.systemImage, value: .contact) {
                ContactView()
            }
            Tab(AppTab.settings.title, systemImage: AppTab.settings.systemImage, value: .settings) {
                SettingsView()
            }
        }
        .tabBarMinimizeBehavior(.onScrollDown)
    }
}

#Preview {
    MainTabView()
        .environment(AppRouter())
}
