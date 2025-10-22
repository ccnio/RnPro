// src/hooks/useUserStats.ts
import { useState, useEffect, useCallback } from 'react';
import { getUserStats, UserStatsData } from '@/services/userStats';
import { useUserStore } from '@/stores/userStore';
import { Resource, isSuccess, isError } from '@/types/resource';

export const useUserStats = () => {
  const { isLoggedIn } = useUserStore();
  const [userStats, setUserStats] = useState<UserStatsData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStats = useCallback(async () => {
    if (!isLoggedIn) {
      setUserStats(undefined);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const resource = await getUserStats();
    
    if (isSuccess(resource)) {
      setUserStats(resource.data);
      console.log('用户统计数据获取成功:', resource.data);
    } else if (isError(resource)) {
      const errorMessage = resource.errorMsg || '获取用户统计数据失败';
      setError(errorMessage);
      console.error('获取用户统计数据失败:', resource);
    }
    
    setLoading(false);
  }, [isLoggedIn]);

  // 当登录状态改变时重新获取数据
  useEffect(() => {
    fetchUserStats();
  }, [fetchUserStats]);

  const refetch = useCallback(async () => {
    await fetchUserStats();
  }, [fetchUserStats]);

  return {
    userStats,
    loading,
    error,
    errorType: error ? 'OTHER' : null,
    refetch,
    // 只有当用户登录且两个接口都成功时才显示统计数据
    shouldShowStats: isLoggedIn && !loading && !error && userStats !== undefined,
  };
};
