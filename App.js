import * as React from 'react';
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Main from './screens/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuProvider } from 'react-native-popup-menu'


const Stack = createNativeStackNavigator()

export default function App() {
  const [login, setLogin] = useState(false)

  const getData = async () => {

    let strKey = 'loginInfo';

    try {
      const value = await AsyncStorage.getItem(strKey)
      if (value !== null) {
        // lấy được dữ liệu:
        setLogin(true)

      }
    } catch (e) {
      // error reading value
      console.log(e);
    }

  }

  React.useEffect(() => {
    getData()
  })

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !login && <Stack.Screen name='Login' component={Login} options={({ headerShown: false })} />
          }
          <Stack.Screen name='Main' component={Main} options={({ headerShown: false })} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
