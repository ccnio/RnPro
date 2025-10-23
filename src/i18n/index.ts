import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import { MMKV } from 'react-native-mmkv';
import { AppState, Platform } from 'react-native';

// 导入翻译资源
import zh from './locales/zh';
import en from './locales/en';

// 创建 MMKV 存储实例
const storage = new MMKV();

// 存储键
const LANGUAGE_STORAGE_KEY = 'app_language';

// 获取系统语言
const getSystemLanguage = (): string => {
  const locales = getLocales();
  if (locales.length > 0) {
    const systemLang = locales[0].languageCode;
    // 检查是否支持系统语言
    if (['zh', 'en'].includes(systemLang)) {
      return systemLang;
    }
  }
  return 'zh'; // 默认语言
};

// 获取存储的语言
const getStoredLanguage = (): string => {
  try {
    const stored = storage.getString(LANGUAGE_STORAGE_KEY);
    return stored || getSystemLanguage();
  } catch (error) {
    console.error('获取存储语言失败:', error);
    return getSystemLanguage();
  }
};

// 保存语言设置
export const saveLanguage = (language: string): void => {
  try {
    storage.set(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('保存语言设置失败:', error);
  }
};

// 初始化 i18next
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // 兼容 React Native
    resources: {
      zh: {
        translation: zh,
      },
      en: {
        translation: en,
      },
    },
    lng: getStoredLanguage(), // 使用存储的语言或系统语言
    fallbackLng: 'zh', // 回退语言
    debug: __DEV__, // 开发模式下启用调试
    
    interpolation: {
      escapeValue: false, // React 已经转义了
    },
    
    // 检测语言变化
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// 监听语言变化并保存
i18n.on('languageChanged', (lng) => {
  saveLanguage(lng);
});

// 注意：react-native-localize 3.x 版本可能不支持 addEventListener
// 我们主要依赖 AppState 监听器来检测语言变化

// 监听应用状态变化，检测从原生界面返回时的语言变化
let lastSystemLanguage = getSystemLanguage();
let isAppActive = true;

const handleAppStateChange = (nextAppState: string) => {
  console.log('应用状态变化:', nextAppState);
  
  if (nextAppState === 'active') {
    // 应用重新激活时检查语言是否变化
    const currentSystemLanguage = getSystemLanguage();
    
    if (currentSystemLanguage !== lastSystemLanguage) {
      console.log('检测到语言变化:', lastSystemLanguage, '->', currentSystemLanguage);
      
      // 检查是否有用户手动设置的语言
      const storedLang = storage.getString(LANGUAGE_STORAGE_KEY);
      
      // 如果没有用户设置，则跟随系统语言
      if (!storedLang) {
        i18n.changeLanguage(currentSystemLanguage);
      }
      
      lastSystemLanguage = currentSystemLanguage;
    }
    
    isAppActive = true;
  } else if (nextAppState === 'background') {
    isAppActive = false;
  }
};

// 添加应用状态监听
AppState.addEventListener('change', handleAppStateChange);

// 导出语言检测函数，供其他模块使用
export const checkLanguageChange = () => {
  const currentSystemLanguage = getSystemLanguage();
  
  if (currentSystemLanguage !== lastSystemLanguage) {
    console.log('手动检测语言变化:', lastSystemLanguage, '->', currentSystemLanguage);
    
    // 检查是否有用户手动设置的语言
    const storedLang = storage.getString(LANGUAGE_STORAGE_KEY);
    
    // 如果没有用户设置，则跟随系统语言
    if (!storedLang) {
      i18n.changeLanguage(currentSystemLanguage);
    }
    
    lastSystemLanguage = currentSystemLanguage;
    return true; // 返回true表示语言发生了变化
  }
  
  return false; // 返回false表示语言没有变化
};

export default i18n;