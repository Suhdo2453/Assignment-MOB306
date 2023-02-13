import { Button, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url_api_posts } from '../../data/API'


const AddPost = () => {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    //const [userId, setUserId] = useState(null)

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState([
        { label: 'For you', value: 'for you' },
        { label: 'Creative', value: 'creative' },
        { label: 'UI/UX Design', value: 'UI/UX Design' }
    ]);

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
                    setImage("data:image/" + file_ext + ";base64," + res);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });


        }


    }

    const AddPost = async () => {
        var userId;
        try {
            const value = await AsyncStorage.getItem('loginInfo')
            if (value !== null) {
                // lấy được dữ liệu:
                userId = JSON.parse(value).id
                console.log(userId);
            }
        } catch (e) {
            // error reading value
            console.log(e);
        }

        fetch(url_api_posts, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                title: title,
                content: content,
                image: image,
                category: category
            }),
        })
            .then(async (res) => {
                if (res.status == 200)
                    alert("Thêm thành công")

            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    const AddImage = () => {
        return (
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.wrapper}>
                    <Icon name='file-image-plus-outline' size={60} color={'#c2c2c2'} />
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder='Title' style={styles.title} multiline={true} onChangeText={(txt) => setTitle(txt)} />
            <DropDownPicker
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                placeholder={'Select category'}
            />

            <TextInput placeholder='Content' style={styles.content} multiline={true} numberOfLines={5} onChangeText={(txt) => setContent(txt)} />
            {
                image ? (
                    <Image source={{ uri: image }} style={{ minHeight: 300, maxWidth: Dimensions.get('window').width, marginTop: 8 }} />
                ) : (
                    <AddImage />
                )
            }
            <View style={{ marginTop: 8 }}>
                <Button title='Post' onPress={AddPost} />
            </View>

        </View>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        fontSize: 24,
        marginBottom: 8
    },
    content: {
        fontSize: 16,
        marginTop: 8,
        textAlignVertical: 'top'
    },
    wrapper: {
        borderWidth: 2,
        borderColor: '#c2c2c2',
        borderRadius: 10,
        alignItems: 'center',
        height: 300,
        justifyContent: 'center',
        borderStyle: 'dashed',
        marginTop: 8
    }
})