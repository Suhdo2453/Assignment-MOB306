import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';
import IconFollow from 'react-native-vector-icons/Feather'

const PostItem = (props) => {
    const { title, content, image, author } = props
    const [fullName, setFullName] = useState(null)


    return (
        <View style={styles.container}>
            <View style={styles.containerAuthor}>
                <Text style={styles.textAuthor}>{author}</Text>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <IconFollow name='user-plus' size={18} color={'black'} />
                    <Text> Follow</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.containerContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>


            <Image source={{ uri: image }} style={{ maxHeight: 400, minHeight: 200, maxWidth: Dimensions.get('window').width }} resizeMode={'center'} />


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