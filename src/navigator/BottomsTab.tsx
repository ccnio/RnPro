import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Found from '@/pages/Found.tsx';
import Account from '@/pages/Account.tsx';
import IconFont from '@/assets/iconfont';
import HomeTabs from '@/navigator/HomeTabs.tsx';
import Case from '@/pages/Ui.tsx';

export type BottomTabParamList = {
  Home: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();
// 在组件外部定义图标组件
const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <IconFont name="icon-shouye" size={size} color={color} />
);
const ListenIcon = ({color, size}: {color: string; size: number}) => (
  <IconFont name="icon-shoucang" size={size} color={color} />
);
const FoundIcon = ({color, size}: {color: string; size: number}) => (
  <IconFont name="icon-faxian" size={size} color={color} />
);
const AccountIcon = ({color, size}: {color: string; size: number}) => (
  <IconFont name="icon-user" size={size} color={color} />
);
const BottomsTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f86442',
      }}>
      <Tab.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{tabBarLabel: '首页', tabBarIcon: HomeIcon}}
      />
      <Tab.Screen
        name="Case"
        component={Case}
        options={{tabBarLabel: 'Case', tabBarIcon: ListenIcon}}
      />
      <Tab.Screen
        name="Found"
        component={Found}
        options={{tabBarLabel: '发现', tabBarIcon: FoundIcon}}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{tabBarLabel: '我的', tabBarIcon: AccountIcon}}
      />
    </Tab.Navigator>
  );
};

export default BottomsTab;
