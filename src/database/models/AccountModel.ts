// src/database/models/AccountModel.ts
import Realm from 'realm';

// 账号信息模型
export class AccountModel extends Realm.Object {
  static schema = {
    name: 'Account',
    primaryKey: 'id',
    properties: {
      id: 'string',
      username: 'string',
      email: 'string?',
      avatar: 'string?',
      loginType: 'string', // 'username' | 'email'
      lastLoginTime: 'date',
      loginCount: 'int',
      isLoggedIn: 'bool', // 是否已登录
      token: 'string?', // 登录令牌
      createdAt: 'date',
      updatedAt: 'date',
    },
  };

  // 静态方法
  static create(
    username: string,
    email?: string,
    avatar?: string,
    loginType: 'username' | 'email' = 'username',
    token?: string,
  ): Partial<AccountModel> {
    const now = new Date();
    return {
      id: `${loginType}_${username}_${Date.now()}`,
      username,
      email,
      avatar,
      loginType,
      lastLoginTime: now,
      loginCount: 1,
      isLoggedIn: true,
      token,
      createdAt: now,
      updatedAt: now,
    };
  }

  // 更新登录信息
  updateLoginInfo(token?: string): void {
    this.lastLoginTime = new Date();
    this.loginCount += 1;
    this.isLoggedIn = true;
    this.updatedAt = new Date();
    if (token) {
      this.token = token;
    }
  }

  // 登出
  logout(): void {
    this.isLoggedIn = false;
    this.token = undefined;
    this.updatedAt = new Date();
  }
}

// 导出类型
export type Account = {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  loginType: 'username' | 'email';
  lastLoginTime: Date;
  loginCount: number;
  isLoggedIn: boolean;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};
