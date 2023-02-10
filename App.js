import * as React from 'react';
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Main from './screens/Main';

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
        console.log(value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }

  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {getData}
        {
          login && <Stack.Screen name='Login' component={Login} options={({ headerShown: false })} />
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
