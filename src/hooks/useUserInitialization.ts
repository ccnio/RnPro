// src/hooks/useUserInitialization.ts
import {useEffect} from 'react';
import {useUserStore} from '@/stores/userStore';

// 用户状态初始化 Hook
export const useUserInitialization = () => {
  const initializeUser = useUserStore(state => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);
};
