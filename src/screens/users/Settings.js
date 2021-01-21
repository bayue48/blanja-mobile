import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Label, Input, CheckBox, ListItem } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'

import Nav from '../../components/BottomNav'
import CardOrder from '../../components/CardOrders'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default class Orders extends React.Component {
    state={
        isChecked:true
    }
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
                            <Title style={{ color: 'black', marginLeft: 30, fontWeight: 'bold' }}>Setting</Title>
                        </Body>

                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <View style={{ marginLeft: 15, marginRight: 10, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 42, marginTop: 20, marginBottom: 10 }}>Setting</Text>
                            <Text style={{ fontWeight: 'bold' }}>Personal Information</Text>
                            <Item floatingLabel style={{ backgroundColor: 'white', marginTop: 20, paddingTop: 10, paddingBottom: 10 }}>
                                <Label style={{ marginLeft: 10 }}>Fullname</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel style={{ backgroundColor: 'white', marginTop: 20, paddingTop: 10, paddingBottom: 10 }}>
                                <Label style={{ marginLeft: 10 }}>Date of Birth</Label>
                                <Input value='12/12/1989' />
                            </Item>
                            <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold', }}>Personal Information</Text>
                                <Text style={{ fontWeight: 'bold', color: 'gray', marginLeft: 120 }}>Change</Text>
                            </View>
                            <Item floatingLabel style={{ backgroundColor: 'white', marginTop: 20, paddingTop: 10, paddingBottom: 10 }}>
                                <Label style={{ marginLeft: 10 }}>Password</Label>
                                <Input secureTextEntry={true} value='arkademy' />
                            </Item>
                            <Text style={{ fontWeight: 'bold', marginTop: 30, marginBottom: 5 }}>Notification</Text>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between' , marginRight:10}}>
                                <Text style={{ marginTop: 10 }}>Sales</Text>
                                <CheckBox style={{marginEnd:10}} checked={this.state.isChecked} color="blue" onPress={() => {this.setState({isChecked: !this.state.isChecked})}}/>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between' , marginRight:10}}>
                                <Text style={{ marginTop: 10 }}>New Arrivals</Text>
                                <CheckBox style={{marginEnd:10}} color="green" />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between' , marginRight:10}}>
                                <Text style={{ marginTop: 10 }}>Change Status Delivery</Text>
                                <CheckBox style={{marginEnd:10}} color="green" />
                            </View>
                        </View>
                    </Content>
                    
                </Container>
            </>
        )
    }
}

