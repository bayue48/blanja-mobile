import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Footer, FooterTab, Icon, Left, Body, Text, View } from "native-base";
import { Image } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HeaderTransparent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container >
                <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                    <View style={{ marginTop: '50%', alignItems: 'center' }}>
                        <Image source={require('../../assets/images/bags.png')} />
                        <Text style={{ fontWeight: '700', fontSize: 40, marginBottom: 10 }}>Success!</Text>
                        <Text>Your order will be delivered soon</Text>
                        <Text>Thanks for using our App!</Text>
                    </View>
                    <Button full rounded danger style={{ marginTop: 160 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Home') }}
                        >
                            <Text>Continue Shopping</Text>
                        </TouchableOpacity>
                    </Button>
                </Content>

            </Container>
        );
    }
}