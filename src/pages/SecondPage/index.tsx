import React from 'react'
import { View, Text, Button } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
    Home: undefined;
    SecondPage: undefined;
}

type SecondPageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SecondPage'>;

type Props = {
    navigation: SecondPageScreenNavigationProp;
}

const SecondPage: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>这是第二个页面</Text>
            <Button 
                title="返回首页"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default SecondPage 