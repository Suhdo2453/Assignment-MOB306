import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseAction from './loginScreens/ChooseAction';
import SignIn from './loginScreens/SignIn'
import Register from './loginScreens/Register'

const Stack = createNativeStackNavigator()

const Login = () => {
    return (
        <Stack.Navigator initialRouteName='ChooseAction' screenOptions={({ headerShown: false })}>
            <Stack.Screen name='ChooseAction' component={ChooseAction} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

export default Login

const styles = StyleSheet.create({})