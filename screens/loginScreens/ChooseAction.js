import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import SourceImage from './templateImage.png'

const ChooseAction = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={SourceImage} style={styles.image} />
            <View style={styles.wrapper}>

                <Text style={styles.title}>Team work all</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id potenti nisl tellus vestibulum dictum luctus cum habitasse augue. Convallis vitae, dictum justo, iaculis id. Cras a ac augue netus egestas semper varius facilisis id. </Text>

                <View style={styles.buttonWrapper}>

                    <TouchableOpacity style={styles.buttonBackgroundLeft} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.buttonTile}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonBackgroundRight} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.buttonTile}>Register</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}

export default ChooseAction

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    image: {
        marginTop: 200
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        marginTop: 16
    },
    content: {
        fontSize: 15,
        textAlign: 'center'
    },
    wrapper: {
        marginHorizontal: 24,
        alignItems: 'center'
    },
    buttonWrapper: {
        flexDirection: 'row',
        marginTop: 70
    },
    buttonBackgroundLeft: {
        backgroundColor: 'black',
        width: 178,
        height: 64,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        justifyContent: 'center'
    },
    buttonBackgroundRight: {
        backgroundColor: '#6E77F6',
        width: 178,
        height: 64,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center'
    },
    buttonTile: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: '500',
        textTransform: 'uppercase'
    }
})