// src/utils/platform.ts
import { Platform } from 'react-native';

// 平台信息
export const platformInfo = {
  // 平台类型
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  platform: Platform.OS,
  
  // 版本信息
  version: Platform.Version,
  
  // 设备信息
  isPad: Platform.isPad, // iOS 专用
  
  // 获取平台标识字符串
  getPlatformString: () => {
    if (Platform.OS === 'ios') {
      return `iOS ${Platform.Version}`;
    } else if (Platform.OS === 'android') {
      return `Android ${Platform.Version}`;
    }
    return Platform.OS;
  },
  
  // 获取简化的平台标识
  getPlatformCode: () => {
    return Platform.OS === 'ios' ? 'ios' : 'android';
  },
};

// 导出常用方法
export const { isIOS, isAndroid, platform, version, isPad, getPlatformString, getPlatformCode } = platformInfo;
