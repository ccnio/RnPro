import {NavigationContainer} from '@react-navigation/native';
import Detail from '@/pages/Detail.tsx';
import Category from '@/pages/Category.tsx';
import {createStackNavigator} from '@react-navigation/stack';
import BottomsTab from '@/navigator/BottomsTab.tsx';

// 定义导航参数类型
export type RootStackParamList = {
  Detail: {id: string; name: string};
  Category: undefined;
};

const StackNavigator = createStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{headerShown: false}}>
        <StackNavigator.Screen name="BottomsTab" component={BottomsTab} />
        <StackNavigator.Screen name="Detail" component={Detail} />
        <StackNavigator.Screen name="Category" component={Category} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
