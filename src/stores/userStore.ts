// src/stores/userStore.ts
import {create} from 'zustand';
import {realmManager} from '@/database/RealmManager';

// 用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
}

// 用户状态接口
interface UserState {
  // 状态
  user: UserInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  
  // 操作
  login: (userInfo: UserInfo, token?: string) => void;
  logout: () => void;
  updateUser: (userInfo: Partial<UserInfo>) => void;
  initializeUser: () => Promise<void>;
}

// 创建用户状态 store
export const useUserStore = create<UserState>((set, get) => ({
  // 初始状态
  user: null,
  isLoggedIn: false,
  isLoading: true,

  // 初始化用户状态
  initializeUser: async () => {
    try {
      set({isLoading: true});
      
      // 初始化 Realm 数据库
      await realmManager.initialize();
      
      // 获取当前登录的账号
      const loggedInAccount = realmManager.getCurrentLoggedInAccount();
      
      if (loggedInAccount) {
        const userInfo: UserInfo = {
          id: loggedInAccount.id,
          username: loggedInAccount.username,
          avatar: loggedInAccount.avatar,
          email: loggedInAccount.email,
        };
        
        set({
          user: userInfo,
          isLoggedIn: true,
          isLoading: false,
        });
        
        console.log('从数据库恢复登录状态:', userInfo.username);
      } else {
        set({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('加载用户状态失败:', error);
      set({
        user: null,
        isLoggedIn: false,
        isLoading: false,
      });
    }
  },

  // 登录
  login: (userInfo: UserInfo, token?: string) => {
    try {
      // 保存到数据库
      const email = userInfo.email;
      const loginType = email ? 'email' : 'username';
      realmManager.saveAccount(
        userInfo.username,
        email,
        userInfo.avatar,
        loginType,
        token,
      );
      
      // 更新状态
      set({
        user: userInfo,
        isLoggedIn: true,
        isLoading: false,
      });
      
      console.log('用户登录:', userInfo.username);
    } catch (error) {
      console.error('登录失败:', error);
    }
  },

  // 登出
  logout: () => {
    try {
      // 从数据库登出
      realmManager.logoutCurrentUser();
      
      // 更新状态
      set({
        user: null,
        isLoggedIn: false,
        isLoading: false,
      });
      
      console.log('用户登出');
    } catch (error) {
      console.error('登出失败:', error);
    }
  },

  // 更新用户信息
  updateUser: (userInfo: Partial<UserInfo>) => {
    const {user} = get();
    if (user) {
      const updatedUser = {...user, ...userInfo};
      set({user: updatedUser});
      console.log('更新用户信息:', userInfo);
    }
  },
}));
