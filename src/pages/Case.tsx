import {ScrollView} from 'react-native';
import {CaseBtn, promiseFun} from '@/study/demo';

const Home = () => {
  // const insets = useSafeAreaInsets();

  return (
    <ScrollView>
      <CaseBtn title="promise" onPress={promiseFun} />
    </ScrollView>
  );
};

export default Home;
