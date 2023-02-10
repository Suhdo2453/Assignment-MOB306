import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './mainScreens/Home';
import Infor from './mainScreens/Infor';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Music from './mainScreens/Music';

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
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

export default Main

const styles = StyleSheet.create({})