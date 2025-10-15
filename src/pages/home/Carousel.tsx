import {ActivityIndicator, Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {viewportWidth} from '@/utils';
import React, {useState} from 'react';
import {useBanner} from '@/hooks/useBanner';
import {ErrorDisplay} from '@/components/ErrorDisplay';

const carouselWidth = viewportWidth;

interface BannerCarouselProps {
  type?: string; // 轮播图类型
}

export default function BannerCarousel({ type = 'home' }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {banners, loading, error, errorType, refetch} = useBanner({ type });

  // 加载状态
  if (loading) {
    return (
      <View style={{
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{marginTop: 10, color: '#666'}}>加载中...</Text>
      </View>
    );
  }

  // 错误状态
  if (error && errorType) {
    return (
      <View style={{height: 200, borderRadius: 10, overflow: 'hidden'}}>
        <ErrorDisplay
          errorType={errorType}
          message={error}
          onRetry={refetch}
          showRetry={true}
          style={{height: 200}}
        />
      </View>
    );
  }

  // 没有数据
  if (!banners || banners.length === 0) {
    return (
      <View style={{
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
      }}>
        <Text style={{color: '#666'}}>暂无轮播图</Text>
      </View>
    );
  }

  return (
    <View style={{position: 'relative'}}>
      <Carousel
        loop={false}
        width={carouselWidth}
        height={200}
        autoPlay={true}
        data={banners}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setCurrentIndex(index)}
        renderItem={({item}) => (
          <Image
            source={{uri: item.imageUrl}}
            style={{width: '98%', height: 200, borderRadius: 10}}
            resizeMode="cover"
          />
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
  );
}
