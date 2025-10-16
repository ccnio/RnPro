// src/components/GuessYouLike.tsx
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGuess} from '@/hooks/useGuess.ts';
import {ErrorDisplay} from '@/components/ErrorDisplay.tsx';
import IconFont from '@/assets/iconfont';

const {width: screenWidth} = Dimensions.get('window');

// 计算每个 item 的宽度
const itemWidth = (screenWidth - 40 - 40) / 3; // 屏幕宽度 - 左右padding - 两个间距

interface GuessYouLikeProps {
  onItemPress?: (item: any) => void;
  onMorePress?: () => void;
  onRefreshPress?: () => void;
}

export const GuessYouLike: React.FC<GuessYouLikeProps> = ({
  onItemPress,
  onMorePress,
  onRefreshPress,
}) => {
  const {guessItems, loading, error, errorType, refetch} = useGuess();

  // 加载状态
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>猜你喜欢</Text>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </View>
    );
  }

  // 错误状态
  if (error && errorType) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <IconFont name="icon-xihuan" size={16} color="#007AFF" />
            <Text style={styles.title}>猜你喜欢</Text>
          </View>
        </View>
        <View style={styles.errorContainer}>
          <ErrorDisplay
            errorType={errorType}
            message={error}
            onRetry={refetch}
            showRetry={true}
          />
        </View>
      </View>
    );
  }

  // 没有数据
  if (!guessItems || guessItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>猜你喜欢</Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>暂无推荐内容</Text>
        </View>
      </View>
    );
  }

  // 渲染单个 item
  const renderItem = (item: any, index: number) => (
    <TouchableOpacity
      key={item.id}
      style={styles.item}
      onPress={() => onItemPress?.(item)}
      activeOpacity={0.8}>
      <Image
        source={{uri: item.image}}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <Text style={styles.itemTitle} numberOfLines={1}>
        {item.linkUrl}
      </Text>
    </TouchableOpacity>
  );

  // 渲染一行（3个 item）
  const renderRow = (items: any[], rowIndex: number) => (
    <View key={rowIndex} style={styles.row}>
      {items.map((item, index) => (
        <View key={rowIndex * 3 + index} style={styles.itemWrapper}>
          {renderItem(item, rowIndex * 3 + index)}
        </View>
      ))}
    </View>
  );

  // 将数据分组为两行
  const firstRow = guessItems.slice(0, 3);
  const secondRow = guessItems.slice(3, 6);

  return (
    <View style={styles.container}>
      {/* 标题部分 */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <IconFont name="icon-xihuan" size={16} color="#007AFF" />
          <Text style={styles.title}>猜你喜欢</Text>
        </View>
        <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
          <Text style={styles.moreText}>查看更多</Text>
        </TouchableOpacity>
      </View>

      {/* 内容部分 */}
      <View style={styles.content}>
        {renderRow(firstRow, 0)}
        {secondRow.length > 0 && renderRow(secondRow, 1)}
      </View>

      {/* 换一批按钮 */}
      <View style={styles.refreshContainer}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefreshPress || refetch}
          activeOpacity={0.8}
        >
          <IconFont name="icon-huanyipi" size={16} color="#007AFF" />
          <Text style={styles.refreshText}>换一批</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart:10,
    color: '#333',
  },
  moreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  moreText: {
    fontSize: 14,
    color: '#007AFF',
  },
  content: {
    // 内容容器
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemWrapper: {
    width: itemWidth,
    marginRight: 20,
  },
  item: {
    width: itemWidth,
    alignItems: 'center',
  },
  itemImage: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  itemTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 16,
    width: itemWidth,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  errorContainer: {
    height: 200,
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
  refreshContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  refreshText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
  },
});
