package com.caelitechnologies.rotary_nl_rye.di

import android.content.Context
import android.content.pm.PackageManager
import java.security.MessageDigest

/**
 * The headers by which Google APIs recognise this app for a key restricted
 * to Android apps: the package and the SHA-1 of the certificate the
 * installed app is signed with (for a Play build, Play App Signing's key).
 */
fun androidAppHeaders(context: Context): Map<String, String> {
    val info = context.packageManager.getPackageInfo(context.packageName, PackageManager.GET_SIGNING_CERTIFICATES)
    val signer = info.signingInfo?.apkContentsSigners?.firstOrNull() ?: return mapOf("X-Android-Package" to context.packageName)
    val sha1 = MessageDigest.getInstance("SHA-1").digest(signer.toByteArray()).joinToString("") { "%02X".format(it) }
    return mapOf("X-Android-Package" to context.packageName, "X-Android-Cert" to sha1)
}
