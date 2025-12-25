import {ScrollView, View} from 'react-native';
import {CaseBtn, promiseFun} from '@/study/demo.tsx';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator';

const Home = () => {
  // const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <CaseBtn title="promise" onPress={promiseFun} />
        <CaseBtn title="widget" onPress={() => navigation.navigate('Widget')} />
      </View>
    </ScrollView>
  );
};

export default Home;
