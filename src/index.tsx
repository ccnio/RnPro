import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { test } from './pages/test/test/index'
test()
export default class App extends Component {
    render() {
        return (
            <View>
                <Text> app </Text>
            </View>
        )
    }
}
