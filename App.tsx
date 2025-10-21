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
import {MyCategoriesProvider} from '@/hooks/useMyCategoriesContext';
import {UserProvider} from '@/hooks/useUserContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryProvider>
      <UserProvider>
        <MyCategoriesProvider>
          <SafeAreaProvider>
            {/*  <NavigationContainer>
              <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
              <TabNavigator />
            </NavigationContainer>*/}

            <Navigator />
            {/*<BottomsTab />*/}
          </SafeAreaProvider>
        </MyCategoriesProvider>
      </UserProvider>
    </QueryProvider>
  );
}

export default App;
