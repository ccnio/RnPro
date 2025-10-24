package com.rnpro.spec;

import android.os.SystemClock;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.rnpro.NativeRouterModuleSpec;

public class RnRouterModuleJava extends NativeRouterModuleSpec {
    private static final String TAG = "RnRouterModuleJava";

    public RnRouterModuleJava(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void goPage(String path) {
        Log.d(TAG, "goPage: " + path);
    }

    @Override
    public void hasPage(ReadableMap pathInfo, Promise promise) {
        // {"user":{"email":"cc@gmail.com","name":"cc"},"path":"setting"}
        // 这里是在子线程，但不是 js 线程
        Log.d(TAG, "hasPage: " + pathInfo);
        WritableMap map = Arguments.createMap();
        map.putBoolean("exists", true);
        map.putString("title", "设置");

        WritableMap routerMap = Arguments.createMap();
        routerMap.putString("schema", "rnpro");
        routerMap.putString("host", "cc.com");

        map.putMap("router", routerMap);
        promise.resolve(map);
    }
}
