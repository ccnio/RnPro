# Zustand 全局状态管理

本文档详细介绍了在 RnPro 项目中使用 Zustand 管理登录全局状态的实现方案。

## 🎯 为什么选择 Zustand？

### 相比 Context API 的优势

| 特性 | Context API | Zustand |
|------|-------------|---------|
| **代码量** | 多（Provider + Context + Hook） | 少（单一 Store） |
| **性能** | 所有消费者重新渲染 | 按需订阅 |
| **复杂度** | 高（多层嵌套） | 低（直接使用） |
| **调试** | 困难 | 简单（DevTools） |
| **类型安全** | 需要额外配置 | 原生支持 |
| **测试** | 复杂 | 简单 |

### Zustand 核心优势
- ✅ **零样板代码**：无需 Provider 包装
- ✅ **自动优化**：只订阅使用的状态
- ✅ **DevTools 支持**：完整的调试工具
- ✅ **中间件支持**：持久化、日志等
- ✅ **TypeScript 友好**：完整的类型支持

## 🏗️ 架构设计

### Store 结构
```typescript
// src/stores/userStore.ts
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
```

### 用户信息接口
```typescript
export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
}
```

## 📦 安装与配置

### 1. 安装依赖
```bash
npm install zustand
```

### 2. 创建 Store
```typescript
// src/stores/userStore.ts
import {create} from 'zustand';
import {realmManager} from '@/database/RealmManager';

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
```

### 3. 创建初始化 Hook
```typescript
// src/hooks/useUserInitialization.ts
import {useEffect} from 'react';
import {useUserStore} from '@/stores/userStore';

export const useUserInitialization = () => {
  const initializeUser = useUserStore(state => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);
};
```

### 4. 应用入口配置
```typescript
// App.tsx
import React from 'react';
import {useUserInitialization} from '@/hooks/useUserInitialization';

function App() {
  // 初始化用户状态
  useUserInitialization();

  return (
    // 应用组件
  );
}
```

## 🎨 组件中使用

### 基础用法
```typescript
// 在组件中使用
import {useUserStore} from '@/stores/userStore';

const MyComponent = () => {
  const {user, isLoggedIn, login, logout} = useUserStore();
  
  return (
    <View>
      {isLoggedIn ? (
        <Text>欢迎，{user?.username}!</Text>
      ) : (
        <Text>请登录</Text>
      )}
    </View>
  );
};
```

### 性能优化 - 按需订阅
```typescript
// 只订阅用户信息，不会因为其他状态变化而重新渲染
const user = useUserStore(state => state.user);

// 只订阅登录状态
const isLoggedIn = useUserStore(state => state.isLoggedIn);

// 订阅多个状态
const {user, isLoggedIn} = useUserStore(state => ({
  user: state.user,
  isLoggedIn: state.isLoggedIn,
}));

// 订阅方法（不会触发重新渲染）
const login = useUserStore(state => state.login);
const logout = useUserStore(state => state.logout);
```

### 实际应用示例

#### Account 页面
```typescript
// src/pages/Account.tsx
import {useUserStore} from '@/stores/userStore';

const Account = () => {
  const {user, isLoggedIn, isLoading, logout} = useUserStore();

  const handleLogout = () => {
    Alert.alert('确认退出', '确定要退出登录吗？', [
      {text: '取消', style: 'cancel'},
      {text: '确定', style: 'destructive', onPress: logout},
    ]);
  };

  return (
    <View>
      {isLoading ? (
        <Text>加载中...</Text>
      ) : isLoggedIn ? (
        <View>
          <Text>{user?.username}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text>退出登录</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>立即登录</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
```

#### Login 页面
```typescript
// src/pages/Login.tsx
import {useUserStore} from '@/stores/userStore';

const Login = () => {
  const {login} = useUserStore();

  const handleLogin = async (formData) => {
    try {
      // 模拟登录API调用
      const userInfo = {
        id: '1',
        username: formData.username,
        avatar: 'https://via.placeholder.com/100',
      };
      
      const token = `token_${Date.now()}`;
      
      // 使用 Zustand store 登录
      login(userInfo, token);
      
      Alert.alert('登录成功', `欢迎回来，${userInfo.username}！`);
    } catch (error) {
      Alert.alert('登录失败', '用户名或密码错误');
    }
  };

  return (
    // 登录表单
  );
};
```

## 🔧 高级功能

### 中间件支持

#### 持久化中间件
```typescript
// src/stores/middleware.ts
import {StateStorage, createJSONStorage, persist} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({id: 'zustand-storage'});

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

export const persistMiddleware = <T>(config: any) =>
  persist(config, {
    name: 'user-storage',
    storage: createJSONStorage(() => mmkvStorage),
    partialize: (state: any) => ({
      user: state.user,
      isLoggedIn: state.isLoggedIn,
    }),
  });
```

#### 日志中间件（开发环境）
```typescript
const logMiddleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('State changed:', get());
      set(...args);
    },
    get,
    api,
  );

// 使用中间件
export const useUserStore = create(
  logMiddleware(
    persistMiddleware((set, get) => ({
      // store 配置
    }))
  )
);
```

### 状态选择器优化
```typescript
// 创建选择器函数，避免重复创建
const selectUser = (state: UserState) => state.user;
const selectIsLoggedIn = (state: UserState) => state.isLoggedIn;
const selectLoginActions = (state: UserState) => ({
  login: state.login,
  logout: state.logout,
});

// 在组件中使用
const user = useUserStore(selectUser);
const isLoggedIn = useUserStore(selectIsLoggedIn);
const {login, logout} = useUserStore(selectLoginActions);
```

## 🚀 性能优化

### 1. 按需订阅
```typescript
// ❌ 错误：订阅整个状态
const state = useUserStore();

// ✅ 正确：只订阅需要的状态
const user = useUserStore(state => state.user);
const isLoggedIn = useUserStore(state => state.isLoggedIn);
```

### 2. 选择器优化
```typescript
// ❌ 错误：每次渲染都创建新对象
const {user, isLoggedIn} = useUserStore(state => ({
  user: state.user,
  isLoggedIn: state.isLoggedIn,
}));

// ✅ 正确：使用稳定的选择器
const user = useUserStore(state => state.user);
const isLoggedIn = useUserStore(state => state.isLoggedIn);
```

### 3. 方法订阅
```typescript
// 方法不会触发重新渲染，可以安全订阅
const login = useUserStore(state => state.login);
const logout = useUserStore(state => state.logout);
```

## 🐛 调试工具

### Redux DevTools 集成
```typescript
import {devtools} from 'zustand/middleware';

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      // store 配置
    }),
    {
      name: 'user-store',
    }
  )
);
```

### 状态监控
```typescript
// 监听状态变化
useUserStore.subscribe(
  (state) => console.log('User state changed:', state),
  (state) => state.user
);
```

## 🧪 测试

### 单元测试
```typescript
import {renderHook, act} from '@testing-library/react-hooks';
import {useUserStore} from '@/stores/userStore';

describe('UserStore', () => {
  beforeEach(() => {
    // 重置 store 状态
    useUserStore.setState({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    });
  });

  it('should login user', () => {
    const {result} = renderHook(() => useUserStore());
    
    act(() => {
      result.current.login({
        id: '1',
        username: 'testuser',
      });
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.username).toBe('testuser');
  });

  it('should logout user', () => {
    const {result} = renderHook(() => useUserStore());
    
    // 先登录
    act(() => {
      result.current.login({
        id: '1',
        username: 'testuser',
      });
    });

    // 然后登出
    act(() => {
      result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBe(null);
  });
});
```

## 📊 迁移指南

### 从 Context API 迁移

#### 旧代码（Context API）
```typescript
// 需要 Provider 包装
<UserProvider>
  <App />
</UserProvider>

// 组件中使用
const {user, login, logout} = useUser();
```

#### 新代码（Zustand）
```typescript
// 无需 Provider，直接使用
const {user, login, logout} = useUserStore();

// 或者按需订阅
const user = useUserStore(state => state.user);
const login = useUserStore(state => state.login);
```

### 迁移步骤
1. **安装 Zustand**：`npm install zustand`
2. **创建 Store**：定义状态和操作
3. **更新组件**：替换 `useUser()` 为 `useUserStore()`
4. **移除 Provider**：删除 Context Provider 包装
5. **清理代码**：删除旧的 Context 相关文件

## 🎯 最佳实践

### 1. Store 设计原则
- **单一职责**：每个 store 负责一个领域
- **扁平结构**：避免过深的状态嵌套
- **纯函数**：操作函数保持纯净

### 2. 性能优化
- **按需订阅**：只订阅需要的状态
- **选择器缓存**：使用稳定的选择器函数
- **避免对象创建**：在渲染中避免创建新对象

### 3. 类型安全
- **完整类型定义**：为所有状态和操作定义类型
- **接口分离**：将状态接口和操作接口分离
- **泛型支持**：合理使用 TypeScript 泛型

### 4. 错误处理
- **异常捕获**：在操作函数中捕获异常
- **状态回滚**：操作失败时回滚状态
- **错误日志**：记录错误信息便于调试

## 📚 总结

Zustand 提供了一个简洁、高效、类型安全的全局状态管理解决方案。相比传统的 Context API，它减少了样板代码，提升了性能，并提供了更好的开发体验。

### 核心优势
- ✅ **零配置**：无需 Provider 包装
- ✅ **高性能**：按需订阅，避免不必要的重渲染
- ✅ **类型安全**：完整的 TypeScript 支持
- ✅ **易于测试**：纯函数，便于单元测试
- ✅ **调试友好**：支持 Redux DevTools
- ✅ **中间件支持**：持久化、日志等功能

通过 Zustand，我们实现了更简洁、更高效的用户状态管理，为应用提供了更好的性能和开发体验。
