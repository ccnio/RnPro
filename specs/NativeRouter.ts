import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * All TypeScript interfaces extending TurboModule must be called 'Spec'.
 *
 * 生成的 Java 类名为 `[ts文件名]Spec`,对应 package.json 里的 name
 * public abstract class NativeRouterSpec extends ReactContextBaseJavaModule implements TurboModule {
 *   生成的 NAME 为 getEnforcing 里的 name
 *   public static final String NAME = "NativeRouter";
 *
 *   public NativeRouterFileSpec(ReactApplicationContext reactContext) {
 *     super(reactContext);
 *   }
 *
 *   @Override
 *   public @Nonnull String getName() {
 *     return NAME;
 *   }
 *
 *   @ReactMethod
 *   @DoNotStrip
 *   public abstract void goBack();
 * }
 */
export interface Spec extends TurboModule {
  goBack(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeRouter',
);
