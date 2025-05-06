package com.ccnio.rn.spec

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext

private const val TAG = "NativeRnRouter"
class RnRouterModule(private val reactContext: ReactApplicationContext) : NativeRouterSpec(reactContext) {
    override fun goBack() {
        val ac = reactContext.currentActivity ?: return
        Log.d(TAG, "goBack: ac=$ac")
        reactContext.runOnUiQueueThread {
            ac.onBackPressed()
        }
    }
}