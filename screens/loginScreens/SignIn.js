import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { myStyles } from '../../MyStyle'
import ButtonCustom from '../../components/ButtonCustom'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url_api_user } from '../../data/API'


const SignIn = ({ navigation }) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const doLogin = () => {
        if (userName.length == 0) {
            alert('Chua nhap user name')
            return
        }
        if (password.length == 0) {
            alert('Chua nhap password')
            return
        }

        let url_check_login = url_api_user + '?userName=' + userName

        fetch(url_check_login)
            .then((res) => { return res.json() })
            .then(async (res_login) => {
                if (res_login.length != 1) {
                    alert('Sai username hoac loi trung lap du lieu')
                    return
                } else {
                    let objUser = res_login[0]
                    if (objUser.password != password) {
                        alert('Sai password')
                        return
                    } else {
                        try {
                            await AsyncStorage.setItem('loginInfo', JSON.stringify(objUser))
                            navigation.navigate('Main')
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <View and Customize Mouse Button Actions style={styles.container}>

            <Text style={styles.title}>Lets Sign you in</Text>
            <Text style={styles.subTile}>Welcome Back ,{'\n'}
                You have been missed</Text>

            <View style={styles.textInputWrapper}>
                <TextInput placeholder='Email ,phone & username' style={myStyles.textInput} onChangeText={(txt) => setUserName(txt)} />
                <TextInput placeholder='Password' style={myStyles.textInput} secureTextEntry onChangeText={(txt) => setPassword(txt)} />
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                    <Text style={styles.forgotBtn}>Forgot Password ?</Text>
                </TouchableOpacity>
            </View>

            <ButtonCustom title={'Sign in'} onPress={doLogin} />

            <View style={styles.wrapper}>
                <View style={{ height: 1, width: '40%', backgroundColor: '#8E8383' }} />
                <Text style={{ marginHorizontal: 6, fontSize: 18, fontWeight: '500' }}>or</Text>
                <View style={{ height: 1, width: '40%', backgroundColor: '#8E8383' }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                <TouchableOpacity>
                    <Icon name="facebook" color="#3b5998" size={35} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 30 }}>
                    <Icon name="google" color="#c2c2c2" size={35} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="apple" color="black" size={35} />
                </TouchableOpacity>
            </View>

            <View style={styles.wrapper}>
                <Text>Don’t have an account ? </Text>
                <TouchableOpacity>
                    <Text style={{ fontWeight: '900' }}>Register Now</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 16
    },
    title: {
        marginTop: 50,
        fontSize: 37,
        fontWeight: '500'
    },
    subTile: {
        fontSize: 28,
        marginTop: 16
    },
    textInputWrapper: {
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 30
    },
    forgotBtn: {
        marginEnd: 8,
        marginTop: 8,
        fontSize: 15,
        fontWeight: '500'
    },
    wrapper: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})