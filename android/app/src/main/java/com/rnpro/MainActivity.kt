package com.rnpro

import android.content.res.Configuration
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "RnPro"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    
    // 检测语言变化
    val currentLanguage = newConfig.locale.language
    val previousLanguage = resources.configuration.locale.language
    
    if (currentLanguage != previousLanguage) {
      // 发送语言变化事件到RN层
      sendLanguageChangeEvent(currentLanguage)
    }
  }

  private fun sendLanguageChangeEvent(language: String) {
    if (reactInstanceManager != null && reactInstanceManager.currentReactContext != null) {
      val params = com.facebook.react.bridge.Arguments.createMap()
      params.putString("language", language)
      params.putString("country", resources.configuration.locale.country)
      
      reactInstanceManager
          .currentReactContext
          ?.getJSModule(com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          ?.emit("languageChanged", params)
    }
  }
}
