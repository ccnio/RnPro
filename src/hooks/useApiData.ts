// src/hooks/useApiData.ts
import { useDataLoader } from './useDataLoader';

// 通用的API Hook返回类型
export interface BaseApiReturn<T> {
  data: T;
  loading: boolean;
  error: string | null;
  errorType: any;
  refetch: () => Promise<void>;
}

interface UseApiDataOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  staleTime?: number;
  gcTime?: number;
  retry?: number;
  retryDelay?: (attemptIndex: number) => number;
  enabled?: boolean;
}

interface UseApiDataReturn<T> {
  data: T;
  loading: boolean;
  error: string | null;
  errorType: any;
  refetch: () => Promise<void>;
}

export const useApiData = <T>({
  queryKey,
  queryFn,
  staleTime,
  gcTime,
  retry,
  retryDelay,
  enabled,
}: UseApiDataOptions<T>): UseApiDataReturn<T> => {
  const { data, loading, error, errorType, refetch } = useDataLoader({
    queryKey,
    queryFn,
    staleTime,
    gcTime,
    retry,
    retryDelay,
    enabled,
  });

  return {
    data: data as T,
    loading,
    error,
    errorType,
    refetch,
  };
};

// 创建特定API Hook的工厂函数
export const createApiHook = <T, P = void>(
  config: {
    queryKey: (params?: P) => string[];
    queryFn: (params?: P) => Promise<T>;
    dataKey: string;
    staleTime?: number;
    gcTime?: number;
    retry?: number;
    retryDelay?: (attemptIndex: number) => number;
  }
) => {
  return (params?: P) => {
    const { data, loading, error, errorType, refetch } = useApiData({
      queryKey: config.queryKey(params),
      queryFn: () => config.queryFn(params),
      staleTime: config.staleTime,
      gcTime: config.gcTime,
      retry: config.retry,
      retryDelay: config.retryDelay,
    });

    return {
      [config.dataKey]: data || [],
      loading,
      error,
      errorType,
      refetch,
    };
  };
};