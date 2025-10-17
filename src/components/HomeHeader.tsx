// src/components/HomeHeader.tsx
import React from 'react';
import { View } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import BannerCarousel from '@/pages/home/Carousel';
import { GuessYouLike } from '@/pages/home/GuessYouLike';

interface HomeHeaderProps {
  onGuessItemPress?: (item: any) => void;
  onMorePress?: () => void;
  onRefreshPress?: () => void;
  onBannerPress?: (item: any) => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onGuessItemPress,
  onMorePress,
  onRefreshPress,
  onBannerPress,
}) => {
  return (
    <View>
      {/* Banner 轮播图 */}
      <ErrorBoundary>
        <BannerCarousel type="promotion" />
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
