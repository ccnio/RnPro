// src/hooks/useBanner.ts
import {useQuery} from '@tanstack/react-query';
import {Banner, bannerApi, BannerListParams} from '@/services/banner';
import {AppError, ErrorType} from '@/types/error';

interface UseBannerReturn {
  banners: Banner[];
  loading: boolean;
  error: string | null;
  errorType: ErrorType | null;
  refetch: () => Promise<void>;
}

export const useBanner = (params?: BannerListParams): UseBannerReturn => {
  const {
    data: banners = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banners", params?.type],
    queryFn: () => bannerApi.getList(params),
  });

  // 处理错误信息，保持原有接口
  const appError = error as AppError & Error;
  const errorMessage = appError?.message || '获取轮播失败';
  const errorType = appError?.type || ErrorType.OTHER;

  return {
    banners,
    loading,
    error: error ? errorMessage : null,
    errorType: error ? errorType : null,
    refetch: async () => {
      await refetch();
    },
  };
};
