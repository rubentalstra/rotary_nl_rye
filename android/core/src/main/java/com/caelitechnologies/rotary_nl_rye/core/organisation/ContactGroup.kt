// Generated from ios/RotaryKit/Sources/RotaryCore by scripts/dev/android-content.py:
// edit the Swift and run the script, never this file.
package com.caelitechnologies.rotary_nl_rye.core.organisation

import androidx.annotation.StringRes
import com.caelitechnologies.rotary_nl_rye.core.R

/**
 * A group of people under one heading: a team in the Contact tab, or a group
 * in the Emergency tab. Members are references to [Person] values, so a
 * person in two groups is still one person with one phone number.
 */
enum class ContactGroup(
    @param:StringRes val title: Int,
    @param:StringRes val summary: Int?,
) {
    Mdjc(R.string.group_mdjc, R.string.group_mdjc_summary),
    LongTerm(R.string.group_long_term, R.string.group_long_term_summary),
    ShortTerm(R.string.group_short_term, R.string.group_short_term_summary),
    Rotex(R.string.group_rotex, R.string.group_rotex_summary),
    Emergency(R.string.group_emergency, null),
    Confidants(R.string.group_confidants, R.string.group_confidants_summary);

    /** The people in the group, in the order it shows them. */
    val members: List<Person>
        get() = when (this) {
            Mdjc -> listOf(barbaraTusveld, clasineScheepers, evertMarseille, margaOosterveld, ernstZiengs, stevenStolp, ernaVanDijk, marioMeeuwse, judithSiebring, ericKamst, thijsKaas)
            LongTerm -> listOf(margaOosterveld, toonTerEllen, sandraCoolsWemer, jitteWigbold, jetBebseler, judithSiebring, benMureau, bettyRijkmansSiemens, basSiebring, stevenStolp, hillekeVanDerVeer, christianVanDam, rubenTalstra)
            ShortTerm -> listOf(janVanAller, willemijnVanWaes, marjaHofland, bettyRijkmansSiemens)
            Rotex -> listOf(anoukIJdema, quintenVanAar, marreKroese, sanderVanDam, emilyOdink, brittGroeneboer, madykeDeGroot, lysanneSmits, merleBreijer, philipienVanWaverenHogervorst, marcellaJorgeVaz, floorDeGraaf, cathelijneVanDerPluijm, mathildeVanDenBerg, boHeijns, tomPellicaan)
            Emergency -> listOf(barbaraTusveld, margaOosterveld, clasineScheepers, hillekeVanDerVeer)
            Confidants -> listOf(paulineMemelink, reinoutVriesendorp)
        }

    companion object {
        /** The teams of Rotary Youth Exchange Netherlands, in the order the Contact tab shows them. */
        val teams = listOf(Mdjc, LongTerm, ShortTerm, Rotex)

        /** Who to call in an emergency, in the order the Emergency tab shows them. */
        val emergencyGroups = listOf(Emergency, Confidants)
    }
}
