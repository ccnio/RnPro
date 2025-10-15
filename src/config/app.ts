// src/config/app.ts
import { Platform } from 'react-native';

// 应用配置
export const appConfig = {
  // 应用信息
  name: 'RnPro',
  version: '1.0.0',

  // 平台信息
  platform: {
    os: Platform.OS,
    version: Platform.Version,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
  },

  // API 配置
  api: {
    timeout: 10000,
    retryCount: 3,
  },

  // 获取完整的用户代理字符串
  getUserAgent: () => {
    const { name, version, platform } = appConfig;
    return `${name}/${version} (${platform.os} ${platform.version})`;
  },

  // 获取平台标识
  getPlatformCode: () => {
    return appConfig.platform.os === 'ios' ? 'ios' : 'android';
  },

  // 获取平台版本字符串
  getPlatformVersion: () => {
    return `${appConfig.platform.os} ${appConfig.platform.version}`;
  },
};
