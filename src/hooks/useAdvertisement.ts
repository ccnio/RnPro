// src/hooks/useAdvertisement.ts
import { useState, useEffect, useCallback } from 'react';
import { getAdvertisement, AdvertisementResponse } from '@/services/advertisement';
import { useUserStore } from '@/stores/userStore';
import { Resource, isSuccess, isError } from '@/types/resource';

export const useAdvertisement = () => {
  const { isLoggedIn } = useUserStore();
  const [advertisement, setAdvertisement] = useState<AdvertisementResponse | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvertisement = useCallback(async () => {
    if (!isLoggedIn) {
      setAdvertisement(undefined);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const resource = await getAdvertisement();
    
    if (isSuccess(resource)) {
      setAdvertisement(resource.data);
      console.log('广告数据获取成功:', resource.data);
    } else if (isError(resource)) {
      const errorMessage = resource.errorMsg || '获取广告失败';
      setError(errorMessage);
      console.error('获取广告失败:', resource);
    }
    
    setLoading(false);
  }, [isLoggedIn]);

  // 当登录状态改变时重新获取数据
  useEffect(() => {
    fetchAdvertisement();
  }, [fetchAdvertisement]);

  const refetch = useCallback(async () => {
    await fetchAdvertisement();
  }, [fetchAdvertisement]);

  return {
    advertisement,
    loading,
    error,
    refetch,
    // 当用户登录且广告获取成功时才显示广告
    shouldShowAd: isLoggedIn && !loading && !error && advertisement !== undefined,
  };
};
