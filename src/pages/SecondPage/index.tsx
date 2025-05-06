import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import NativeRouter from '../../../specs/NativeRouter.ts';
// 这里 NativeRouter 是一个别名， 是 TurboModuleRegistry.getEnforcing() 返回的 JS 代理对象

type RootStackParamList = {
  Home: undefined;
  SecondPage: undefined;
};

type SecondPageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SecondPage'
>;

type Props = {
  navigation: SecondPageScreenNavigationProp;
};

const SecondPage: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>这是第二个页面</Text>
      <Button title="返回首页" onPress={() => navigation.goBack()} />
      <Button title="router back" onPress={() => NativeRouter.goBack()} />
    </View>
  );
};

export default SecondPage;
