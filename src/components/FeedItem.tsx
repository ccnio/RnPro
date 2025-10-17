// src/components/FeedItem.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { FeedItem as FeedItemType } from '@/services/feed';

interface FeedItemProps {
  item: FeedItemType;
  onPress?: (item: FeedItemType) => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    onPress?.(item);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // 格式化数字显示
  const formatNumber = (num: number): string => {
    if (num >= 100000000) {
      return `${(num / 100000000).toFixed(1)}亿`;
    } else if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}>
      {/* 左侧图片 */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.img }} 
          style={styles.image} 
          resizeMode="cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {imageLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
        {imageError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>加载失败</Text>
          </View>
        )}
      </View>

      {/* 右侧内容 */}
      <View style={styles.content}>
        {/* 标题 */}
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {/* 分类 - 这里可以根据实际需求调整 */}
        <Text style={styles.category}>推荐</Text>

        {/* 播放数和收藏数紧贴显示 */}
        <View style={styles.statsRow}>
          <Text style={styles.playNum}>
            {formatNumber(item.playNum)} 播放
          </Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.favNum}>
            {formatNumber(item.favNum)} 收藏
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 105, // 固定高度
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 5, // Feed item 间距
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0', // 灰色间隔
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#999',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 22,
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 4,
  },
  playNum: {
    fontSize: 12,
    color: '#999',
  },
  favNum: {
    fontSize: 12,
    color: '#999',
  },
});
