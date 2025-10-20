import {ActivityIndicator, Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {viewportWidth} from '@/utils';
import React, {useState} from 'react';
import {useBanner} from '@/hooks/useBanner';
import {DataLoadingWrapper} from '@/components/DataLoadingWrapper';

const carouselWidth = viewportWidth;

interface BannerCarouselProps {
  type?: string; // 轮播图类型
  onSlideChange?: (index: number) => void; // 滑动回调
}

export default function BannerCarousel({ type = 'home', onSlideChange }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {banners, loading, error, errorType, refetch} = useBanner({ type });

  // 调试信息
  console.log('BannerCarousel - banners数量:', banners?.length);
  console.log('BannerCarousel - banners数据:', banners);

  return (
    <DataLoadingWrapper
      loading={loading}
      error={error}
      errorType={errorType}
      onRetry={refetch}
      emptyMessage="暂无轮播图"
      loadingMessage="加载中..."
      loadingHeight={200}
    >
      {banners && banners.length > 0 && (
        <View style={{position: 'relative'}}>
          <Carousel
            loop={true}
            width={carouselWidth}
            height={200}
            autoPlayInterval={3000}
            autoPlayReverse={false}
            data={banners}
            scrollAnimationDuration={500}
            defaultIndex={0}
            pagingEnabled={true}
            snapEnabled={true}
            onSnapToItem={index => {
              setCurrentIndex(index);
              onSlideChange?.(index);
            }}
            renderItem={({item}) => (
              <View style={{width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{width: '92%', height: 200, borderRadius: 10}}
                  resizeMode="cover"
                  fadeDuration={0}
                />
              </View>
            )}
          />

          {/* 指示器 - 绝对定位在banner底部 */}
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={{
                  width: currentIndex === index ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: currentIndex === index ? '#007AFF' : '#C7C7CC',
                }}
              />
            ))}
          </View>
        </View>
      )}
    </DataLoadingWrapper>
  );
}
