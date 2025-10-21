import React, {createContext, useContext, useState, useCallback, ReactNode} from 'react';

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
  login: (userInfo: UserInfo) => void;
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

  // 登录
  const login = useCallback((userInfo: UserInfo) => {
    setUser(userInfo);
    console.log('用户登录:', userInfo.username);
  }, []);

  // 登出
  const logout = useCallback(() => {
    setUser(null);
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
