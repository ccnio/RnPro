plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    id("com.facebook.react")
}

android {
    namespace = "com.ccnio.rn"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.ccnio.rn"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        ndkVersion = "27.1.12297006"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
//    compileOptions {
//        sourceCompatibility = JavaVersion.VERSION_11
//        targetCompatibility = JavaVersion.VERSION_11
//    }

//    compileOptions {
//        sourceCompatibility = rootProject.ext["javaVerison"] as JavaVersion
//        targetCompatibility = rootProject.ext["javaVerison"] as JavaVersion
//    }
//    kotlinOptions {
//        jvmTarget = rootProject.ext["jvmTarget"].toString()
//    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
    implementation("com.facebook.react:react-android")
    implementation("com.facebook.react:hermes-android")
}
react { autolinkLibrariesWithApp() }
