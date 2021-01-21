import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, Label } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
// import { Picker } from '@react-native-picker/picker';

import Nav from '../../components/BottomNav'
import CardBag from '../../components/CardOrderDetail'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default class ChangeAddress extends React.Component {
    render() {
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../assets/icons/back.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: 'black', fontWeight: 'bold', marginLeft: 20 }}>Order Details</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Order No :
                                        <Text style={{ color: 'gray', }}> BAP305114181</Text>
                            </Text>
                            <Text style={{ marginLeft: 60, color: 'green' }}>05-11-2020</Text>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 18 }}>
                            Tracking Number :
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}> JP4008547567</Text>
                        </Text>
                        <Text style={{ color: 'green', fontWeight: 'bold' }}>Delivered</Text>
                        <Text style={{ fontWeight: 'bold', marginBottom: 15, marginTop: 10 }}>3 Items</Text>
                        <CardBag />
                        <CardBag />
                        <CardBag />
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Order Information</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', width: 125,marginBottom:10 }}>Shipping Address  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>3 Newbridge Curt Chino Hills, CA 91709, United States</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 30,marginBottom:10 }}>
                            <Text style={{ width: 125, color: 'gray' }}>Payment Method </Text>
                            <Image source={require('./../../assets/images/card.png')} style={{ height: 30, width: 80 }} />
                            <Text style={{ width: 135 }}>**** **** **** 3947</Text>
                        </View>
                        <View style={{ flexDirection: 'row' ,marginBottom:10}}>
                            <Text style={{ color: 'gray', width: 125 }}>Delivery Method  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>Fedex, 3 Days, 15$</Text>
                        </View>
                        <View style={{ flexDirection: 'row',marginBottom:10 }}>
                            <Text style={{ color: 'gray', width: 125 }}>Discount  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>10% Discount Code, PALUGADA</Text>
                        </View>
                        <View style={{ flexDirection: 'row' ,marginBottom:10}}>
                            <Text style={{ color: 'gray', width: 125 }}>Total Amount  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>112$</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:15 }}>
                            <Button full rounded bordered dark style={styles.btn}
                            onPress={() => {this.props.navigation.navigate('Home')}}
                            >
                                <Text>Reorder</Text>
                            </Button>
                            <Button full rounded danger style={styles.btn}>
                                <Text>Leave Feedback</Text>
                            </Button>
                        </View>
                    </Content>
                   
                </Container>
            </>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 150
    }
})