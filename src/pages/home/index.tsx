// src/pages/home/index.tsx - 更新后的使用示例
import {Button, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator';
import MyButton from '@/components/MyButton.tsx';
import BannerCarousel from '@/pages/home/Carousel.tsx';
import {ErrorBoundary} from '@/components/ErrorBoundary';

const Home = () => {
  console.log('home render');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate('Detail', {id: '123', name: 'example'});
  };

  return (
    <View style={{paddingTop: insets.top}}>
      <Text>this is home</Text>
      <Button title="go detail" onPress={onPress} />

      <MyButton
        text="自定义jsx组件"
        disabled={false}
        onClick={timestamp => console.log({timestamp})}
      />

      <ErrorBoundary>
        <BannerCarousel type="promotion" />
      </ErrorBoundary>
    </View>
  );
};

export default Home;
