// src/pages/home/index.tsx - 使用 FlatList 重构
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {View, FlatList, RefreshControl, Text, ActivityIndicator, Dimensions, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {ErrorBoundary} from '@/components/ErrorBoundary';
import {ErrorDisplay} from '@/components/ErrorDisplay';
import {HomeHeader} from '@/components/HomeHeader';
import {FeedItem} from '@/components/FeedItem';
import {useFeed} from '@/hooks/useFeed';
import {FeedItem as FeedItemType} from '@/services/feed';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Home = () => {
  console.log('home render');
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // Feed 数据
  const {
    feedItems,
    loading: feedLoading,
    error: feedError,
    errorType: feedErrorType,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    refresh: refreshFeed,
  } = useFeed({ pageSize: 10 });

  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const onPress = () => {
  //   navigation.navigate('Detail', {id: '123', name: 'example'});
  // };

  const handleGuessItemPress = (item: any) => {
    console.log('猜你喜欢 item 点击:', item);
    // 这里可以处理点击逻辑，比如跳转到详情页
  };

  const handleMorePress = () => {
    console.log('查看更多猜你喜欢');
    // 这里可以处理查看更多逻辑
  };

  const handleRefreshPress = () => {
    console.log('换一批猜你喜欢');
    // 这里可以处理换一批逻辑
  };

  const handleFeedItemPress = (item: FeedItemType) => {
    console.log('Feed item 点击:', item);
    // 这里可以处理点击逻辑，比如跳转到详情页
  };

  const handleSearch = (query: string) => {
    console.log('搜索:', query);
    // 这里可以处理搜索逻辑，比如跳转到搜索结果页
  };

  const handleHistoryItemPress = (item: any) => {
    console.log('搜索历史点击:', item);
    // 这里可以处理搜索历史点击逻辑
  };

  const handleBannerSlideChange = (index: number) => {
    // 添加颜色切换动画
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
    
    setCurrentBannerIndex(index);
  };

  // 不同banner页面的渐变颜色配置
  const gradientColors = [
    ['rgba(248, 100, 66, 1)', 'rgba(248, 100, 66, 0.8)', 'rgba(248, 100, 66, 0.4)', 'rgba(255, 255, 255, 0)'], // 橙色
    ['rgba(76, 175, 80, 1)', 'rgba(76, 175, 80, 0.8)', 'rgba(76, 175, 80, 0.4)', 'rgba(255, 255, 255, 0)'], // 绿色
    ['rgba(33, 150, 243, 1)', 'rgba(33, 150, 243, 0.8)', 'rgba(33, 150, 243, 0.4)', 'rgba(255, 255, 255, 0)'], // 蓝色
    ['rgba(156, 39, 176, 1)', 'rgba(156, 39, 176, 0.8)', 'rgba(156, 39, 176, 0.4)', 'rgba(255, 255, 255, 0)'], // 紫色
    ['rgba(255, 152, 0, 1)', 'rgba(255, 152, 0, 0.8)', 'rgba(255, 152, 0, 0.4)', 'rgba(255, 255, 255, 0)'], // 深橙色
  ];

  // 下拉刷新处理
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshFeed();
    } finally {
      setRefreshing(false);
    }
  }, [refreshFeed]);

  // 渲染 Header
  const renderHeader = useCallback(() => (
    <View style={{ paddingTop: insets.top }}>
      <HomeHeader
        onGuessItemPress={handleGuessItemPress}
        onMorePress={handleMorePress}
        onRefreshPress={handleRefreshPress}
        onSearch={handleSearch}
        onHistoryItemPress={handleHistoryItemPress}
        onBannerSlideChange={handleBannerSlideChange}
      />
    </View>
  ), [insets.top, handleGuessItemPress, handleMorePress, handleRefreshPress, handleSearch, handleHistoryItemPress, handleBannerSlideChange]);

  // 渲染 Feed Item
  const renderFeedItem = useCallback(({ item }: { item: FeedItemType }) => (
    <FeedItem item={item} onPress={handleFeedItemPress} />
  ), [handleFeedItemPress]);

  // 渲染 Footer（加载更多）
  const renderFooter = useCallback(() => {
    if (!hasNextPage && feedItems.length > 0) {
      return (
        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
          <Text style={{ color: '#999', fontSize: 14 }}>没有更多内容了</Text>
        </View>
      );
    }

    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={{ color: '#999', fontSize: 14, marginTop: 8 }}>加载中...</Text>
        </View>
      );
    }

    return null;
  }, [hasNextPage, isFetchingNextPage, feedItems.length]);

  // 处理滚动到底部
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !refreshing) {
      console.log('触发加载更多');
      loadMore();
    }
  }, [hasNextPage, isFetchingNextPage, refreshing, loadMore]);

  // 渲染空状态
  const renderEmpty = useCallback(() => {
    if (feedLoading) {
      return (
        <View style={{ paddingVertical: 60, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ color: '#666', fontSize: 16, marginTop: 12 }}>加载中...</Text>
        </View>
      );
    }

    if (feedError && feedErrorType) {
      return (
        <View style={{ paddingVertical: 60, alignItems: 'center' }}>
          <ErrorDisplay
            errorType={feedErrorType}
            message={feedError}
            onRetry={handleRefresh}
            showRetry={true}
            style={{ width: '100%', height: 200 }}
          />
        </View>
      );
    }

    return (
      <View style={{ paddingVertical: 60, alignItems: 'center' }}>
        <Text style={{ color: '#666', fontSize: 16 }}>暂无内容</Text>
      </View>
    );
  }, [feedLoading, feedError, feedErrorType, handleRefresh]);

  // 固定的渐变背景组件
  const FixedGradientBackground = () => {
    const bannerHeight = 200;
    const gradientHeight = insets.top + (bannerHeight * 2) / 3; // 状态栏高度 + banner高度的2/3
    const currentColors = gradientColors[currentBannerIndex] || gradientColors[0]; // 使用当前banner对应的颜色
    
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: screenWidth,
          height: gradientHeight,
          zIndex: -1,
          opacity: fadeAnim,
        }}
      >
        <LinearGradient
          colors={currentColors}
          locations={[0, 0.3, 0.7, 1]}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FixedGradientBackground />
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        // 性能优化配置
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        // 精确的 getItemLayout 配置
        getItemLayout={(data, index) => {
          const ITEM_HEIGHT = 110; // FeedItem 高度 + 间距 (105 + 5)
          return {
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          };
        }}
      />
    </View>
  );
};

export default Home;
