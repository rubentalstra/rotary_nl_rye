plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
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
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)

    testImplementation(platform(libs.androidx.compose.bom))
    testImplementation(libs.junit)
    testImplementation(libs.robolectric)
    testImplementation(libs.androidx.test.core)
    testImplementation(libs.androidx.test.ext.junit)
    testImplementation(libs.androidx.compose.ui.test.junit4)
}
