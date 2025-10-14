/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from '@/navigation/TabNavigator';
import Home from '@/pages/Home.tsx';
import Navigator from '@/navigator/index';
import BottomsTab from '@/navigator/BottomsTab.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      {/*  <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <TabNavigator />
      </NavigationContainer>*/}

      <Navigator/>
      {/*<BottomsTab />*/}
    </SafeAreaProvider>
  );
}

export default App;
