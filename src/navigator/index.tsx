import {NavigationContainer} from '@react-navigation/native';
import Home from '@/pages/Home.tsx';
import Detail from '@/pages/Detail.tsx';
import {createStackNavigator} from '@react-navigation/stack';

// 定义导航参数类型
export type RootStackParamList = {
  Home: undefined;
  Detail: {id: string; name: string};
};

const StackNavigator = createStackNavigator<RootStackParamList>();
const Navigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{headerShown: false}}>
        <StackNavigator.Screen name="Home" component={Home} />
        <StackNavigator.Screen name="Detail" component={Detail} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
