import * as React from 'react';
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Main from './screens/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()

export default function App() {
  const [login, setLogin] = useState(false)

  const getData = async () => {

    let strKey = 'loginInfo';

    try {
      const value = await AsyncStorage.getItem(strKey)
      console.log(value);
      if (value !== null) {
        // lấy được dữ liệu:
        setLogin(true)

      }
      console.log(login);
    } catch (e) {
      // error reading value
      console.log(e);
    }

  }
  React.useEffect(() => {
    getData()
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !login && <Stack.Screen name='Login' component={Login} options={({ headerShown: false })} />
        }
        <Stack.Screen name='Main' component={Main} options={({ headerShown: false })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
