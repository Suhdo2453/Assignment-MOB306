import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import IconThreeDot from 'react-native-vector-icons/Entypo'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Dialog from './ModalAddItem'
import { url_api_categories, url_api_posts } from '../data/API'



const PostItem = (props) => {
    const [showDialog, setShowDialog] = useState(false)

    const deleteData = () => {
        fetch(url_api_posts + '/' + props.itemData.id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                if (res.status == 200) {
                    alert("Xóa thành công")
                    props.getData()
                }
            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    const showConfirmDialog = (id) => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove this?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        deleteData()
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };


    return (
        <View style={styles.container}>

            <Menu>
                <MenuTrigger style={{ alignSelf: 'flex-end' }}>
                    <IconThreeDot name='dots-three-vertical' size={18} />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption text='Update' onSelect={() => setShowDialog(true)} />
                    <MenuOption onSelect={() => showConfirmDialog()} >
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>


            <View style={styles.containerContent}>
                <Text style={styles.title}>{props.itemData.title}</Text>
                <Text style={styles.content}>{props.itemData.content}</Text>
            </View>


            <Image source={{ uri: props.itemData.image }} style={{ maxHeight: 400, minHeight: 200, maxWidth: Dimensions.get('window').width }} resizeMode={'center'} />


            <View style={styles.containerBtn}>

                <TouchableOpacity style={styles.btnBackground}>
                    <Icon name='like' size={24} color={'black'} />
                    <Text>Like</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnBackground}>
                    <Icon name='comment' size={24} color={'black'} />
                    <Text>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnBackground}>
                    <Icon name='share-google' size={24} color={'black'} />
                    <Text>Share</Text>
                </TouchableOpacity>

            </View>

            <Dialog isShow={showDialog}
                setShowDialog={(value) => setShowDialog(value)}
                getData={() => props.getData()}
                itemData={props.itemData}
            />
        </View>
    )
}

export default PostItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        marginVertical: 16,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingTop: 16
    },
    containerAuthor: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#c2c2c2',
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textAuthor: {
        fontSize: 16,
        fontWeight: '500'
    },
    containerContent: {
        marginTop: 8
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    content: {
        marginTop: 8,
        fontSize: 15
    },
    containerBtn: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#c2c2c2',
        marginTop: 16
    },
    btnBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 16
    }
})