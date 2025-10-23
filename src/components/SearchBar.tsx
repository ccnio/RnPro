// src/components/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import IconFont from '@/assets/iconfont';
import {useLanguage} from '@/hooks/useLanguage';

const { width: screenWidth } = Dimensions.get('window');

interface SearchHistoryItem {
  id: string;
  text: string;
  timestamp: number;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onHistoryItemPress?: (item: SearchHistoryItem) => void;
  placeholder?: string;
  maxHistoryItems?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onHistoryItemPress,
  placeholder,
  maxHistoryItems = 5,
}) => {
  const {t} = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const inputRef = useRef<TextInput>(null);

  // 使用传入的placeholder或默认翻译
  const finalPlaceholder = placeholder || t('searchBar.placeholder');

  // 模拟搜索历史数据（实际项目中应该从本地存储或API获取）
  useEffect(() => {
    const mockHistory: SearchHistoryItem[] = [
      { id: '1', text: t('searchBar.defaultHistory.music'), timestamp: Date.now() - 86400000 },
      { id: '2', text: t('searchBar.defaultHistory.podcast'), timestamp: Date.now() - 172800000 },
      { id: '3', text: t('searchBar.defaultHistory.audiobook'), timestamp: Date.now() - 259200000 },
      { id: '4', text: t('searchBar.defaultHistory.children'), timestamp: Date.now() - 345600000 },
      { id: '5', text: t('searchBar.defaultHistory.education'), timestamp: Date.now() - 432000000 },
    ];
    setSearchHistory(mockHistory);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // 添加到搜索历史
      const newHistoryItem: SearchHistoryItem = {
        id: Date.now().toString(),
        text: searchQuery.trim(),
        timestamp: Date.now(),
      };

      // 避免重复，移除已存在的相同搜索词
      const filteredHistory = searchHistory.filter(
        item => item.text !== newHistoryItem.text
      );

      // 添加新项目到开头，限制数量
      const updatedHistory = [newHistoryItem, ...filteredHistory].slice(
        0,
        maxHistoryItems
      );

      setSearchHistory(updatedHistory);
      onSearch?.(searchQuery.trim());
      
      // 清空输入框
      setSearchQuery('');
      Keyboard.dismiss();
    }
  };

  const handleHistoryItemPress = (item: SearchHistoryItem) => {
    setSearchQuery(item.text);
    onHistoryItemPress?.(item);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderHistoryItem = (item: SearchHistoryItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.historyItem}
      onPress={() => handleHistoryItemPress(item)}
      activeOpacity={0.7}>
      <IconFont name="icon-time" size={14} color="#999" />
      <Text style={styles.historyText} numberOfLines={1}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 搜索框 */}
      <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
        <IconFont name="icon-message" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder={finalPlaceholder}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          activeOpacity={0.7}>
          <IconFont name="icon-play2" size={16} color="#f86442" />
        </TouchableOpacity>
      </View>

      {/* 搜索历史 */}
      {isFocused && searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>{t('searchBar.searchHistory')}</Text>
            <TouchableOpacity
              onPress={handleClearHistory}
              activeOpacity={0.7}>
              <Text style={styles.clearButton}>{t('searchBar.clearHistory')}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.historyScrollView}
            contentContainerStyle={styles.historyScrollContent}>
            {searchHistory.map(renderHistoryItem)}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchContainerFocused: {
    backgroundColor: '#fff',
    borderColor: '#f86442',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  searchButton: {
    marginLeft: 8,
    padding: 4,
  },
  historyContainer: {
    marginTop: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  clearButton: {
    fontSize: 12,
    color: '#f86442',
  },
  historyScrollView: {
    maxHeight: 40,
  },
  historyScrollContent: {
    paddingRight: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    minWidth: 80,
  },
  historyText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
});

export default SearchBar;
