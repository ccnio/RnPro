// src/hooks/useGuess.ts
import { useQuery } from '@tanstack/react-query';
import {guessApi, GuessItem} from '@/services/guess';
import { AppError } from '@/types/error';
import { ErrorType } from '@/types/error';

interface UseGuessReturn {
  guessItems: GuessItem[];
  loading: boolean;
  error: string | null;
  errorType: ErrorType | null;
  refetch: () => Promise<void>;
}

export const useGuess = (): UseGuessReturn => {
  const {
    data: guessItems = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['guess'],
    queryFn: () => guessApi.getList(),
  });

  // 处理错误信息，保持原有接口
  const appError = error as AppError & Error;
  const errorMessage = appError?.message || '获取猜你喜欢失败';
  const errorType = appError?.type || ErrorType.OTHER;

  return {
    guessItems,
    loading,
    error: error ? errorMessage : null,
    errorType: error ? errorType : null,
    refetch: async () => {
      await refetch();
    },
  };
};
