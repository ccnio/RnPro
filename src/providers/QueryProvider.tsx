// src/providers/QueryProvider.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 创建 QueryClient 实例
const queryClient = new QueryClient(/*{
  defaultOptions: {
    queries: {
      // 数据在 5 分钟内被认为是新鲜的，默认0
      staleTime: 5 * 1000,
      // 数据在 10 分钟后被垃圾回收，默认5min
      gcTime: 10 * 1000,
      // 失败时重试 3 次 默认3
      retry: 3,
      // 重试延迟
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // 窗口重新获得焦点时重新获取数据
      refetchOnWindowFocus: true,
      // 网络重新连接时重新获取数据
      refetchOnReconnect: true,
    },
    mutations: {
      // 失败时重试 1 次
      retry: 1,
    },
  },
}*/);

// QueryProvider 组件
interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// 导出 queryClient 供其他地方使用
export { queryClient };
