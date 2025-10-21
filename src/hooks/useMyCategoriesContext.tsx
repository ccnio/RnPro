// src/hooks/useMyCategoriesContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MMKV } from 'react-native-mmkv';

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  originalCategoryId?: string;
}

const MY_CATEGORIES_STORAGE_KEY = 'my_categories_ids_v1';
const storage = new MMKV();

// 所有可用的分类数据
const ALL_CATEGORIES: CategoryItem[] = [
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

interface MyCategoriesContextType {
  myCategories: CategoryItem[];
  isLoading: boolean;
  saveMyCategories: (categories: CategoryItem[]) => void;
  getAllCategories: () => CategoryItem[];
  getOtherCategories: () => CategoryItem[];
  reloadMyCategories: () => void;
}

const MyCategoriesContext = createContext<MyCategoriesContextType | undefined>(undefined);

interface MyCategoriesProviderProps {
  children: ReactNode;
}

export const MyCategoriesProvider: React.FC<MyCategoriesProviderProps> = ({ children }) => {
  const [myCategories, setMyCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 从存储中加载我的分类
  const loadMyCategories = useCallback(() => {
    try {
      const raw = storage.getString(MY_CATEGORIES_STORAGE_KEY);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const categories = ids
          .map(id => ALL_CATEGORIES.find(cat => cat.id === id))
          .filter(Boolean) as CategoryItem[];
        setMyCategories(categories);
        console.log('加载我的分类:', categories.map(c => c.name));
      } else {
        // 默认分类
        const defaultCategories = [
          ALL_CATEGORIES[0], // 音乐
          ALL_CATEGORIES[1], // 播客
        ];
        setMyCategories(defaultCategories);
        console.log('使用默认分类:', defaultCategories.map(c => c.name));
      }
    } catch (error) {
      console.error('加载我的分类失败:', error);
      const defaultCategories = [
        ALL_CATEGORIES[0], // 音乐
        ALL_CATEGORIES[1], // 播客
      ];
      setMyCategories(defaultCategories);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 保存我的分类
  const saveMyCategories = useCallback((categories: CategoryItem[]) => {
    try {
      const ids = categories.map(cat => cat.id);
      storage.set(MY_CATEGORIES_STORAGE_KEY, JSON.stringify(ids));
      setMyCategories(categories);
      console.log('保存我的分类:', categories.map(c => c.name));
    } catch (error) {
      console.error('保存我的分类失败:', error);
    }
  }, []);

  // 获取所有可用分类
  const getAllCategories = useCallback(() => ALL_CATEGORIES, []);

  // 获取其他分类（不在我的分类中的）
  const getOtherCategories = useCallback(() => {
    const myCategoryIds = myCategories.map(cat => cat.id);
    return ALL_CATEGORIES.filter(cat => !myCategoryIds.includes(cat.id));
  }, [myCategories]);

  useEffect(() => {
    loadMyCategories();
  }, [loadMyCategories]);

  const value: MyCategoriesContextType = {
    myCategories,
    isLoading,
    saveMyCategories,
    getAllCategories,
    getOtherCategories,
    reloadMyCategories: loadMyCategories,
  };

  return (
    <MyCategoriesContext.Provider value={value}>
      {children}
    </MyCategoriesContext.Provider>
  );
};

export const useMyCategories = (): MyCategoriesContextType => {
  const context = useContext(MyCategoriesContext);
  if (context === undefined) {
    throw new Error('useMyCategories must be used within a MyCategoriesProvider');
  }
  return context;
};
