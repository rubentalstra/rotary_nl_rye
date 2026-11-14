package com.caelitechnologies.rotary_nl_rye.navigation

import androidx.navigation3.runtime.NavKey

/** Moves through the app: switches tabs, opens screens, and goes back. */
class Navigator(private val state: NavigationState) {
    /** Switches to a tab, or opens a screen on top of the selected tab. */
    fun navigate(route: NavKey) {
        if (route in state.backStacks.keys) {
            state.topLevelRoute = route
        } else {
            state.backStacks.getValue(state.topLevelRoute).add(route)
        }
    }

    /** Back: the previous screen, or from a tab's first screen to Home. */
    fun goBack() {
        val stack = state.backStacks.getValue(state.topLevelRoute)
        if (stack.last() == state.topLevelRoute) {
            state.topLevelRoute = state.startRoute
        } else {
            stack.removeLastOrNull()
        }
    }
}
