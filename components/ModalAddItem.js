import { Button, Dimensions, Image, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { url_api_categories, url_api_posts } from '../data/API'



const ModalAddItem = (props) => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState([]);

    const [image, setImage] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)

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

    const getData = () => {
        fetch(url_api_categories)
            .then((res) => { return res.json() })
            .then((res_json) => {
                let arrForDropDown = res_json.map((item, index, src) => {
                    return { label: item.name, value: item.id }
                })
                setItems(arrForDropDown)
            })
    }

    const updateData = () => {
        if (!title || !content || !image) {
            alert('Phải nhập đầy đủ các trường!')
        } else {

            fetch(url_api_posts + '/' + props.itemData.id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tb_usersId: props.itemData.tb_usersId,
                    title: title,
                    content: content,
                    image: image,
                    categoryId: category
                }),
            })
                .then(async (res) => {
                    if (res.status == 200) {
                        alert("Update thành công")
                        props.setShowDialog(false)
                        props.getData()
                    }
                })
                .catch((ex) => {
                    console.log(ex);
                });
        }
    }

    useEffect(() => {
        getData()
        if (props.itemData) {
            setTitle(props.itemData.title)
            setContent(props.itemData.content)
            setImage(props.itemData.image)
            setCategory(props.itemData.categoryId)
        }
    }, [])


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
        <Modal visible={props.isShow}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
                props.setShowDialog(false)
            }}>
            <View style={styles.container}>
                <TextInput
                    placeholder='Title'
                    style={styles.title}
                    multiline={true}
                    onChangeText={(txt) => setTitle(txt)}
                    defaultValue={title} />
                <DropDownPicker
                    open={open}
                    value={category}
                    items={items}
                    setOpen={setOpen}
                    setValue={setCategory}
                    setItems={setItems}
                    placeholder={'Select category'}
                />

                <TextInput
                    placeholder='Content'
                    style={styles.content}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(txt) => setContent(txt)}
                    defaultValue={content} />
                {
                    image ? (
                        <Image source={{ uri: image }} style={{ minHeight: 300, maxWidth: Dimensions.get('window').width, marginTop: 8 }} />
                    ) : (
                        <AddImage />
                    )
                }
                <View style={{ marginTop: 8 }}>
                    <Button title='Post' onPress={() => updateData()} />
                </View>

            </View>
        </Modal>
    )
}

export default ModalAddItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
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