import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, Label } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import { setLoginfalse } from './../../utils/redux/ActionCreators/auth'
import { setAddress } from './../../utils/redux/ActionCreators/adress'
import { vw, vh } from 'react-native-expo-viewport-units'
import { connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '@env'

class ChangeAddress extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        address_type: '',
        recipient_name: '',
        address: '',
        city: '',
        postal: '',
        phone: '',
        errorForm: ''
    }

    componentDidMount = () => {
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
            },
        };
        // console.log(BASE_URL+`/address/get/${this.props.route.params.addressId}`)
        axios.get(BASE_URL + `/address/get/${this.props.route.params.addressId}`, config)
            .then(({ data }) => {
                this.setState({
                    address_type: data.data.address_type,
                    recipient_name: data.data.recipient_name,
                    address: data.data.address,
                    city: data.data.city,
                    postal: data.data.postal,
                    phone: data.data.phone,
                })
            }).catch(({ response }) => {
                if (response.status == 401) {
                    ToastAndroid.show('SESI ANDA TELAH HABIS', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    if (this.props.dispatch(setLoginfalse())) {
                        this.props.navigation.replace('Profile')
                    }
                }
            })
    }


    setActive = () =>{
        if(this.props.dispatch(setAddress(this.props.route.params.addressId))){
            ToastAndroid.show('Alamat telah diset.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            this.props.navigation.replace('Shipping')
        }

    }

    render() {
        const { address_type, recipient_name, address, city, postal, phone } = this.state
        // console.log(this.state)
        return (
            <Container style={{ backgroundColor: '#f0f0f0' }}>
                <View style={{ backgroundColor: 'white' }}>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: 'black', fontWeight: 'bold' }}>Details Address</Title>
                        </Body>
                    </Header>
                </View>
                <Content style={{ backgroundColor: '#f0f0f0', margin: vw(3) }}>
                    <View style={{ height: 130, width: vw(94), backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, color: 'green' }}>Save address as (ex: home address, office address)</Label>
                            <Input value={address_type} onChangeText={(text) => { this.setState({ address_type: text }) }} disabled />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>Recipent Name</Label>
                            <Input name="email" value={recipient_name} onChangeText={(text) => { this.setState({ recipient_name: text }) }} disabled />
                        </Item>
                    </View>
                    <View style={{ height: 195, width: vw(94), backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14 }}>Address</Label>
                            <Input name="email" value={address} onChangeText={(text) => { this.setState({ address: text }) }} disabled />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>City or Subdistrict</Label>
                            <Input name="email" value={city} onChangeText={(text) => { this.setState({ city: text }) }} disabled />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>Postal Code</Label>
                            <Input name="email" value={postal} onChangeText={(text) => { this.setState({ postal: text }) }} disabled />
                        </Item>
                    </View>
                    <View style={{ height: 75, width: vw(94), backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, color: 'gray' }}>Recipient Telephone Number</Label>
                            <Input name="email" value={phone} onChangeText={(text) => { this.setState({ phone: text }) }} disabled />
                        </Item>
                    </View>
                </Content>
                <View style={{ margin: vw(3) }}>
                    <Button full rounded danger
                        onPress={this.setActive}
                    >
                        <Text style={{ color: 'white' }}>
                            Set as Active Address
                            </Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(ChangeAddress);