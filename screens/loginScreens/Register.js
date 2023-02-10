import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { myStyles } from '../../MyStyle'
import ButtonCustom from '../../components/ButtonCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { url_api_user } from '../../data/API'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
    const [avatar, setAvatar] = useState(null)
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')

    let user = {
        userName: userName,
        password: password,
        fullName: fullName,
        avatar: avatar

    }

    const pickImage = async () => {

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });


        console.log(result);


        if (!result.canceled) {
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


            FileSystem.readAsStringAsync(_uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setAvatar("data:image/" + file_ext + ";base64," + res);
                    console.log(avatar);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });


        }


    }

    const addUser = () => {
        fetch(url_api_user, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(async (res) => {
                if (res.status == 201)
                    try {
                        await AsyncStorage.setItem('loginInfo', JSON.stringify(user))
                        navigation.navigate('Main')
                        alert("Thêm thành công")
                    } catch (error) {
                        console.log(error);
                    }

            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    return (

        <View style={styles.container}>
            <KeyboardAvoidingView behavior='position'>

                <Text style={styles.title}>Lets Register{'\n'}
                    Account</Text>
                <Text style={styles.subTile}>Hello user , you have{'\n'}
                    a greatful journey</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.textInputWrapper}>
                        <View >
                            <TouchableOpacity onPress={pickImage}>
                                {
                                    avatar ? (
                                        <Image source={{ uri: avatar }} style={styles.avatar} />
                                    ) : (
                                        <Image source={require('../../assets/user.png')} style={styles.avatar} />
                                    )
                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={pickImage}>
                                <Icon name='pen' size={16} style={styles.editBtn} />
                            </TouchableOpacity>

                        </View>

                        <TextInput placeholder='User Name' style={myStyles.textInput} onChangeText={(txt) => setUserName(txt)} />
                        <TextInput placeholder='Full Name' style={myStyles.textInput} onChangeText={(txt) => setFullName(txt)} />
                        <TextInput placeholder='Password' style={myStyles.textInput} secureTextEntry onChangeText={(txt) => setPassword(txt)} />
                        <TextInput placeholder='Repassword' style={myStyles.textInput} secureTextEntry />
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                            <Text style={styles.forgotBtn}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <ButtonCustom title={'Sign in'} onPress={addUser} />

            <View style={styles.wrapper}>
                <Text>Already  have an account ? </Text>
                <TouchableOpacity>
                    <Text style={{ fontWeight: '900' }}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default Register

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
        marginTop: 20,
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
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        marginTop: -18,
        textAlign: 'center',
        right: 0,
        borderRadius: 50,
        padding: 6,
        color: 'white'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#c2c2c2'
    }
})