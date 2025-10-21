import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator';
import {useUserStore} from '@/stores/userStore';

const Found = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {user, isLoggedIn} = useUserStore();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.content}>
        {isLoggedIn ? (
          <Text style={styles.greeting}>
            hi，{user?.username}
          </Text>
        ) : (
          <Text style={styles.defaultText}>this is found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  defaultText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default Found;
