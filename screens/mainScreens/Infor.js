import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PostUser from '../../components/PostUser'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconLogout from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { url_api_posts, url_api_user } from '../../data/API'
import { useNavigation } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import * as Updates from "expo-updates"


const Infor = (props) => {
    const navigation = useNavigation();

    const [avatar, setAvatar] = useState(null)
    const [userName, setUserName] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [password, setPassword] = useState(null)
    const [idUser, setIdUser] = useState(null)

    const [data, setData] = useState([])

    let strKey = 'loginInfo'

    const getData = async () => {

        try {
            const value = await AsyncStorage.getItem(strKey)
            if (value !== null) {
                // lấy được dữ liệu:
                let obj = JSON.parse(value)
                setAvatar(obj.avatar)
                setFullName(obj.fullName)
                setIdUser(obj.id)
                setUserName(obj.userName)
                setPassword(obj.password)

                fetch(url_api_posts + '?tb_usersId=' + obj.id)
                    .then(async (res) => {
                        const posts = await res.json()
                        setData(posts)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        } catch (e) {
            // error reading value
            console.log(e);
        }

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
                    setAvatar('data:image/' + file_ext + ';base64,' + res)
                    console.log(avatar);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                    updateUser()
                });


        }


    }

    const updateUser = () => {
        let objUser = {
            userName: userName,
            password: password,
            fullName: fullName,
            avatar: avatar,
            id: idUser
        }

        fetch(url_api_user + '/' + idUser, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objUser),
        })
            .then(async (res) => {
                if (res.status == 200) {
                    try {
                        console.log(objUser);
                        await AsyncStorage.setItem(strKey, JSON.stringify(objUser))
                        console.log('update anh thanh cong')
                    } catch (error) {
                        console.log(error);
                    }
                }

            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    const logout = async () => {
        await AsyncStorage.clear();
        Updates.reloadAsync()

    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            if (!avatar) {
                getData()
            }
        })

        return unsubscribe
    }, [props.navigation])

    const getHeader = () => {
        return (
            <>
                <View style={styles.wrapperUser}>

                    <View >
                        <TouchableOpacity onPress={pickImage}>
                            {
                                avatar ? (
                                    <Image source={{ uri: avatar }} style={styles.imageUser} />
                                ) : (
                                    <Image source={require('../../assets/user.png')} style={styles.imageUser} />
                                )
                            }
                        </TouchableOpacity>

                        <TouchableOpacity onPress={pickImage}>
                            <Icon name='pen' size={16} style={styles.editBtn} />
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.userName}>{fullName}</Text>

                    <View style={{ flexDirection: 'row', marginTop: 24 }}>
                        <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>{data.length}</Text>
                            <Text>Post</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>12</Text>
                            <Text>Follower</Text>
                        </View>
                        <TouchableOpacity
                            style={{ alignItems: 'center', marginHorizontal: 16 }}
                            onPress={logout}>
                            <IconLogout name='logout' size={26} />
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#c2c2c2', marginTop: 16, marginHorizontal: 16 }}>
                    <Text style={{ fontSize: 24, fontWeight: '500' }}>My Post</Text>
                </View>
            </>

        )
    }

    return (
        <View style={styles.container}>


            <FlatList
                data={data}
                renderItem={({ item, index }) =>
                    <PostUser key={index} title={item.title} content={item.content} image={item.image} />
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={getHeader} />
        </View>
    )
}

export default Infor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    imageUser: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#c2c2c2'
    },
    wrapperUser: {
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
    userName: {
        fontSize: 24,
        fontWeight: '500',
        marginTop: 8
    }
})