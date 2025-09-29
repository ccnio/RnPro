import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, PanResponder, Animated } from 'react-native';

interface VideoData {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  backgroundColor: string;
}

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const TikTokRecommendationPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const offsetY = useRef(new Animated.Value(0)).current;

  const videoData: VideoData[] = [
    {
      id: '1',
      title: '新技术趋势',
      subtitle: 'AI技术在移动开发中的应用',
      content: '随着人工智能技术的不断发展，越来越多的移动应用开始集成AI功能，为用户提供更智能的体验。',
      backgroundColor: '#FF6B6B',
    },
    {
      id: '2',
      title: '设计理念',
      subtitle: '现代移动应用设计原则',
      content: '好的设计不仅要美观，更要注重用户体验。简洁、直观、一致性是现代应用设计的基本要求。',
      backgroundColor: '#4ECDC4',
    },
    {
      id: '3',
      title: '性能优化',
      subtitle: '提升应用响应速度的技巧',
      content: '应用的性能直接影响用户体验。通过合理的代码优化、资源管理和缓存策略，可以显著提升应用性能。',
      backgroundColor: '#45B7D1',
    },
    {
      id: '4',
      title: '用户体验',
      subtitle: '以人为本的产品设计',
      content: '优秀的用户体验需要深入了解用户需求，从用户角度思考问题，创造出真正有价值的产品。',
      backgroundColor: '#96CEB4',
    },
    {
      id: '5',
      title: '市场趋势',
      subtitle: '移动应用市场的发展方向',
      content: '随着5G网络的普及和物联网的发展，移动应用正朝着更加智能化和多样化的方向发展。',
      backgroundColor: '#FECA57',
    },
    {
      id: '6',
      title: '技术创新',
      subtitle: '前端框架的最新发展',
      content: 'React、Vue、Angular等前端框架不断演进，带来更高效的开发体验和更好的性能表现。',
      backgroundColor: '#FF9F43',
    },
    {
      id: '7',
      title: '云原生',
      subtitle: '现代化部署架构',
      content: '容器化、微服务、DevOps等云原生技术正在重塑软件开发和部署的方式，提升系统的可靠性和可扩展性。',
      backgroundColor: '#A55EEA',
    },
    {
      id: '8',
      title: '数据科学',
      subtitle: '机器学习算法实践',
      content: '从推荐系统到图像识别，机器学习算法在各个领域都有广泛应用，持续推动技术创新的边界。',
      backgroundColor: '#26C6DA',
    },
  ];

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderVideo = ({ item, index }: { item: VideoData; index: number }) => (
    <View style={[styles.videoContainer, { backgroundColor: item.backgroundColor }]}>
      {/* 主要内容区域 */}
      <View style={styles.contentArea}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.description}>{item.content}</Text>
        </View>
      </View>

      {/* 右侧功能按钮区域 */}
      <View style={styles.rightPanel}>
        <View style={styles.rightButtonContainer}>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>👍</Text>
            <Text style={styles.actionText}>123</Text>
          </View>
          
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>评论</Text>
          </View>
          
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>分享</Text>
          </View>
          
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>⭐</Text>
            <Text style={styles.actionText}>收藏</Text>
          </View>
        </View>
      </View>

      {/* 底部信息栏 */}
      <View style={styles.bottomInfo}>
        <View style={styles.infoContainer}>
          <Text style={styles.authorText}>@{item.title.toLowerCase().replace(/\s+/g, '')}</Text>
          <Text style={styles.videoDescription}>{item.subtitle}</Text>
        </View>
        
        {/* 页码指示器 */}
        <View style={styles.pageIndicator}>
          <Text style={styles.pageText}>{index + 1}</Text>
          <Text style={styles.pageSeparator}>/</Text>
          <Text style={styles.pageText}>{videoData.length}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videoData}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />
      
      {/* 顶部进度指示器 */}
      <View style={styles.topIndicator}>
        <View style={styles.progressBar}>
          {videoData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentIndex && styles.activeProgressDot,
                index < currentIndex && styles.completedProgressDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  flatList: {
    flex: 1,
  },
  videoContainer: {
    height: screenHeight,
    width: screenWidth,
    position: 'relative',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rightPanel: {
    position: 'absolute',
    right: 16,
    bottom: 120,
  },
  rightButtonContainer: {
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
    width: 60,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  bottomInfo: {
    position: 'absolute',
    left: 16,
    right: 80,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 1,
  },
  authorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  videoDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  pageSeparator: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.6,
    marginHorizontal: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  topIndicator: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    height: 3,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 1,
    borderRadius: 1.5,
  },
  activeProgressDot: {
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
  completedProgressDot: {
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
  },
});

export default TikTokRecommendationPage;
