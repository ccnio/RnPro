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
import IconFont from '@/assets/iconfont';
import { MMKV } from 'react-native-mmkv';

const { width: screenWidth } = Dimensions.get('window');

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  originalCategoryId?: string; // 记录原始分类ID，用于删除时恢复
}

interface CategoryGroup {
  id: string;
  title: string;
  items: CategoryItem[];
}

const Category: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isEditMode, setIsEditMode] = useState(false);
  const MY_CATEGORIES_STORAGE_KEY = 'my_categories_ids_v1';
  const storage = new MMKV();

  // 初始分类数据
  const initialCategories: CategoryItem[] = [
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

  // 分类组数据
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([
    {
      id: 'my-categories',
      title: '我的分类',
      items: [
        { id: '1', name: '音乐', icon: 'icon-bofang', color: '#FF6B6B' },
        { id: '2', name: '播客', icon: 'icon-shengyin', color: '#4ECDC4' },
      ],
    },
    {
      id: 'entertainment',
      title: '娱乐',
      items: [
        { id: '3', name: '有声书', icon: 'icon-shijian', color: '#45B7D1' },
        { id: '4', name: '儿童', icon: 'icon-xihuan', color: '#96CEB4' },
        { id: '10', name: '娱乐', icon: 'icon-huanyipi', color: '#85C1E9' },
      ],
    },
    {
      id: 'education',
      title: '教育',
      items: [
        { id: '5', name: '教育', icon: 'icon-message', color: '#FFEAA7' },
        { id: '6', name: '商业', icon: 'icon-more', color: '#DDA0DD' },
      ],
    },
    {
      id: 'lifestyle',
      title: '生活',
      items: [
        { id: '7', name: '健康', icon: 'icon-shoucang', color: '#98D8C8' },
        { id: '8', name: '科技', icon: 'icon-play2', color: '#F7DC6F' },
        { id: '9', name: '体育', icon: 'icon-fullscreen', color: '#BB8FCE' },
        { id: '11', name: '新闻', icon: 'icon-down', color: '#F8C471' },
        { id: '12', name: '生活', icon: 'icon-paste', color: '#82E0AA' },
      ],
    },
  ]);

  // 初始快照用于重建（避免在异步加载时丢失来源信息）
  const initialGroupsRef = useRef<CategoryGroup[] | null>(null);
  if (initialGroupsRef.current == null) {
    initialGroupsRef.current = JSON.parse(JSON.stringify([] as any)) as any;
    initialGroupsRef.current = JSON.parse(JSON.stringify([
      {
        id: 'my-categories',
        title: '我的分类',
        items: [
          { id: '1', name: '音乐', icon: 'icon-bofang', color: '#FF6B6B' },
          { id: '2', name: '播客', icon: 'icon-shengyin', color: '#4ECDC4' },
        ],
      },
      {
        id: 'entertainment',
        title: '娱乐',
        items: [
          { id: '3', name: '有声书', icon: 'icon-shijian', color: '#45B7D1' },
          { id: '4', name: '儿童', icon: 'icon-xihuan', color: '#96CEB4' },
          { id: '10', name: '娱乐', icon: 'icon-huanyipi', color: '#85C1E9' },
        ],
      },
      {
        id: 'education',
        title: '教育',
        items: [
          { id: '5', name: '教育', icon: 'icon-message', color: '#FFEAA7' },
          { id: '6', name: '商业', icon: 'icon-more', color: '#DDA0DD' },
        ],
      },
      {
        id: 'lifestyle',
        title: '生活',
        items: [
          { id: '7', name: '健康', icon: 'icon-shoucang', color: '#98D8C8' },
          { id: '8', name: '科技', icon: 'icon-play2', color: '#F7DC6F' },
          { id: '9', name: '体育', icon: 'icon-fullscreen', color: '#BB8FCE' },
          { id: '11', name: '新闻', icon: 'icon-down', color: '#F8C471' },
          { id: '12', name: '生活', icon: 'icon-paste', color: '#82E0AA' },
        ],
      },
    ]));
  }

  // 将 ID 列表重建为完整的分组结构
  const rebuildGroupsWithMyIds = (myIds: string[]): CategoryGroup[] => {
    const baseGroups = JSON.parse(JSON.stringify(initialGroupsRef.current)) as CategoryGroup[];
    const allItemsMap = new Map<string, CategoryItem>();
    baseGroups.forEach(group => {
      group.items.forEach(item => {
        allItemsMap.set(item.id, item);
      });
    });

    // 先剔除其他分组中的 myIds
    const prunedOtherGroups = baseGroups.map(group => {
      if (group.id === 'my-categories') return group;
      return {
        ...group,
        items: group.items.filter(item => !myIds.includes(item.id)),
      };
    });

    // 构建 my-categories 项
    const myItems: CategoryItem[] = myIds
      .map(id => allItemsMap.get(id))
      .filter(Boolean) as CategoryItem[];

    // 替换 my-categories 组
    const finalGroups = prunedOtherGroups.map(group => {
      if (group.id === 'my-categories') {
        return { ...group, items: myItems };
      }
      return group;
    });

    return finalGroups;
  };

  const persistMyCategories = (groups: CategoryGroup[]) => {
    try {
      const myGroup = groups.find(g => g.id === 'my-categories');
      const myIds = (myGroup?.items ?? []).map(i => i.id);
      storage.set(MY_CATEGORIES_STORAGE_KEY, JSON.stringify(myIds));
    } catch {}
  };

  // 首次加载：恢复本地保存的“我的分类”顺序
  useEffect(() => {
    try {
      const raw = storage.getString(MY_CATEGORIES_STORAGE_KEY);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const next = rebuildGroupsWithMyIds(ids);
        setCategoryGroups(next);
      }
    } catch {}
  }, []);

  // 处理编辑模式切换
  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
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

  // 将item移动到我的分类
  const moveItemToMyCategories = (item: CategoryItem, fromGroupId: string) => {
    setCategoryGroups(prevGroups => {
      const newGroups = [...prevGroups];

      const fromGroupIndex = newGroups.findIndex(group => group.id === fromGroupId);
      if (fromGroupIndex !== -1) {
        newGroups[fromGroupIndex] = {
          ...newGroups[fromGroupIndex],
          items: newGroups[fromGroupIndex].items.filter(i => i.id !== item.id),
        };
      }

      const myCategoriesIndex = newGroups.findIndex(group => group.id === 'my-categories');
      if (myCategoriesIndex !== -1) {
        const itemWithOriginalCategory = {
          ...item,
          originalCategoryId: fromGroupId,
        } as CategoryItem;
        newGroups[myCategoriesIndex] = {
          ...newGroups[myCategoriesIndex],
          items: [...newGroups[myCategoriesIndex].items, itemWithOriginalCategory],
        };
      }

      // 持久化新的“我的分类”
      persistMyCategories(newGroups);
      return newGroups;
    });
  };

  // 从我的分类中删除item
  const handleRemoveFromMyCategories = (item: CategoryItem) => {
    if (!item.originalCategoryId) return;

    setCategoryGroups(prevGroups => {
      const newGroups = [...prevGroups];
      
      // 从我的分类中移除
      const myCategoriesIndex = newGroups.findIndex(group => group.id === 'my-categories');
      if (myCategoriesIndex !== -1) {
        newGroups[myCategoriesIndex] = {
          ...newGroups[myCategoriesIndex],
          items: newGroups[myCategoriesIndex].items.filter(i => i.id !== item.id),
        };
      }

      // 恢复到原分类
      const originalGroupIndex = newGroups.findIndex(group => group.id === item.originalCategoryId);
      if (originalGroupIndex !== -1) {
        const itemWithoutOriginalCategory = {
          ...item,
          originalCategoryId: undefined,
        };
        newGroups[originalGroupIndex] = {
          ...newGroups[originalGroupIndex],
          items: [...newGroups[originalGroupIndex].items, itemWithoutOriginalCategory],
        };
      }

      // 持久化新的“我的分类”
      persistMyCategories(newGroups);
      return newGroups;
    });
  };

  // 若未来支持拖拽排序，可在排序回调中调用此方法保存顺序
  const persistCurrentMyOrder = () => {
    persistMyCategories(categoryGroups);
  };

  // 渲染分类item
  const renderCategoryItem = (item: CategoryItem, groupId: string, index: number) => {
    const isMyCategories = groupId === 'my-categories';
    const isFixedItem = isMyCategories && index < 2;
    const canDelete = isMyCategories && !isFixedItem && isEditMode;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.categoryItem, { backgroundColor: item.color }]}
        onPress={() => handleItemPress(item, groupId)}
        activeOpacity={0.8}>
        <IconFont name={item.icon} size={32} color="#fff" />
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
        <TouchableOpacity style={styles.backButton} onPress={() => console.log('返回')}>
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
