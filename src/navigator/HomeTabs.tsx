import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';

const Tab = createMaterialTopTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: '#f86442',
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: 'auto'},
        tabBarIndicatorStyle: {
          backgroundColor: '#f86442',
          height: 2,
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Home1Home1" component={Home} />
      <Tab.Screen name="Home2" component={Home} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
