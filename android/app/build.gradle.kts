// The Google Calendar API key is defined once, for both apps, in the iOS
// settings (ios/App.xcconfig); the Android build reads it from there.
val calendarApiKey: String = rootDir.resolve("../ios/App.xcconfig").readLines()
    .firstNotNullOfOrNull { Regex("""^ROTARY_GOOGLE_API_KEY\s*=\s*(\S+)""").find(it)?.groupValues?.get(1) }
    .orEmpty()

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.hilt)
    alias(libs.plugins.ksp)
}

android {
    // Never change: the Play Store listing and every user's data hang on
    // this package (CLAUDE.md, Hard rules).
    namespace = "com.caelitechnologies.rotary_nl_rye"
    compileSdk {
        version = release(37)
    }

    defaultConfig {
        applicationId = "com.caelitechnologies.rotary_nl_rye"
        // Android 10: the system-wide dark theme the app follows.
        minSdk = 29
        targetSdk = 37
        // The version continues from the React Native app's 13.2.1, as on
        // iOS. The release lane sets versionCode above Google Play's
        // highest; 1 is only for local builds.
        versionCode = 1
        versionName = "14.0.0"
        buildConfigField("String", "ROTARY_GOOGLE_API_KEY", "\"$calendarApiKey\"")
    }

    buildTypes {
        release {
            optimization {
                enable = true
                packageScope = setOf("androidx.**", "kotlin.**", "kotlinx.**")
            }
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
    androidResources {
        // The languages for Android's per-app language setting, from the
        // values-* folders (resources.properties names the default, Dutch).
        generateLocaleConfig = true
    }
    testOptions {
        // Robolectric runs the Compose tests on the JVM with the real resources.
        unitTests.isIncludeAndroidResources = true
    }
    lint {
        warningsAsErrors = true
        abortOnError = true
        // Dependency versions are Dependabot's job, not a build failure.
        disable += setOf("GradleDependency", "NewerVersionAvailable", "AndroidGradlePluginVersion")
    }
}

kotlin {
    compilerOptions {
        allWarningsAsErrors = true
    }
}

dependencies {
    implementation(project(":core"))
    implementation(project(":camps"))
    implementation(project(":news"))
    implementation(project(":calendar"))
    implementation(libs.hilt.android)
    ksp(libs.hilt.compiler)
    implementation(libs.androidx.hilt.lifecycle.viewmodel.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.androidx.lifecycle.viewmodel.navigation3)
    // Custom Tabs: the camps' invitation websites in the browser, inside the app.
    implementation(libs.androidx.browser)
    // Media3: the podcast in a MediaSessionService (background audio, the system's media
    // controls) and the videos in the app, with Media3's Material 3 player controls.
    implementation(libs.androidx.media3.exoplayer)
    implementation(libs.androidx.media3.session)
    implementation(libs.androidx.media3.ui.compose.material3)
    // MediaController.Builder.buildAsync() returns a ListenableFuture: await() it in a coroutine.
    implementation(libs.kotlinx.coroutines.guava)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material3.adaptive.navigation.suite)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.core.splashscreen)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.navigation3.runtime)
    implementation(libs.androidx.navigation3.ui)
    implementation(libs.kotlinx.serialization.core)
    // Compose has no image loader of its own; Coil is the one Google's docs and samples use.
    implementation(libs.coil.compose)
    implementation(libs.coil.network.okhttp)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)

    testImplementation(platform(libs.androidx.compose.bom))
    testImplementation(libs.junit)
    testImplementation(libs.robolectric)
    testImplementation(libs.androidx.test.core)
    testImplementation(libs.androidx.test.ext.junit)
    testImplementation(libs.androidx.compose.ui.test.junit4)
}
