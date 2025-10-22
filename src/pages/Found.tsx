import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useUserStore} from '@/stores/userStore';

const Found = () => {
  const insets = useSafeAreaInsets();
  const {user, isLoggedIn} = useUserStore();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {isLoggedIn ? (
        <Text style={styles.greeting}>hi，{user?.username}</Text>
      ) : (
        <Text style={styles.defaultText}>this is found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2ff',
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
