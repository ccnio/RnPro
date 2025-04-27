// Top-level build file where you can add configuration options common to all sub-projects/modules.

ext {
//    set("jvmTarget", "17")
    set("compileSdkVersion", libs.versions.compileSdk.get().toInt())
    set("minSdkVersion", libs.versions.minSdk.get().toInt())
    set("targetSdkVersion", libs.versions.targetSdk.get().toInt())
    set("javaVerison", JavaVersion.VERSION_17)
}

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    id("com.facebook.react.rootproject")
}

buildscript {
    dependencies {
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
}