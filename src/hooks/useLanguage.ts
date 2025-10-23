// src/hooks/useLanguage.ts
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const LANGUAGE_STORAGE_KEY = 'app_language';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  // 获取当前语言
  const currentLocale = i18n.language;

  // 切换语言（用户手动设置）
  const changeLanguage = useCallback((language: string) => {
    // 保存用户设置，这样就不会跟随系统语言了
    storage.set(LANGUAGE_STORAGE_KEY, language);
    i18n.changeLanguage(language);
  }, [i18n]);

  // 重置为跟随系统语言
  const followSystemLanguage = useCallback(() => {
    // 删除用户设置，让应用跟随系统语言
    storage.delete(LANGUAGE_STORAGE_KEY);
    // 重新加载应用以获取系统语言
    // 这里可以触发应用重启或重新初始化
  }, []);

  // 检查是否跟随系统语言
  const isFollowingSystem = !storage.getString(LANGUAGE_STORAGE_KEY);

  // 获取可用语言列表
  const availableLocales = ['zh', 'en'];

  // 检查是否正在加载
  const isLoading = !i18n.isInitialized;

  return {
    t,
    currentLocale,
    changeLanguage,
    followSystemLanguage,
    isFollowingSystem,
    availableLocales,
    isLoading,
  };
};