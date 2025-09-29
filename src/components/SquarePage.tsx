import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
}

interface ListItem {
  id: string;
  title: string;
  content: string;
  time: string;
  avatar: string;
}

const SquarePage: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // 轮播图数据
  const bannerData: BannerItem[] = [
    {
      id: '1',
      title: '热门话题',
      subtitle: '探索最新的技术讨论',
      backgroundColor: '#FF6B6B',
    },
    {
      id: '2',
      title: '技术分享',
      subtitle: '学习优秀开发经验',
      backgroundColor: '#4ECDC4',
    },
    {
      id: '3',
      title: '社区活动',
      subtitle: '参与线下交流会',
      backgroundColor: '#45B7D1',
    },
    {
      id: '4',
      title: '开源项目',
      subtitle: '贡献代码和想法',
      backgroundColor: '#96CEB4',
    },
  ];

  const listData: ListItem[] = [
    {
      id: '1',
      title: 'React Native 性能优化指南',
      content: '详细介绍了如何优化 React Native 应用的性能...',
      time: '2小时前',
      avatar: '👨‍💻',
    },
    {
      id: '2',
      title: 'TypeScript 最佳实践',
      content: '分享 TypeScript 在实际项目中的应用经验...',
      time: '5小时前',
      avatar: '📘',
    },
    {
      id: '3',
      title: 'Node.js 微服务架构',
      content: '讲解了如何使用 Node.js 构建微服务应用...',
      time: '8小时前',
      avatar: '🚀',
    },
    {
      id: '4',
      title: '前端工程化实践',
      content: '现代化的前端工程化开发经验和工具链...',
      time: '12小时前',
      avatar: '⚡',
    },
    {
      id: '5',
      title: 'Vue 3 组合式API详解',
      content: '深入理解 Vue 3 的新特性和组合式API...',
      time: '1天前',
      avatar: '💚',
    },
    {
      id: '6',
      title: 'GraphQL 实战教程',
      content: '从零开始学习 GraphQL 的使用和最佳实践...',
      time: '16小时前',
      avatar: '📊',
    },
  ];

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % bannerData.length;
        console.log(`Auto scrolling banner from ${prevIndex} to ${nextIndex}`);
        
        // 使用 Animated.timing 进行滚动
        Animated.timing(scrollX, {
          toValue: -nextIndex * screenWidth,
          duration: 300,
          useNativeDriver: true,
        }).start();
        
        return nextIndex;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      scrollX.stopAnimation();
    };
  }, []);

  // 渲染列表项
  const renderListItem = ({ item }: { item: ListItem }) => (
    <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
      <View style={styles.listItemLeft}>
        <Text style={styles.avatar}>{item.avatar}</Text>
      </View>
      <View style={styles.listItemRight}>
        <View style={styles.listItemHeader}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemTime}>{item.time}</Text>
        </View>
        <Text style={styles.listItemContent} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // 渲染轮播图
  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerWrapper}>
        <Animated.View
          style={[
            styles.bannerRow,
            {
              transform: [{ translateX: scrollX }],
            },
          ]}
        >
          {bannerData.map((item, index) => (
            <View key={item.id} style={[styles.bannerItem, { backgroundColor: item.backgroundColor }]}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </Animated.View>
      </View>
      
      {/* 指示器 */}
      <View style={styles.bannerIndicator}>
        {bannerData.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.dot,
              dotIndex === currentBannerIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      data={listData}
      renderItem={renderListItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={renderBanner}
    />
  );
};

const styles = StyleSheet.create({
  // 轮播图样式
  bannerContainer: {
    width: screenWidth,
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerWrapper: {
    width: screenWidth,
    height: 200,
  },
  bannerRow: {
    flexDirection: 'row',
    width: screenWidth * 4, // bannerData.length，暂时写死为4
    height: 200,
  },
  bannerItem: {
    width: screenWidth,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },

  // 指示器样式
  bannerIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.4,
    marginHorizontal: 4,
  },
  activeDot: {
    opacity: 1,
    width: 20,
    borderRadius: 4,
  },

  // 列表样式
  listContent: {
    paddingBottom: 20,
  },

  // 列表项样式
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItemLeft: {
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
  },
  listItemRight: {
    flex: 1,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  listItemTime: {
    fontSize: 12,
    color: '#999999',
  },
  listItemContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },

  // 列表标题样式
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default SquarePage;