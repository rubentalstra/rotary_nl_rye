import Observation

/// Where the app is: the selected tab. A screen that opens another tab (the
/// home grid, a notification later) asks the router instead of holding a
/// binding of its own.
@Observable
final class AppRouter {
    var selectedTab: AppTab = .home

    /// Opens a tab.
    func show(_ tab: AppTab) {
        selectedTab = tab
    }
}
