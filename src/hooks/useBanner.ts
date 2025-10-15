// src/hooks/useBanner.ts
import { useState, useEffect, useCallback } from 'react';
import { bannerApi, Banner, BannerListParams } from '@/services/banner';
import { AppError } from '@/types/error';
import { ErrorType } from '@/types/error';

interface UseBannerReturn {
  banners: Banner[];
  loading: boolean;
  error: string | null;
  errorType: ErrorType | null;
  refetch: () => Promise<void>;
}

export const useBanner = (params?: BannerListParams): UseBannerReturn => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setErrorType(null);
      const data = await bannerApi.getList(params);
      console.log('获取到的轮播图数据:', data);
      setBanners(data);
    } catch (err) {
      const appError = err as AppError & Error;
      setError(appError.message || '获取轮播失败');
      setErrorType(appError.type || ErrorType.OTHER);
      console.error('获取轮播图失败:', appError);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.type]); // BannerListParams 只有 type 字段，避免无限循环

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return {
    banners,
    loading,
    error,
    errorType,
    refetch: fetchBanners,
  };
};