import React, {createContext, useContext, useState, useCallback, ReactNode, useEffect} from 'react';
import {realmManager} from '@/database/RealmManager';

// 用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
}

// 用户状态接口
interface UserContextType {
  user: UserInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userInfo: UserInfo, token?: string) => void;
  logout: () => void;
  updateUser: (userInfo: Partial<UserInfo>) => void;
}

// 创建Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider组件属性
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider组件
export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时从数据库加载登录状态
  useEffect(() => {
    const loadUserFromDatabase = async () => {
      try {
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
          setUser(userInfo);
          console.log('从数据库恢复登录状态:', userInfo.username);
        }
      } catch (error) {
        console.error('加载用户状态失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromDatabase();
  }, []);

  // 登录
  const login = useCallback((userInfo: UserInfo, token?: string) => {
    setUser(userInfo);
    
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
    
    console.log('用户登录:', userInfo.username);
  }, []);

  // 登出
  const logout = useCallback(() => {
    setUser(null);
    
    // 从数据库登出
    realmManager.logoutCurrentUser();
    
    console.log('用户登出');
  }, []);

  // 更新用户信息
  const updateUser = useCallback((userInfo: Partial<UserInfo>) => {
    if (user) {
      setUser({...user, ...userInfo});
      console.log('更新用户信息:', userInfo);
    }
  }, [user]);

  // 计算是否已登录
  const isLoggedIn = user !== null;

  const value: UserContextType = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 自定义Hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
