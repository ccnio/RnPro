import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Home = () => {
  // const insets = useSafeAreaInsets();

  return (
    <View style={{backgroundColor: '#7699bb'}}>
      <Text style={{backgroundColor: 'blue', color: 'white', width: 40}}>blue</Text>
      <Text style={{backgroundColor: 'green', color: 'white'}}>green</Text>
      <Text style={{backgroundColor: 'purple', color: 'white'}}>purple</Text>
    </View>
  );
};

export default Home;
