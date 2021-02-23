import React, { useState, useEffect } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { useSelector, connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "@env"
import { setLoginfalse } from './../../utils/redux/ActionCreators/auth'
import List from './../../components/chatList'

const ListChat = ({ navigation, setLoginfalse }) => {
    const auth = useSelector((state) => state.auth)
    const [chatList, setChatList] = useState([])
    const [loading, setLoading] = useState('Loading...')

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const ChatRoom = () => {
        if (auth.level == 2) {
            axios.get(BASE_URL + `/chat/chatRoomSeller`, config)
                .then(({ data }) => {
                    setChatList(data.data)
                    setLoading('')
                }).catch(({ response }) => {
                    console.log(response.status)
                    if (response.status == 401) {
                        ToastAndroid.show('SESI ANDA TELAH HABIS', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        if (setLoginfalse()) {
                            navigation.replace('Profile')
                        }
                    }
                })
        } else {
            axios.get(BASE_URL + `/chat/chatRoomBuyer`, config)
                .then(({ data }) => {
                    setChatList(data.data)
                    setLoading('')
                }).catch(({ response }) => {
                    console.log(response.status)
                    if (response.status == 401) {
                        ToastAndroid.show('SESI ANDA TELAH HABIS', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        if (setLoginfalse()) {
                            navigation.replace('Profile')
                        }
                    }
                })
        }
    }
    useEffect(() => {
        ChatRoom()
    }, [])
    return (
        <>
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { navigation.goBack() }}
                        >
                            <Image source={require('./../../assets/back.png')} />
                        </Button>
                    </Left>
                    <Body ><Text style={{ fontWeight: 'bold' }}></Text></Body>
                </Header>
                <Content>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('./../../assets/profile.png')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                        <View style={{ paddingLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{auth.name}</Text>
                            <Text style={{ color: 'gray' }}>{auth.email}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 24, marginLeft: 20, marginBottom: 10, fontWeight:'bold' }}>Chat List</Text>
                    <Text style={{marginLeft:20}}>{loading}</Text>
                    {
                        chatList.length > 0  ? (
                            <>
                                {
                                    chatList.map(({ chatRoom }, index) => {
                                        return <List key={index} chatRoom={chatRoom} navigation={navigation} />
                                    })
                                }
                            </>
                        ) : (
                            <>
                            <Text style={{marginLeft:20, fontSize:24, fontWeight:'bold'}}>There is no chat list.</Text>
                            </>
                        )
                    }
                </Content>
            </Container>
        </>
    )


}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginfalse: () =>
            dispatch(setLoginfalse()),
    };
};
export default connect(null, mapDispatchToProps)(ListChat);


