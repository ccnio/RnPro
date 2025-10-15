/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from '@/navigator/index';
import {QueryProvider} from '@/providers/QueryProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryProvider>
      <SafeAreaProvider>
        {/*  <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <TabNavigator />
        </NavigationContainer>*/}

        <Navigator />
        {/*<BottomsTab />*/}
      </SafeAreaProvider>
    </QueryProvider>
  );
}

export default App;
