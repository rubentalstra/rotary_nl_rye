package com.caelitechnologies.rotary_nl_rye.ui.components

import androidx.annotation.DrawableRes
import com.caelitechnologies.rotary_nl_rye.R

/**
 * The Material Symbol for an SF Symbol that the shared content names for
 * iOS (a programme's highlight, a piece of a student guide); a star for a
 * symbol not mapped yet, which a test catches.
 */
@DrawableRes
fun materialSymbol(sfSymbol: String): Int = when (sfSymbol) {
    "airplane", "airplane.departure" -> R.drawable.ic_flight
    "airplane.arrival" -> R.drawable.ic_flight_land
    "book" -> R.drawable.ic_menu_book
    "bubble.left.and.bubble.right" -> R.drawable.ic_forum
    "calendar" -> R.drawable.ic_calendar
    "camera" -> R.drawable.ic_photo_camera
    "character.bubble" -> R.drawable.ic_translate
    "checkmark.circle" -> R.drawable.ic_check_circle
    "checkmark.seal" -> R.drawable.ic_verified
    "clock" -> R.drawable.ic_schedule
    "cross.case" -> R.drawable.ic_medical
    "envelope" -> R.drawable.ic_mail
    "envelope.badge" -> R.drawable.ic_mark_email_unread
    "figure.walk" -> R.drawable.ic_directions_walk
    "figure.walk.departure" -> R.drawable.ic_flight_takeoff
    "flag" -> R.drawable.ic_flag
    "globe", "globe.europe.africa" -> R.drawable.ic_public
    "graduationcap" -> R.drawable.ic_school
    "hand.wave" -> R.drawable.ic_waving_hand
    "heart" -> R.drawable.ic_favorite
    "house" -> R.drawable.ic_home
    "lightbulb" -> R.drawable.ic_lightbulb
    "map" -> R.drawable.ic_map
    "mountain.2" -> R.drawable.ic_landscape
    "person" -> R.drawable.ic_person
    "person.2" -> R.drawable.ic_group
    "person.3" -> R.drawable.ic_groups
    "person.fill.checkmark" -> R.drawable.ic_how_to_reg
    "rosette" -> R.drawable.ic_workspace_premium
    "signature" -> R.drawable.ic_signature
    "sparkles" -> R.drawable.ic_auto_awesome
    "sun.max" -> R.drawable.ic_sunny
    "tent", "tent.2" -> R.drawable.ic_dest_summer_camps
    "xmark.circle" -> R.drawable.ic_cancel
    else -> R.drawable.ic_star
}
