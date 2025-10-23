package com.rnpro.spec;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.rnpro.NativeAppModuleSpec;

public class RnAppModuleJava extends NativeAppModuleSpec {
    private static final String TAG = "RnAppModuleJava";

    public RnAppModuleJava(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void userInfo() {
        Log.d(TAG, "userInfo: ");
    }
}
