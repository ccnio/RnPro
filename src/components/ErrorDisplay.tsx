// src/components/ErrorDisplay.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ErrorType } from '@/types/error';

interface ErrorDisplayProps {
  errorType: ErrorType;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  style?: any;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorType,
  message,
  onRetry,
  showRetry = true,
  style,
}) => {
  const getErrorIcon = () => {
    switch (errorType) {
      case ErrorType.NETWORK:
        return '📶';
      case ErrorType.OTHER:
        return '⚠️';
      default:
        return '❌';
    }
  };

  const getErrorColor = () => {
    switch (errorType) {
      case ErrorType.NETWORK:
        return '#FF6B35'; // 橙色 - 网络问题
      case ErrorType.OTHER:
        return '#FF4757'; // 红色 - 服务问题
      default:
        return '#747D8C'; // 灰色 - 未知问题
    }
  };

  const shouldShowRetry = showRetry && onRetry;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.icon}>{getErrorIcon()}</Text>
        <Text style={[styles.message, { color: getErrorColor() }]}>
          {message}
        </Text>
        
        {shouldShowRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryText}>重试</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
