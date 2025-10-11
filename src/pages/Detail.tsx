import {useRoute} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Detail = () => {
  let insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const {id, name} = route.params;
  return (
    <View style={{paddingTop: insets.top}}>
      <Text>this is detail page</Text>
      <Text>
        id={id}, name={name}
      </Text>

      <Button title={"Go Back"} onPress={() => {navigation.goBack();}} />
    </View>
  );
};

export default Detail;
