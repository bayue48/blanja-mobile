import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    RefreshControl
} from 'react-native';

import PushNotification from 'react-native-push-notification';
import { showNotification } from '../../notif';
import { useSelector } from 'react-redux'

import Card from '../../components/cardHome'
import Banner from './../../components/banner'
import Loading from './../emptyScreen/loading'
import { BASE_URL } from '@env'
import { useSocket } from '../../utils/context/SocketProvider';

let number = 0;

const Home = ({ navigation }) => {

    const auth = useSelector((state) => state.auth)
    const [products, setProducts] = useState([])
    const [popular, setPopular] = useState([])
    const [loading, setLoading] = useState(true)
    const channel = 'notif'
    const socket = useSocket()
    let angka = 0

    //onPullRefresh

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        getHomeData()
    }


    const getHomeData = () => {
        axios.get(BASE_URL + '/products')
            .then(({ data }) => {
                setProducts(data.data.products)
            }).catch((error) => {
                console.log(error.response)
            })
        axios.get(BASE_URL + '/products?sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                setPopular(data.data.products)
                setLoading(false)
                setRefreshing(false)
            }).catch((error) => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        getHomeData()
    }, [])

    useEffect(() => {
        PushNotification.createChannel(
            {
                channelId: 'notif',
                channelName: 'My Notification channel',
                channelDescription: 'A channel to categories your notification',
                soundName: 'default',
                importance: 4,
                vibrate: true,
            },
            (created) => console.log(`create channel returned '${created}'`),
        );

        PushNotification.getChannels((channel_ids) => {
            console.log(channel_ids);
        });
    }, [])

    useEffect(() => {
        if (auth.level == 1) {
            socket.on('toBuyer', (message) => {
                const notifData = {
                    user_id: auth.id,
                    level: auth.level,
                    title: 'Horee~',
                    message: message
                }
                axios.post(BASE_URL + '/notif/add', notifData)
                    .then(({ data }) => {
                        showNotification('Notification', message, channel);
                    }).catch(({ response }) => {
                        console.log(response.data)
                    })

            })
            return () => socket.off('toBuyer')
        } else if (auth.level == 2) {
            socket.on('toSeller', (message) => {
                const notifData = {
                    user_id: auth.id,
                    level: auth.level,
                    title: 'Horee~',
                    message: message
                }
                axios.post(BASE_URL + '/notif/add', notifData)
                    .then(({ data }) => {
                        showNotification('Notification', message, channel);
                    }).catch(({ response }) => {
                        console.log(response.data)
                    })

            })
            return () => socket.off('toSeller')
        }
    }, [])

    let Home;
    if (loading) {
        Home = <Loading navigation={navigation} />
    } else {
        Home =
            <>
                <View style={{ flex: 1 }}>

                    <SafeAreaView>
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <Banner navigation={navigation} />
                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ height: 350, marginHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>New</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'gray', marginBottom: 15 }}>You've never seen it before!</Text>
                                            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                                                <Text>View All</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <SafeAreaView>
                                            <ScrollView
                                                horizontal={true}
                                            >
                                                {
                                                    products && products.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }, index) => {
                                                        let img = product_img.split(',')[0]
                                                        return (
                                                            <>
                                                                <Card new={true} key={index} navigation={navigation} product_name={product_name} product_price={product_price} product_img={img} keyId={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </SafeAreaView>
                                    </View>
                                    <View style={{ height: 350, marginHorizontal: 10, marginTop: 50, marginBottom: 50 }}>
                                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>Popular</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'gray', marginBottom: 15 }}>Find clothes that are trending recently</Text>
                                            <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
                                                <Text>View All</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <SafeAreaView>
                                            <ScrollView
                                                horizontal={true}
                                            >
                                                {
                                                    popular && popular.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }, index) => {
                                                        let img = product_img.split(',')[0]
                                                        return (
                                                            <>
                                                                <Card navigation={navigation} key={index} product_name={product_name} product_price={product_price} product_img={img} keyId={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </SafeAreaView>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>

                </View>
            </>
    }
    return (
        <>
            {Home}
        </>
    )

}

export default Home