// src/hooks/useLanguageDetection.ts
import React, { useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { checkLanguageChange } from '@/i18n';

/**
 * 用于检测从原生界面返回时的语言变化
 * 在页面获得焦点时自动检测语言是否发生变化
 */
export const useLanguageDetection = () => {
  const isFirstFocus = useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      // 跳过首次聚焦（页面初始加载）
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }

      // 检测语言变化
      const hasLanguageChanged = checkLanguageChange();
      
      if (hasLanguageChanged) {
        console.log('页面重新获得焦点，检测到语言变化');
      }
    }, [])
  );

  // 手动检测语言变化
  const detectLanguageChange = () => {
    return checkLanguageChange();
  };

  return {
    detectLanguageChange,
  };
};
