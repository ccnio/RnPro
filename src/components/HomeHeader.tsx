// src/components/HomeHeader.tsx
import React from 'react';
import { View } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { SearchBar } from './SearchBar';
import BannerCarousel from '@/pages/home/Carousel';
import { GuessYouLike } from '@/pages/home/GuessYouLike';

interface HomeHeaderProps {
  onGuessItemPress?: (item: any) => void;
  onMorePress?: () => void;
  onRefreshPress?: () => void;
  onBannerPress?: (item: any) => void;
  onSearch?: (query: string) => void;
  onHistoryItemPress?: (item: any) => void;
  onBannerSlideChange?: (index: number) => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onGuessItemPress,
  onMorePress,
  onRefreshPress,
  onBannerPress,
  onSearch,
  onHistoryItemPress,
  onBannerSlideChange,
}) => {
  return (
    <View>
      {/* 搜索框 */}
      <ErrorBoundary>
        <SearchBar
          onSearch={onSearch}
          onHistoryItemPress={onHistoryItemPress}
          placeholder="搜索音乐、播客、有声书..."
        />
      </ErrorBoundary>

      {/* Banner 轮播图 */}
      <ErrorBoundary>
        <BannerCarousel type="promotion" onSlideChange={onBannerSlideChange} />
      </ErrorBoundary>

      {/* 猜你喜欢 */}
      <ErrorBoundary>
        <GuessYouLike
          onItemPress={onGuessItemPress}
          onMorePress={onMorePress}
          onRefreshPress={onRefreshPress}
          type="home"
          timestamp={0}
        />
      </ErrorBoundary>
    </View>
  );
};
