import {Button, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator';
import MyButton from '@/components/MyButton.tsx';

const Home = () => {
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
        text='account'
        disabled={false}
        onClick={timestamp => console.log({timestamp})}
      />
    </View>
  );
};

export default Home;
