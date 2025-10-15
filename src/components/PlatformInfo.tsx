// src/components/PlatformInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { appConfig } from '@/config/app';

export const PlatformInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>平台信息</Text>
      <Text style={styles.info}>平台: {appConfig.platform.os}</Text>
      <Text style={styles.info}>版本: {appConfig.platform.version}</Text>
      <Text style={styles.info}>应用: {appConfig.name} v{appConfig.version}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
});
