// src/hooks/useFeed.ts
import { useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { feedApi, FeedItem, FeedListParams } from '@/services/feed';
import { AppError, ErrorType } from '@/types/error';

interface UseFeedReturn {
  feedItems: FeedItem[];
  loading: boolean;
  error: string | null;
  errorType: ErrorType | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => Promise<void>;
  loadMore: () => void;
  refresh: () => Promise<void>;
}

export const useFeed = (params?: FeedListParams): UseFeedReturn => {
  const [pageSize] = useState(params?.pageSize || 10);

  const {
    data,
    isLoading: loading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['feed', pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await feedApi.getList({
        page: pageParam,
        pageSize,
      });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      return currentPage < lastPage.totalPage ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // 处理错误信息
  const appError = error as AppError & Error;
  const errorMessage = appError?.message || '获取 Feed 失败';
  const errorType = appError?.type || ErrorType.OTHER;

  // 合并所有页面的数据
  const feedItems = data?.pages.flatMap(page => page.content) || [];

  // 加载更多
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 刷新
  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    feedItems,
    loading,
    error: error ? errorMessage : null,
    errorType: error ? errorType : null,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    refetch: async () => {
      await refetch();
    },
    loadMore,
    refresh,
  };
};
