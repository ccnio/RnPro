// src/hooks/useAccountSearch.ts
import {useState, useCallback, useEffect} from 'react';
import {realmManager, Account} from '@/database/RealmManager';

export const useAccountSearch = () => {
  const [searchResults, setSearchResults] = useState<Account[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 搜索账号
  const searchAccounts = useCallback(async (prefix: string) => {
    if (!prefix.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = realmManager.searchAccountsByPrefix(prefix.trim());
      setSearchResults(results);
    } catch (error) {
      console.error('搜索账号失败:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // 保存账号信息
  const saveAccount = useCallback((
    username: string,
    email?: string,
    avatar?: string,
    loginType: 'username' | 'email' = 'username',
    token?: string,
  ): Account | null => {
    try {
      return realmManager.saveAccount(username, email, avatar, loginType, token);
    } catch (error) {
      console.error('保存账号失败:', error);
      return null;
    }
  }, []);

  // 获取所有账号
  const getAllAccounts = useCallback((): Account[] => {
    try {
      return realmManager.getAllAccounts();
    } catch (error) {
      console.error('获取所有账号失败:', error);
      return [];
    }
  }, []);

  // 清空搜索结果
  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
  }, []);

  return {
    searchResults,
    isSearching,
    searchAccounts,
    saveAccount,
    getAllAccounts,
    clearSearchResults,
  };
};
