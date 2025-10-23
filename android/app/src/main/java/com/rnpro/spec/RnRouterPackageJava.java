package com.rnpro.spec;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.BaseReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class RnRouterPackageJava extends BaseReactPackage {
    @Nullable
    @Override
    public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext reactApplicationContext) {
        if (name.equals(RnRouterModuleJava.NAME)) {
            return new RnRouterModuleJava(reactApplicationContext);
        }
        if (name.equals(RnAppModuleJava.NAME)) {
            return new RnAppModuleJava(reactApplicationContext);
        }
        return null;
    }

    @NonNull
    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return new ReactModuleInfoProvider() {
            @NonNull
            @Override
            public Map<String, ReactModuleInfo> getReactModuleInfos() {
                Map<String, ReactModuleInfo> moduleInfoMap = new HashMap<>();
                ReactModuleInfo routerModuleInfo = new ReactModuleInfo(
                        RnRouterModuleJava.NAME, // name
                        RnRouterModuleJava.class.getSimpleName(), // className
                        false, // canOverrideExistingModule
                        false, // needsEagerInit
                        false, // isCxxModule
                        true// isTurboModule
                );
                moduleInfoMap.put(RnRouterModuleJava.NAME, routerModuleInfo);

                ReactModuleInfo appModuleInfo = new ReactModuleInfo(
                        RnAppModuleJava.NAME, // name
                        RnAppModuleJava.class.getSimpleName(), // className
                        false, // canOverrideExistingModule
                        false, // needsEagerInit
                        false, // isCxxModule
                        true// isTurboModule
                );
                moduleInfoMap.put(RnAppModuleJava.NAME, appModuleInfo);
                return moduleInfoMap;
            }
        };
    }
}
