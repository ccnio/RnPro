// src/pages/home/index.tsx - 更新后的使用示例
import {View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BannerCarousel from '@/pages/home/Carousel.tsx';
import {ErrorBoundary} from '@/components/ErrorBoundary';
import {GuessYouLike} from '@/pages/home/GuessYouLike.tsx';

const Home = () => {
  console.log('home render');
  const insets = useSafeAreaInsets();
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const onPress = () => {
  //   navigation.navigate('Detail', {id: '123', name: 'example'});
  // };

  const handleGuessItemPress = (item: any) => {
    console.log('猜你喜欢 item 点击:', item);
    // 这里可以处理点击逻辑，比如跳转到详情页
  };

  const handleMorePress = () => {
    console.log('查看更多猜你喜欢');
    // 这里可以处理查看更多逻辑
  };

  const handleRefreshPress = () => {
    console.log('换一批猜你喜欢');
    // 这里可以处理换一批逻辑
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: insets.top}}>
        {/* Banner 轮播图 */}
        <ErrorBoundary>
          <BannerCarousel type="promotion" />
        </ErrorBoundary>

        {/* 猜你喜欢 */}
        <ErrorBoundary>
          <GuessYouLike
            onItemPress={handleGuessItemPress}
            onMorePress={handleMorePress}
            onRefreshPress={handleRefreshPress}
            type="home"
            timestamp={0}
          />
        </ErrorBoundary>
      </View>
    </ScrollView>
  );
};

export default Home;
