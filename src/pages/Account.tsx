import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator';
import IconFont from '@/assets/iconfont';
import {useUserStore} from '@/stores/userStore';
import {useUserStats} from '@/hooks/useUserStats';
import {useAdvertisement} from '@/hooks/useAdvertisement';
import {useLanguage} from '@/hooks/useLanguage';
import {useLanguageDetection} from '@/hooks/useLanguageDetection';
import {openNativeSettings} from '@/utils/NativeNavigation';

const Account = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {user, isLoggedIn, isLoading, logout} = useUserStore();
  const {
    userStats,
    shouldShowStats,
    loading: statsLoading,
    error: statsError,
  } = useUserStats();
  const {
    advertisement,
    shouldShowAd,
    loading: adLoading,
    error: adError,
  } = useAdvertisement();
  const {
    t,
    currentLocale,
    changeLanguage,
    followSystemLanguage,
    isFollowingSystem,
  } = useLanguage();

  // 检测从原生界面返回时的语言变化
  useLanguageDetection();

  // 调试信息
  console.log('Account页面状态:', {
    isLoggedIn,
    isLoading,
    user: user?.username,
    userStats,
    shouldShowStats,
    statsLoading,
    statsError,
    advertisement,
    shouldShowAd,
    adLoading,
    adError,
  });

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    Alert.alert(t('account.logoutConfirm'), t('account.logoutMessage'), [
      {
        text: t('account.cancel'),
        style: 'cancel',
      },
      {
        text: t('account.confirm'),
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const handleLanguageChange = () => {
    const nextLocale = currentLocale === 'zh' ? 'en' : 'zh';
    changeLanguage(nextLocale);
  };

  const handleFollowSystemLanguage = () => {
    followSystemLanguage();
    // 可以添加一个提示，告诉用户需要重启应用
    Alert.alert(
      t('common.confirm'),
      '语言设置已重置为跟随系统，重启应用后生效',
      [{text: t('common.confirm')}],
    );
  };

  const handleOpenNativeSettings = () => {
    openNativeSettings();
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
        <Text style={styles.description}>{t('account.loginPrompt')}</Text>

        {/* 登录按钮 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{t('account.loginButton')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 统计数据展示组件
  const renderStatsSection = () => {
    if (!shouldShowStats || !userStats) return null;

    return (
      <View style={styles.statsContainer}>
        {/* 喜欢数 */}
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.favorNum}</Text>
          <Text style={styles.statLabel}>{t('account.favorCount')}</Text>
        </View>

        {/* 分割线 */}
        <View style={styles.statDivider} />

        {/* 帖子数 */}
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.postNum}</Text>
          <Text style={styles.statLabel}>{t('account.postCount')}</Text>
        </View>
      </View>
    );
  };

  // 广告条组件
  const renderAdvertisement = () => {
    if (!shouldShowAd || !advertisement) return null;

    return (
      <TouchableOpacity
        style={styles.adContainer}
        onPress={() => {
          // 这里可以添加点击广告的处理逻辑
          console.log('点击广告:', advertisement.adUrl);
        }}
        activeOpacity={0.8}>
        <View style={styles.adContent}>
          <Text style={styles.adText}>{t('account.adTitle')}</Text>
          <Text style={styles.adSubText}>{t('account.adSubtitle')}</Text>
        </View>
        <View style={styles.adArrow}>
          <Text style={styles.adArrowText}>→</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 已登录界面
  const renderLoggedIn = () => (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 用户头像 */}
        <View style={styles.userAvatar}>
          <Image
            source={require('@/assets/images/avatar_default.png')}
            style={styles.avatarImage}
          />
        </View>

        {/* 用户名 */}
        <Text style={styles.username}>{user?.username}</Text>

        {/* 统计数据区域 */}
        {renderStatsSection()}

        {/* 广告条 */}
        {renderAdvertisement()}

        {/* 语言切换按钮 */}
        <TouchableOpacity
          style={styles.languageButton}
          onPress={handleLanguageChange}>
          <Text style={styles.languageButtonText}>
            {t('common.switchLanguage')}:{' '}
            {currentLocale === 'zh' ? 'English' : '中文'}
          </Text>
        </TouchableOpacity>

        {/* 跟随系统语言按钮 */}
        {!isFollowingSystem && (
          <TouchableOpacity
            style={styles.systemLanguageButton}
            onPress={handleFollowSystemLanguage}>
            <Text style={styles.systemLanguageButtonText}>跟随系统语言</Text>
          </TouchableOpacity>
        )}

        {/* 打开原生设置按钮 */}
        <TouchableOpacity
          style={styles.nativeSettingsButton}
          onPress={handleOpenNativeSettings}>
          <Text style={styles.nativeSettingsButtonText}>打开应用设置</Text>
        </TouchableOpacity>

        {/* 退出登录按钮 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>{t('account.logout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 加载状态
  const renderLoading = () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.loadingText}>{t('account.loading')}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.wrapper, {paddingTop: insets.top}]}>
      {isLoading
        ? renderLoading()
        : isLoggedIn
        ? renderLoggedIn()
        : renderNotLoggedIn()}
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
    marginBottom: 24,
  },
  // 统计数据样式
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 32,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f86442',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  // 广告条样式
  adContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#f86442',
  },
  adContent: {
    flex: 1,
  },
  adText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  adSubText: {
    fontSize: 12,
    color: '#666',
  },
  adArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f86442',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adArrowText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // 语言切换按钮样式
  languageButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  languageButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  // 跟随系统语言按钮样式
  systemLanguageButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  systemLanguageButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  // 系统设置按钮样式
  settingsButton: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4a90e2',
    marginBottom: 16,
  },
  settingsButtonText: {
    color: '#4a90e2',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  // 原生设置按钮样式
  nativeSettingsButton: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2e8b57',
    marginBottom: 16,
  },
  nativeSettingsButtonText: {
    color: '#2e8b57',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
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
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Account;
