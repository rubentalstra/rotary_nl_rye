package com.caelitechnologies.rotary_nl_rye.camps

import androidx.lifecycle.ViewModel
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel

/** A camp's page: the camp, from the camps the app has loaded, by its identity. */
@HiltViewModel(assistedFactory = CampDetailViewModel.Factory::class)
class CampDetailViewModel @AssistedInject constructor(
    @Assisted id: Camp.Id,
    repository: CampRepository,
) : ViewModel() {
    /** The camp, or null when the app has not loaded it (after process death, before a reload). */
    val camp: Camp? = repository.camp(id)

    @AssistedFactory
    interface Factory {
        fun create(id: Camp.Id): CampDetailViewModel
    }
}
