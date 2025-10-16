// src/components/DataLoadingWrapper.tsx
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { ErrorType } from '@/types/error';

interface DataLoadingWrapperProps {
  loading: boolean;
  error: string | null;
  errorType: ErrorType | null;
  onRetry: () => void;
  emptyMessage?: string;
  loadingMessage?: string;
  children: React.ReactNode;
  containerStyle?: any;
  loadingHeight?: number;
}

export const DataLoadingWrapper: React.FC<DataLoadingWrapperProps> = ({
  loading,
  error,
  errorType,
  onRetry,
  emptyMessage = '暂无数据',
  loadingMessage = '加载中...',
  children,
  containerStyle,
  loadingHeight = 200,
}) => {
  // 加载状态
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { height: loadingHeight }, containerStyle]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>{loadingMessage}</Text>
      </View>
    );
  }

  // 错误状态
  if (error && errorType) {
    return (
      <View style={[styles.errorContainer, { height: loadingHeight }, containerStyle]}>
        <ErrorDisplay
          errorType={errorType}
          message={error}
          onRetry={onRetry}
          showRetry={true}
          style={{ height: loadingHeight }}
        />
      </View>
    );
  }

  // 没有数据
  if (!children) {
    return (
      <View style={[styles.emptyContainer, { height: loadingHeight }, containerStyle]}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  // 正常显示内容
  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  errorContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
});
