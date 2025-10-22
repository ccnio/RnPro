// src/hooks/useDataLoader.ts
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@/types/error';

interface UseDataLoaderOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  staleTime?: number;
  gcTime?: number;
  retry?: number;
  retryDelay?: (attemptIndex: number) => number;
  enabled?: boolean;
}

interface UseDataLoaderReturn<T> {
  data: T | undefined;
  loading: boolean;
  error: string | null;
  errorType: ErrorType | null;
  refetch: () => Promise<void>;
}

export const useDataLoader = <T>({
  queryKey,
  queryFn,
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  retry = 3,
  retryDelay = (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  enabled = true,
}: UseDataLoaderOptions<T>): UseDataLoaderReturn<T> => {
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn,
    staleTime,
    gcTime,
    retry,
    retryDelay,
    enabled,
  });

  // 处理错误信息
  const errorMessage = error instanceof Error ? error.message : '数据加载失败';
  const errorType = (error as any)?.type || ErrorType.OTHER;

  return {
    data,
    loading,
    error: error ? errorMessage : null,
    errorType: error ? errorType : null,
    refetch: async () => {
      await refetch();
    },
  };
};
