// src/pages/Category.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import IconFont from '@/assets/iconfont';
import { useMyCategories, CategoryItem } from '@/hooks/useMyCategoriesContext';

const { width: screenWidth } = Dimensions.get('window');

interface CategoryGroup {
  id: string;
  title: string;
  items: CategoryItem[];
}

const Category: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isEditMode, setIsEditMode] = useState(false);
  
  // 使用useMyCategories hook
  const {
    myCategories,
    getAllCategories,
    getOtherCategories,
    saveMyCategories,
    isLoading
  } = useMyCategories();

  // 构建分类组数据
  const categoryGroups = useMemo(() => {
    if (isLoading) return [];
    
    const allCategories = getAllCategories();
    const otherCategories = getOtherCategories();
    
    return [
      {
        id: 'my-categories',
        title: '我的分类',
        items: myCategories,
      },
      {
        id: 'entertainment',
        title: '娱乐',
        items: otherCategories.filter(cat => ['3', '4', '10'].includes(cat.id)),
      },
      {
        id: 'education',
        title: '教育',
        items: otherCategories.filter(cat => ['5', '6'].includes(cat.id)),
      },
      {
        id: 'lifestyle',
        title: '生活',
        items: otherCategories.filter(cat => ['7', '8', '9', '11', '12'].includes(cat.id)),
      },
    ];
  }, [myCategories, isLoading, getAllCategories, getOtherCategories]);

  // 将item移动到我的分类
  const moveItemToMyCategories = (item: CategoryItem, fromGroupId: string) => {
    const newMyCategories = [...myCategories, item];
    console.log('添加分类到我的分类:', item.name, '新的分类列表:', newMyCategories.map(c => c.name));
    saveMyCategories(newMyCategories);
  };

  // 从我的分类中删除item
  const handleRemoveFromMyCategories = (item: CategoryItem) => {
    const newMyCategories = myCategories.filter(cat => cat.id !== item.id);
    console.log('从我的分类中删除:', item.name, '新的分类列表:', newMyCategories.map(c => c.name));
    saveMyCategories(newMyCategories);
  };

  // 处理编辑模式切换
  const handleEditToggle = () => {
    if (isEditMode) {
      // 如果是完成按钮，返回上一页
      navigation.goBack();
    } else {
      // 如果是编辑按钮，进入编辑模式
      setIsEditMode(true);
    }
  };

  // 处理item点击
  const handleItemPress = (item: CategoryItem, groupId: string) => {
    if (!isEditMode) {
      console.log('点击分类:', item.name);
      return;
    }

    // 编辑模式下，将item移动到"我的分类"
    if (groupId !== 'my-categories') {
      moveItemToMyCategories(item, groupId);
    }
  };


  // 渲染分类item
  const renderCategoryItem = (item: CategoryItem, groupId: string, index: number) => {
    const isMyCategories = groupId === 'my-categories';
    const canDelete = isMyCategories && isEditMode;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.categoryItem, { backgroundColor: item.color }]}
        onPress={() => handleItemPress(item, groupId)}
        activeOpacity={0.8}>
        <IconFont name={item.icon as any} size={32} color="#fff" />
        <Text style={styles.categoryName}>{item.name}</Text>
        {canDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleRemoveFromMyCategories(item)}
            activeOpacity={0.8}>
            <IconFont name="icon-more" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  // 渲染分类组
  const renderCategoryGroup = (group: CategoryGroup) => (
    <View key={group.id} style={styles.categoryGroup}>
      <Text style={styles.groupTitle}>{group.title}</Text>
      <View style={styles.categoryGrid}>
        {group.items.map((item, index) => renderCategoryItem(item, group.id, index))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconFont name="icon-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>分类</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Text style={styles.editButtonText}>{isEditMode ? '完成' : '编辑'}</Text>
        </TouchableOpacity>
      </View>

      {/* 分类列表 */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {categoryGroups.map(renderCategoryGroup)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  categoryGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12, // 使用 gap 控制列/行间距，避免额外 margin 造成换行
  },
  categoryItem: {
    // 4列布局：可用宽度 = 屏幕宽度 - 两侧padding(16*2) - 3个列间距(12*3)
    // 每项宽度 = 可用宽度 / 4
    width: (screenWidth - 32 - 36) / 4,
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
    position: 'relative',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginTop: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Category;
