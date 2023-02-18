import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import PostItem from '../../components/PostItem';
import { url_api_posts, url_api_categories } from '../../data/API'

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('For you')
    const [data, setData] = useState([])
    const [m_Data, setM_Data] = useState([])
    const [categories, setCategories] = useState([])
    const setStatusFilter = status => {
        setStatus(status)
    }

    const getData = () => {
        fetch(url_api_posts + '?_expand=tb_users')
            .then(async (res) => {
                const posts = await res.json()
                posts.reverse()
                setData(posts)
                setM_Data(posts)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getCategory = () => {
        fetch(url_api_categories)
            .then(async (res) => {
                const categories = await res.json()
                setCategories(categories)
            })
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getCategory()
            getData()
            setIsLoading(true)
        })

        return unsubscribe
    }, [props.navigation])



    const getHeader = () => {
        return (
            <>
                <TouchableOpacity style={styles.createPost} onPress={() => props.navigation.navigate('AddPost')}>
                    <Text style={{ color: '#c2c2c2' }}>Tạo bài viết</Text>
                </TouchableOpacity>

                <View style={styles.listTab}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            categories.map(item => (
                                <TouchableOpacity style={[styles.btnTab, status === item.name && styles.btnTabActive]}
                                    onPress={() => {
                                        setStatusFilter(item.name)
                                        setM_Data(data.filter((m_item) => m_item.categoryId == item.id).map((item) => (item)))
                                    }}>
                                    <Text style={[styles.textTab, status === item.name && styles.textActive]}>{item.name}</Text>
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
                data={m_Data}
                renderItem={({ item, index }) =>
                    <PostItem key={index} title={item.title} content={item.content} image={item.image} author={item.tb_users.fullName} />
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={getHeader}
                refreshControl={
                    <RefreshControl refreshing={isLoading}
                        onRefresh={() => {
                            setIsLoading(true)
                            getData()
                        }} />
                } />
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