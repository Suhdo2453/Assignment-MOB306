import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MusicItem from '../../components/MusicItem'

let data = [
    {
        name: 'music name',
        author: 'author',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsbCAQtQimp5yI0Zx4vyR_FzPLUVzkdjDBN0N4_LAUo59inNQrSp6-Iz7qrfAXBENLGI&usqp=CAU'
    },
    {
        name: 'music name',
        author: 'author',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsbCAQtQimp5yI0Zx4vyR_FzPLUVzkdjDBN0N4_LAUo59inNQrSp6-Iz7qrfAXBENLGI&usqp=CAU'
    },
    {
        name: 'music name',
        author: 'author',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsbCAQtQimp5yI0Zx4vyR_FzPLUVzkdjDBN0N4_LAUo59inNQrSp6-Iz7qrfAXBENLGI&usqp=CAU'
    },
    {
        name: 'music name',
        author: 'author',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsbCAQtQimp5yI0Zx4vyR_FzPLUVzkdjDBN0N4_LAUo59inNQrSp6-Iz7qrfAXBENLGI&usqp=CAU'
    },
]

const Music = () => {
    return (
        <View style={styles.container}>
            <FlatList data={data}
                renderItem={({ item, index }) =>
                    <MusicItem name={item.name} author={item.author} image={item.image} />
                }
                keyExtractor={(item, index) => index.toString()} />
        </View>
    )
}

export default Music

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1
    }
})