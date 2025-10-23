package com.rnpro.spec

import android.util.Log
import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

private const val TAG = "RnRouterPackage"
//
//class RnRouterPackage : BaseReactPackage() {
//    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
//        Log.d(TAG, "getModule: $name")
//        return if (name == RnRouterModule.NAME) {
//            RnRouterModule(reactContext)
//        } else {
//            null
//        }
//    }
//
//    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
//        mapOf(
//            RnRouterModule.NAME to ReactModuleInfo(
//                name = RnRouterModule.NAME,
//                className = RnRouterModule.NAME,
//                canOverrideExistingModule = false,
//                needsEagerInit = false,
//                isCxxModule = false,
//                isTurboModule = true
//            )
//        )
//    }
//}