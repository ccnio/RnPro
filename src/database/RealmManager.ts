// src/database/RealmManager.ts
import Realm from 'realm';
import {AccountModel, Account} from './models/AccountModel';

class RealmManager {
  private realm: Realm | null = null;

  // 初始化数据库
  async initialize(): Promise<void> {
    try {
      this.realm = await Realm.open({
        schema: [AccountModel],
        schemaVersion: 1,
        migration: (oldRealm, newRealm) => {
          // 数据库迁移逻辑
          console.log('Realm 数据库迁移');
        },
      });
      console.log('Realm 数据库初始化成功');
    } catch (error) {
      console.error('Realm 数据库初始化失败:', error);
      throw error;
    }
  }

  // 获取数据库实例
  getRealm(): Realm {
    if (!this.realm) {
      throw new Error('Realm 数据库未初始化');
    }
    return this.realm;
  }

  // 保存账号信息
  saveAccount(
    username: string,
    email?: string,
    avatar?: string,
    loginType: 'username' | 'email' = 'username',
    token?: string,
  ): Account | null {
    try {
      const realm = this.getRealm();
      
      // 查找是否已存在相同用户名或邮箱的账号
      const existingAccount = realm
        .objects<AccountModel>('Account')
        .filtered(
          `username == $0 OR email == $1`,
          username,
          email || '',
        )[0];

      if (existingAccount) {
        // 更新现有账号
        realm.write(() => {
          existingAccount.updateLoginInfo(token);
          if (avatar) {
            existingAccount.avatar = avatar;
          }
        });
        return existingAccount.toJSON() as Account;
      } else {
        // 创建新账号
        const newAccountData = AccountModel.create(
          username,
          email,
          avatar,
          loginType,
          token,
        );

        let newAccount: AccountModel;
        realm.write(() => {
          newAccount = realm.create<AccountModel>('Account', newAccountData);
        });
        return newAccount!.toJSON() as Account;
      }
    } catch (error) {
      console.error('保存账号信息失败:', error);
      return null;
    }
  }

  // 根据前缀搜索账号
  searchAccountsByPrefix(prefix: string): Account[] {
    try {
      const realm = this.getRealm();
      
      // 搜索用户名或邮箱包含前缀的账号
      const accounts = realm
        .objects<AccountModel>('Account')
        .filtered(
          `username BEGINSWITH[c] $0 OR email BEGINSWITH[c] $0`,
          prefix,
        )
        .sorted('lastLoginTime', true) // 按最后登录时间排序
        .slice(0, 10); // 限制返回10条

      return accounts.map(account => account.toJSON() as Account);
    } catch (error) {
      console.error('搜索账号失败:', error);
      return [];
    }
  }

  // 获取当前登录的账号
  getCurrentLoggedInAccount(): Account | null {
    try {
      const realm = this.getRealm();
      const loggedInAccount = realm
        .objects<AccountModel>('Account')
        .filtered('isLoggedIn == true')
        .sorted('lastLoginTime', true)[0];

      return loggedInAccount ? (loggedInAccount.toJSON() as Account) : null;
    } catch (error) {
      console.error('获取当前登录账号失败:', error);
      return null;
    }
  }

  // 登出当前用户
  logoutCurrentUser(): boolean {
    try {
      const realm = this.getRealm();
      const loggedInAccount = realm
        .objects<AccountModel>('Account')
        .filtered('isLoggedIn == true')[0];

      if (loggedInAccount) {
        realm.write(() => {
          loggedInAccount.logout();
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('登出失败:', error);
      return false;
    }
  }

  // 获取所有账号
  getAllAccounts(): Account[] {
    try {
      const realm = this.getRealm();
      const accounts = realm
        .objects<AccountModel>('Account')
        .sorted('lastLoginTime', true);

      return accounts.map(account => account.toJSON() as Account);
    } catch (error) {
      console.error('获取所有账号失败:', error);
      return [];
    }
  }

  // 删除账号
  deleteAccount(accountId: string): boolean {
    try {
      const realm = this.getRealm();
      const account = realm.objectForPrimaryKey<AccountModel>('Account', accountId);
      
      if (account) {
        realm.write(() => {
          realm.delete(account);
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('删除账号失败:', error);
      return false;
    }
  }

  // 清空所有账号
  clearAllAccounts(): void {
    try {
      const realm = this.getRealm();
      realm.write(() => {
        realm.deleteAll();
      });
      console.log('清空所有账号成功');
    } catch (error) {
      console.error('清空所有账号失败:', error);
    }
  }

  // 关闭数据库
  close(): void {
    if (this.realm) {
      this.realm.close();
      this.realm = null;
      console.log('Realm 数据库已关闭');
    }
  }
}

// 导出单例
export const realmManager = new RealmManager();
export default realmManager;
