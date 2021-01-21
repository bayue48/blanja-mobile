import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, Label } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import { API_URL } from "@env"

export default class ChangeAddress extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        address_name: '',
        name: '',
        street: '',
        city: '',
        zip: '',
        phone: '',
        errorForm: ''
    }
    updateAddress = () => {
        if (this.state.address_name !== '') {
            const addressData = {
                address_name: this.state.address_name,
                name: this.state.name,
                street: this.state.street,
                city: this.state.city,
                zip: this.state.zip,
                phone: this.state.phone,
            }
            axios.patch(API_URL + `address/${this.props.route.params.addressId}`, addressData)
                .then(({ data }) => {
                    alert(data.message)
                    this.props.navigation.navigate('Shipping')
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        } else {
            this.setState({
                errorForm: 'Data tidak boleh kosong'
            })
        }
    }

    componentDidMount = () => {
        // console.log(BASE_URL+`/address/get/${this.props.route.params.addressId}`)
        axios.get(API_URL+`address/get/${this.props.route.params.addressId}`)
        .then(({data}) =>{
            this.setState({
                address_name: this.state.address_name,
                name: this.state.name,
                street: this.state.street,
                city: this.state.city,
                zip: this.state.zip,
                phone: this.state.phone,
            })
        }).catch(({response}) =>{
            console.log(response.data)
        })
    }

    render() {
        const { address_name, name, street, city, zip, phone } = this.state
        console.log(this.state)
        return (
            <Container >
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', fontWeight: 'bold' }}>Add Shipping Address</Title>
                    </Body>
                </Header>
                <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                    <View style={{ height: 130, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, color: 'green' }}>Save address as (ex: home address, office address)</Label>
                            <Input value={address_name} onChangeText={(text) => { this.setState({ address_name: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>Recipent Name</Label>
                            <Input name="email" value={name} onChangeText={(text) => { this.setState({ name: text }) }} />
                        </Item>
                    </View>
                    <View style={{ height: 195, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14 }}>Address</Label>
                            <Input name="email" value={street} onChangeText={(text) => { this.setState({ street: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>City or Subdistrict</Label>
                            <Input name="email" value={city} onChangeText={(text) => { this.setState({ city: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>Postal Code</Label>
                            <Input name="email" value={zip} onChangeText={(text) => { this.setState({ zip: text }) }} />
                        </Item>
                    </View>
                    <View style={{ height: 75, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, color: 'gray' }}>Recipient Telephone Number</Label>
                            <Input name="email" value={phone} onChangeText={(text) => { this.setState({ phone: text }) }} />
                        </Item>
                    </View>
                    <Button full rounded danger
                        onPress={this.updateAddress}
                    >
                        <Text style={{ color: 'white' }}>
                            Save Address
                            </Text>
                    </Button>
                    <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{this.state.errorForm}</Text>
                </Content>
            </Container>
        );
    }
}