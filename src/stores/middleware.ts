// src/stores/middleware.ts
import {StateStorage, createJSONStorage, persist} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

// 创建 MMKV 存储适配器
const storage = new MMKV({
  id: 'zustand-storage',
});

const mmkvStorage: StateStorage = {
  getItem: (name: string): string | null => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string): void => {
    storage.set(name, value);
  },
  removeItem: (name: string): void => {
    storage.delete(name);
  },
};

// 导出持久化中间件
export const persistMiddleware = <T>(config: any) =>
  persist(config, {
    name: 'user-storage',
    storage: createJSONStorage(() => mmkvStorage),
    // 只持久化必要的状态
    partialize: (state: any) => ({
      user: state.user,
      isLoggedIn: state.isLoggedIn,
    }),
  });
