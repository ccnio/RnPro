package com.rnpro.spec

//import com.facebook.react.bridge.ReactApplicationContext
//import com.rnpro.NativeRouterModuleSpec
//import com.rnpro.spec.RnRouterModule
//import android.util.Log
//import com.facebook.react.bridge.Promise
//
//private const val TAG = "RnRouterModule"
//
///**
// * kotlin 经常没有编译提示
// */
//class RnRouterModule(context: ReactApplicationContext?) : NativeRouterModuleSpec(context) {
//    override fun goPage(path: String) {
//        Log.d(TAG, "goPage: " + path)
//    }
//
//    override fun hasPage(path: kotlin.String?, promise: com.facebook.react.bridge.Promise) {
//        android.os.SystemClock.sleep(1000)
//        if (android.text.TextUtils.isEmpty(path)) {
//            promise.reject("UNSPECIFIED", "path is empty")
//        } else if (path == "setting") {
//            promise.resolve(true)
//        } else {
//            promise.resolve(false)
//        }
//    }
//}
