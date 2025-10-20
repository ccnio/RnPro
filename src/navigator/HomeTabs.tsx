import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Home from '@/pages/home';
import IconFont from '@/assets/iconfont';

const {width: screenWidth} = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  const navigation = useNavigation();

  const handleCategoryPress = () => {
    // 导航到分类页面
    navigation.navigate('Category' as never);
  };

  return (
    <View style={styles.container}>
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
          tabBarStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          },
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Home2" component={Home} />
      </Tab.Navigator>
      
      {/* 分类入口按钮 */}
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={handleCategoryPress}
        activeOpacity={0.7}>
        <IconFont name="icon-more" size={20} color="#f86442" />
        <Text style={styles.categoryText}>分类</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  categoryButton: {
    position: 'absolute',
    right: 16,
    top: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f86442',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    color: '#f86442',
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default HomeTabs;
