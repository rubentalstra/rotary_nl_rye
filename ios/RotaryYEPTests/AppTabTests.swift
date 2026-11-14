import Testing
import UIKit
@testable import RotaryYEP

@MainActor @Suite struct AppTabTests {
    @Test func `The tab bar has the five tabs of v13 in order`() {
        #expect(AppTab.allCases == [.home, .about, .emergency, .contact, .settings])
    }

    @Test(arguments: AppTab.allCases)
    func `Every tab icon is a real SF Symbol`(_ tab: AppTab) {
        #expect(UIImage(systemName: tab.systemImage) != nil, "\(tab.systemImage) is not an SF Symbol")
    }

    @Test func `The router opens a tab`() {
        let router = AppRouter()
        #expect(router.selectedTab == .home)
        router.show(.emergency)
        #expect(router.selectedTab == .emergency)
    }
}

@MainActor @Suite struct HomeDestinationTests {
    @Test(arguments: HomeDestination.allCases.filter { $0 != .rotaryClubs })
    func `Every tile icon is a real SF Symbol`(_ destination: HomeDestination) {
        #expect(UIImage(systemName: destination.systemImage) != nil, "\(destination.systemImage) is not an SF Symbol")
    }
}
