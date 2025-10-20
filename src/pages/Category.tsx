// src/pages/Category.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconFont from '@/assets/iconfont';

const { width: screenWidth } = Dimensions.get('window');

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const Category: React.FC = () => {
  const insets = useSafeAreaInsets();

  // 分类数据
  const categories: CategoryItem[] = [
    { id: '1', name: '音乐', icon: 'icon-bofang', color: '#FF6B6B' },
    { id: '2', name: '播客', icon: 'icon-shengyin', color: '#4ECDC4' },
    { id: '3', name: '有声书', icon: 'icon-shijian', color: '#45B7D1' },
    { id: '4', name: '儿童', icon: 'icon-xihuan', color: '#96CEB4' },
    { id: '5', name: '教育', icon: 'icon-message', color: '#FFEAA7' },
    { id: '6', name: '商业', icon: 'icon-more', color: '#DDA0DD' },
    { id: '7', name: '健康', icon: 'icon-shoucang', color: '#98D8C8' },
    { id: '8', name: '科技', icon: 'icon-play2', color: '#F7DC6F' },
    { id: '9', name: '体育', icon: 'icon-fullscreen', color: '#BB8FCE' },
    { id: '10', name: '娱乐', icon: 'icon-huanyipi', color: '#85C1E9' },
    { id: '11', name: '新闻', icon: 'icon-down', color: '#F8C471' },
    { id: '12', name: '生活', icon: 'icon-paste', color: '#82E0AA' },
  ];

  const handleCategoryPress = (category: CategoryItem) => {
    console.log('点击分类:', category.name);
    // 这里可以处理分类点击逻辑，比如跳转到分类详情页
  };

  const renderCategoryItem = (category: CategoryItem) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryItem, { backgroundColor: category.color }]}
      onPress={() => handleCategoryPress(category)}
      activeOpacity={0.8}>
      <IconFont name={category.icon} size={32} color="#fff" />
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>分类</Text>
      </View>

      {/* 分类网格 */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoryGrid}>
          {categories.map(renderCategoryItem)}
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
  header: {
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (screenWidth - 48) / 3, // 3列布局，减去padding和间距
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginTop: 8,
  },
});

export default Category;
