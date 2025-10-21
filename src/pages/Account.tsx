import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator';
import IconFont from '@/assets/iconfont';
import {useUser} from '@/hooks/useUserContext';

const Account = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {user, isLoggedIn, logout} = useUser();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    Alert.alert('确认退出', '确定要退出登录吗？', [
      {
        text: '取消',
        style: 'cancel',
      },
      {
        text: '确定',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  // 未登录界面
  const renderNotLoggedIn = () => (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 默认头像 */}
        <View style={styles.defaultAvatar}>
          <IconFont name="icon-user" size={60} color="#ccc" />
        </View>

        {/* 描述文本 */}
        <Text style={styles.description}>
          登录后可以享受更多个性化服务
        </Text>

        {/* 登录按钮 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>立即登录</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 已登录界面
  const renderLoggedIn = () => (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 用户头像 */}
        <View style={styles.userAvatar}>
          {user?.avatar ? (
            <Image source={{uri: user.avatar}} style={styles.avatarImage} />
          ) : (
            <IconFont name="icon-user" size={60} color="#f86442" />
          )}
        </View>

        {/* 用户名 */}
        <Text style={styles.username}>{user?.username}</Text>

        {/* 退出登录按钮 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>退出登录</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.wrapper, {paddingTop: insets.top}]}>
      {isLoggedIn ? renderLoggedIn() : renderNotLoggedIn()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  // 未登录样式
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#f86442',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // 已登录样式
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f86442',
  },
  logoutButtonText: {
    color: '#f86442',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Account;
