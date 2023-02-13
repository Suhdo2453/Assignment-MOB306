import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Home from './mainScreens/Home';
import Infor from './mainScreens/Infor';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Music from './mainScreens/Music'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPost from './mainScreens/AddPost';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator()

const TabScreen = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
                let iconName
                let rn = route.name

                if (rn === 'Home') {
                    iconName = focused ? 'ios-home' : 'ios-home-outline'
                } else if (rn === 'Info') {
                    iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline'
                } else if (rn === 'Music') {
                    iconName = focused ? 'ios-musical-notes' : 'ios-musical-notes-outline'
                }
                return <Icon name={iconName} size={24} color={color} />
            },

        })}
            shifting={true}
            initialRouteName={'Home'}
            barStyle={{ backgroundColor: 'white', height: 70 }}>

            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name='Music' component={Music} />
            <Tab.Screen name="Info" component={Infor} />
        </Tab.Navigator>
    )
}

const Main = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='TabScreen'
                component={TabScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='AddPost'
                component={AddPost} />
        </Stack.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})