// src/hooks/useGuess.ts
import { guessApi, GuessItem, GuessListParams } from '@/services/guess';
import { createApiHook, BaseApiReturn } from './useApiData';

// 使用基础接口，只需要添加特定的数据字段
interface UseGuessReturn extends Omit<BaseApiReturn<GuessItem[]>, 'data'> {
  guessItems: GuessItem[];
}

export const useGuess = createApiHook<GuessItem[], GuessListParams>({
  queryKey: (params) => ['guess', params?.type || 'home', String(params?.timestamp || 0)],
  queryFn: (params) => guessApi.getList(params),
  dataKey: 'guessItems',
}) as (params?: GuessListParams) => UseGuessReturn;
