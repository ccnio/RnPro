package com.ccnio.rn.spec

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.BaseReactPackage
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class RnRouterPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if (name == NativeRouterSpec.NAME) {
            RnRouterModule(reactContext)
        } else {
            null
        }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            NativeRouterSpec.NAME to ReactModuleInfo(
                name = NativeRouterSpec.NAME, // 必须与 JS 端 TurboModuleRegistry.getEnforcing<T>('模块名') 中的名称 完全一致。
                className = RnRouterModule::class.java.name,
                canOverrideExistingModule = false, //是否允许覆盖已注册的同名模块
                needsEagerInit = false,
                isCxxModule = false, //标记模块是否是 C++ 编写的 TurboModule。  默认值：false（Java/Kotlin 模块）。
                isTurboModule = true
            )
        )
    }
}