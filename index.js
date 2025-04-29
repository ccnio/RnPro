/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import SecondPage from './src/pages/second';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent("SecondPage", () => SecondPage);