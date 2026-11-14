package com.caelitechnologies.rotary_nl_rye

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme

/** The one activity: the system splash screen, then the app edge to edge. */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            RotaryTheme {
                RotaryApp()
            }
        }
    }
}
