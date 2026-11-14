// :camps holds the summer camps without a screen: zomerkampen.xlsx from
// rotary.nl, read into typed camps, as RotaryKit's RotaryCamps does on iOS.
// Android reads the XLSX itself: java.util.zip for the archive and the
// platform's XML parser for its parts.
plugins {
    alias(libs.plugins.android.library)
}

android {
    namespace = "com.caelitechnologies.rotary_nl_rye.camps"
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
    api(project(":core"))
    testImplementation(libs.junit)
    testImplementation(libs.okhttp.mockwebserver)
    testImplementation(libs.kotlinx.coroutines.test)
}
