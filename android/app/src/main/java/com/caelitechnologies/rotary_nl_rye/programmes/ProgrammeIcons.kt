package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.annotation.DrawableRes
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme

/** The Material Symbol for a programme, where it has no photo. */
@get:DrawableRes
val ExchangeProgramme.icon: Int
    get() = when (this) {
        ExchangeProgramme.LongTerm -> R.drawable.ic_school
        ExchangeProgramme.FamilyToFamily -> R.drawable.ic_family
        ExchangeProgramme.SummerCamps -> R.drawable.ic_dest_summer_camps
    }
