package com.caelitechnologies.rotary_nl_rye.home

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.R

/** The photos of the home page carousel, in the order they show, each with its caption. */
enum class HomePhoto(@param:DrawableRes val image: Int, @param:StringRes val caption: Int) {
    InformationMorning(R.drawable.home_photo_information_morning, R.string.home_photo_information_morning),
    Outbounds(R.drawable.home_photo_outbounds, R.string.home_photo_outbounds),
    Inbounds(R.drawable.home_photo_inbounds, R.string.home_photo_inbounds),
    Arrival(R.drawable.home_photo_arrival, R.string.home_photo_arrival),
}
