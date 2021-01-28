import React, { Component } from 'react';
import { Container, Header, Body, Left, Right, Content, Button, Text, View } from 'native-base'
import { Image } from 'react-native'
import CardOrder from '../../components/CardOrders'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"


export default class componentName extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        orderData: [],
    }

    componentDidMount = () => {
        axios.get(REACT_APP_BASE_URL + '/transactions/OrderData')
            .then(({ data }) => {
                this.setState({
                    orderData: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }
    render() {
        const { orderData } = this.state
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('../../assets/icons/back.png')} />
                            </Button>
                        </Left>
                        <Body />
                    </Header>
                    <Content>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, marginRight: 10, marginTop: 20, marginBottom: 10 }}>Customer Orders</Text>
                        </View>
                        {
                            orderData && orderData.map(({ TrxId, trackingNumber, qty, total, created_at, status, status_id }) => {
                                return (
                                    <>
                                        <CardOrder trxId={TrxId} trackingNumber={trackingNumber} qty={qty} total={total} created_at={created_at} idStatus={status_id} status={status} navigation={this.props.navigation} />
                                    </>
                                )
                            })
                        }
                    </Content>
                </Container>
            </>
        );
    }
}