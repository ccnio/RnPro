import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import TikTokRecommendationPage from '@/components/TikTokRecommendationPage';
import SquarePage from '@/components/SquarePage';

const {width: screenWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('recommendation');
  const scrollViewRef = useRef<ScrollView>(null);

  const tabs = [
    {id: 'recommendation', title: '推荐'},
    {id: 'square', title: '广场'},
  ];

  const handleTabChange = (tabId: string) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    setActiveTab(tabId);

    // 滚动到对应的页面
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: tabIndex * screenWidth,
        animated: true,
      });
    }
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(offsetX / screenWidth);
    setActiveTab(tabs[tabIndex].id);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={
          activeTab === 'recommendation' ? 'light-content' : 'dark-content'
        }
        backgroundColor="transparent"
        translucent
      />

      {/* 自定义 TopTabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => handleTabChange(tab.id)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}>
                {tab.title}
              </Text>
              {activeTab === tab.id && <View style={styles.indicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ViewPager 风格的内容区域 */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}>
        <View style={styles.pageContainer}>
          <TikTokRecommendationPage />
        </View>
        <View style={styles.pageContainer}>
          <SquarePage />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tabs: {
    flexDirection: 'row',
    height: 48,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#F8F9FA',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#007AFF',
    borderRadius: 1.5,
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    width: screenWidth,
    height: '100%',
  },
});

export default HomeScreen;
