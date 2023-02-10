import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import PostItem from '../../components/PostItem';


const listTab = [
    {
        status: 'For you'
    },
    {
        status: 'Creative'
    },
    {
        status: 'UI/UX Design'
    },
    {
        status: 'All3'
    },
    {
        status: 'All4'
    },
    {
        status: 'All5'
    },
    {
        status: 'All6'
    }
]

const data = [
    {
        title: '5 tips to create a modern app UI Design',
        content: 'Recently I was given the task to "Modernize" Incurrent companies app UI on Android. The terms modern, young, cool, etc., atv all quite vague. What makes a design or old?',
        author: 'Jishnu Hari',
        image: 'https://i0.wp.com/viciados.net/wp-content/uploads/2023/01/The-Last-of-Us-HBO-Serie-2023.webp'
    },
    {
        title: '5 tips to create a modern app UI Design',
        content: 'Recently I was given the task to "Modernize" Incurrent companies app UI on Android. The terms modern, young, cool, etc., atv all quite vague. What makes a design or old?',
        author: 'Jishnu Hari',
        image: 'https://i0.wp.com/viciados.net/wp-content/uploads/2023/01/The-Last-of-Us-HBO-Serie-2023.webp'
    },
    {
        title: '5 tips to create a modern app UI Design',
        content: 'Recently I was given the task to "Modernize" Incurrent companies app UI on Android. The terms modern, young, cool, etc., atv all quite vague. What makes a design or old?',
        author: 'Jishnu Hari',
        image: 'https://i0.wp.com/viciados.net/wp-content/uploads/2023/01/The-Last-of-Us-HBO-Serie-2023.webp'
    },
    {
        title: '5 tips to create a modern app UI Design',
        content: 'Recently I was given the task to "Modernize" Incurrent companies app UI on Android. The terms modern, young, cool, etc., atv all quite vague. What makes a design or old?',
        author: 'Jishnu Hari',
        image: 'https://i0.wp.com/viciados.net/wp-content/uploads/2023/01/The-Last-of-Us-HBO-Serie-2023.webp'
    },
]

const Home = () => {
    const [status, setStatus] = useState('For you')
    const setStatusFilter = status => {
        setStatus(status)
    }

    const getHeader = () => {
        return (
            <>
                <TouchableOpacity style={styles.createPost}>
                    <Text style={{ color: '#c2c2c2' }}>Tạo bài viết</Text>
                </TouchableOpacity>

                <View style={styles.listTab}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            listTab.map(item => (
                                <TouchableOpacity style={[styles.btnTab, status === item.status && styles.btnTabActive]}
                                    onPress={() => setStatusFilter(item.status)}>
                                    <Text style={[styles.textTab, status === item.status && styles.textActive]}>{item.status}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </>

        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.toolbar}>
                <Image source={require('../../assets/logo.png')} style={{ width: '20%', height: '71%' }} resizeMode={'center'} />
                <TouchableOpacity>
                    <Icon name='notifications-outline' size={30} color={'black'} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                renderItem={({ item, index }) =>
                    <PostItem key={index} title={item.title} content={item.content} image={item.image} author={item.author} />
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={getHeader} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f5f5',
        flex: 1,
    },
    toolbar: {
        marginTop: 50,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    btnTab: {
        justifyContent: 'center',
        marginHorizontal: 16,
        paddingBottom: 8
    },
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        marginTop: 16,
        paddingStart: 24
    },
    btnTabActive: {
        borderBottomWidth: 2.5,
        borderColor: '#1c1d1f',
    },
    textTab: {
        fontSize: 18,
        color: '#6d6b6b'
    },
    textActive: {
        color: '#36435d',
        fontWeight: '600'
    },
    createPost: {
        borderRadius: 20,
        borderColor: '#c2c2c2',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 32
    }
})