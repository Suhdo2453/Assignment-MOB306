import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { cloneElement } from 'react'

const ButtonCustom = (props) => {
    const { title, onPress } = props
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonBackground}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonCustom

const styles = StyleSheet.create({
    buttonBackground: {
        backgroundColor: 'black',
        width: '95%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    title: {
        color: 'white',
        fontSize: 18
    }
})