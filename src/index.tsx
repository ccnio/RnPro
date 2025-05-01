import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SecondPage from './pages/SecondPage'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
    Home: undefined;
    SecondPage: undefined;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
}

const Stack = createStackNavigator<RootStackParamList>()

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>首页</Text>
            <Button 
                title="跳转到第二页"
                onPress={() => navigation.navigate('SecondPage')}
            />
        </View>
    )
}

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="SecondPage" component={SecondPage} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
