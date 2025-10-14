import {Image, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {viewportWidth} from '@/utils';
import React, {useState} from 'react';

const data = [
  {id: 1, url: 'https://picsum.photos/800/400?1'},
  {id: 2, url: 'https://picsum.photos/800/400?2'},
  {id: 3, url: 'https://picsum.photos/800/400?3'},
];

const carouselWidth = viewportWidth;
export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{ position: 'relative'}}>
      <Carousel
        loop={false}
        width={carouselWidth}
        height={200}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setCurrentIndex(index)}
        renderItem={({item}) => (
          <Image
            source={{uri: item.url}}
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
        {data.map((_, index) => (
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
