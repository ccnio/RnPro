// android/app/src/main/java/com/rnpro/NativeNavigationModuleSpec.java
package com.rnpro;

import android.content.Intent;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = NativeNavigationModuleSpec.NAME)
public class NativeNavigationModuleSpec extends ReactContextBaseJavaModule {
  public static final String NAME = "NativeNavigationModule";

  public NativeNavigationModuleSpec(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void openSettings() {
    Intent intent = new Intent(getReactApplicationContext(), SettingActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    getReactApplicationContext().startActivity(intent);
  }

  @ReactMethod
  public void openLanguageSettings() {
    Intent intent = new Intent(getReactApplicationContext(), SettingActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    getReactApplicationContext().startActivity(intent);
  }
}
