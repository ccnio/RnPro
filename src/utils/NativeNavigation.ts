import { NativeModules, Platform } from 'react-native';

// 原生导航模块
const { NativeNavigationModule } = NativeModules as {
  NativeNavigationModule?: {
    openSettings: () => void;
    openLanguageSettings: () => void;
  };
};

/**
 * 跳转到原生设置页面
 */
export const openNativeSettings = () => {
  console.log('尝试打开原生设置页面...');
  if (NativeNavigationModule) {
    console.log('NativeNavigationModule 找到，调用 openSettings');
    NativeNavigationModule.openSettings();
  } else {
    console.warn('NativeNavigationModule 未找到，使用系统设置作为备选');
    // 备选方案：使用系统设置
    if (Platform.OS === 'android') {
      const { Linking } = require('react-native');
      Linking.openSettings();
    }
  }
};

/**
 * 使用系统Intent打开设置页面（Android）
 */
export const openSystemSettings = () => {
  if (Platform.OS === 'android') {
    const { Linking } = require('react-native');
    Linking.openSettings();
  } else {
    console.warn('openSystemSettings 仅在Android上支持');
  }
};
