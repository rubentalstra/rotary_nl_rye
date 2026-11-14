package com.caelitechnologies.rotary_nl_rye.programmes

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme

/** The photos shown with a programme, from the students who took part, each with what it shows. */
enum class ProgrammePhoto(@param:DrawableRes val image: Int, @param:StringRes val caption: Int) {
    ArrivalBrazil(R.drawable.programme_photo_arrival_brazil, R.string.programme_photo_arrival_brazil),
    ArrivalCanada(R.drawable.programme_photo_arrival_canada, R.string.programme_photo_arrival_canada),
    ArrivalItaly(R.drawable.programme_photo_arrival_italy, R.string.programme_photo_arrival_italy),
    HostClub(R.drawable.programme_photo_host_club, R.string.programme_photo_host_club),
    AmazonTour(R.drawable.programme_photo_amazon_tour, R.string.programme_photo_amazon_tour),
    RiverDolphins(R.drawable.programme_photo_river_dolphins, R.string.programme_photo_river_dolphins),
}

/** The programme's photos, the first one leading; none for a programme without photos yet. */
val ExchangeProgramme.photos: List<ProgrammePhoto>
    get() = when (this) {
        ExchangeProgramme.LongTerm -> listOf(ProgrammePhoto.ArrivalBrazil, ProgrammePhoto.ArrivalCanada, ProgrammePhoto.ArrivalItaly, ProgrammePhoto.HostClub)
        ExchangeProgramme.FamilyToFamily -> emptyList()
        ExchangeProgramme.SummerCamps -> listOf(ProgrammePhoto.AmazonTour, ProgrammePhoto.RiverDolphins)
    }
