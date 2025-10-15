// src/components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#f5f5f5',
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ff4444',
            marginBottom: 10,
          }}>
            出现错误
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666',
            textAlign: 'center',
            marginBottom: 20,
          }}>
            {this.state.error?.message || '未知错误'}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ hasError: false, error: undefined })}
            style={{
              backgroundColor: '#007AFF',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>重试</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
