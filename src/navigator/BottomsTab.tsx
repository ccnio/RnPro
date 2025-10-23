import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Found from '@/pages/Found.tsx';
import Account from '@/pages/Account.tsx';
import IconFont from '@/assets/iconfont';
import HomeTabs from '@/navigator/HomeTabs.tsx';
import Case from '@/pages/Ui.tsx';
import {useLanguage} from '@/hooks/useLanguage';
import {useMemo} from 'react';

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
  const {t, currentLocale} = useLanguage();
  
  // 使用 useMemo 确保当语言变化时重新计算选项
  const screenOptions = useMemo(() => ({
    headerShown: false,
    tabBarActiveTintColor: '#f86442',
  }), []);

  const homeOptions = useMemo(() => ({
    tabBarLabel: t('navigation.home'),
    tabBarIcon: HomeIcon
  }), [t, currentLocale]);

  const caseOptions = useMemo(() => ({
    tabBarLabel: t('navigation.case'),
    tabBarIcon: ListenIcon
  }), [t, currentLocale]);

  const foundOptions = useMemo(() => ({
    tabBarLabel: t('navigation.search'),
    tabBarIcon: FoundIcon
  }), [t, currentLocale]);

  const accountOptions = useMemo(() => ({
    tabBarLabel: t('navigation.profile'),
    tabBarIcon: AccountIcon
  }), [t, currentLocale]);
  
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={homeOptions}
      />
      <Tab.Screen
        name="Case"
        component={Case}
        options={caseOptions}
      />
      <Tab.Screen
        name="Found"
        component={Found}
        options={foundOptions}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={accountOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomsTab;
