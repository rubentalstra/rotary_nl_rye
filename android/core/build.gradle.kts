// :core holds everything without a screen: the organisation's people and
// teams and the About topics, as RotaryKit's RotaryCore does on iOS, with
// their text as string resources in Dutch and English.
plugins {
    alias(libs.plugins.android.library)
}

android {
    namespace = "com.caelitechnologies.rotary_nl_rye.core"
    compileSdk {
        version = release(37)
    }
    defaultConfig {
        minSdk = 29
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    lint {
        warningsAsErrors = true
        abortOnError = true
        disable += setOf("GradleDependency", "NewerVersionAvailable", "AndroidGradlePluginVersion")
    }
}

kotlin {
    compilerOptions {
        allWarningsAsErrors = true
    }
}

dependencies {
    implementation(libs.androidx.annotation)
    testImplementation(libs.junit)
}
