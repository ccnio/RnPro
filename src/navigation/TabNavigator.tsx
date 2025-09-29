import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '@/screens/HomeScreen';
import SearchScreen from '@/screens/SearchScreen';
import MessageScreen from '@/screens/MessageScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: insets.bottom,
          paddingTop: 5,
          height: Platform.OS === 'android' ? 60 + Math.max(insets.bottom, 0) : 60 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '首页',
          tabBarLabel: '首页',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '搜索',
          tabBarLabel: '搜索',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🔍</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: '消息',
          tabBarLabel: '消息',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '我的',
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
