package com.caelitechnologies.rotary_nl_rye

import android.app.Application
import coil3.ImageLoader
import coil3.PlatformContext
import coil3.SingletonImageLoader
import coil3.network.okhttp.OkHttpNetworkFetcherFactory
import dagger.hilt.android.HiltAndroidApp
import okhttp3.OkHttpClient
import javax.inject.Inject

/**
 * The application: Hilt's root, and Coil's image loader, which loads the
 * photos through the app's one OkHttp client (and its connection pool).
 */
@HiltAndroidApp
class RotaryApplication : Application(), SingletonImageLoader.Factory {
    @Inject
    lateinit var okHttpClient: OkHttpClient

    override fun newImageLoader(context: PlatformContext): ImageLoader =
        ImageLoader.Builder(context)
            .components { add(OkHttpNetworkFetcherFactory(callFactory = { okHttpClient })) }
            .build()
}
