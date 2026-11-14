package com.caelitechnologies.rotary_nl_rye.navigation

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.navigation3.runtime.NavKey
import com.caelitechnologies.rotary_nl_rye.R
import kotlinx.serialization.Serializable

/**
 * The app's top-level destinations, in the order they show in the
 * navigation bar (phones) or rail (tablets and unfolded foldables). Each is
 * the root of its own back stack. The icons are Material Symbols, outlined,
 * and filled when selected.
 */
@Serializable
enum class AppTab(
    @param:StringRes val label: Int,
    @param:DrawableRes val icon: Int,
    @param:DrawableRes val selectedIcon: Int,
) : NavKey {
    Home(R.string.tab_home, R.drawable.ic_tab_home, R.drawable.ic_tab_home_selected),
    About(R.string.tab_about, R.drawable.ic_tab_about, R.drawable.ic_tab_about_selected),
    Emergency(R.string.tab_emergency, R.drawable.ic_tab_emergency, R.drawable.ic_tab_emergency_selected),
    Contact(R.string.tab_contact, R.drawable.ic_tab_contact, R.drawable.ic_tab_contact_selected),
    Settings(R.string.tab_settings, R.drawable.ic_tab_settings, R.drawable.ic_tab_settings_selected),
}
