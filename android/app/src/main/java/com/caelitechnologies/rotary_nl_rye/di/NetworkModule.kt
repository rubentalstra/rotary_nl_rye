package com.caelitechnologies.rotary_nl_rye.di

import android.content.Context
import com.caelitechnologies.rotary_nl_rye.camps.CampFeed
import com.caelitechnologies.rotary_nl_rye.core.networking.CachedFetch
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.Cache
import okhttp3.OkHttpClient
import java.io.File
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

/**
 * The app's one HTTP client, with an HTTP cache in the cache directory, so a
 * feed is revalidated online and its last copy is used offline; and the
 * feeds that use it.
 */
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    @Singleton
    fun okHttpClient(@ApplicationContext context: Context): OkHttpClient =
        OkHttpClient.Builder()
            .cache(Cache(File(context.cacheDir, "http"), 20L * 1024 * 1024))
            .callTimeout(20, TimeUnit.SECONDS)
            .build()

    @Provides
    @Singleton
    fun cachedFetch(client: OkHttpClient): CachedFetch = CachedFetch(client)

    @Provides
    @Singleton
    fun campFeed(fetch: CachedFetch): CampFeed = CampFeed(fetch)
}
