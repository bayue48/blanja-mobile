import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Right } from "native-base";
import { Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { setLoginfalse, removeEmail, removeId, removeName, removeToken } from './../../utils/redux/ActionCreators/auth'
import { API_URL } from "@env"

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    Logout = () => {
        this.props.dispatch(setLoginfalse())
        this.props.dispatch(removeEmail())
        this.props.dispatch(removeName())
        this.props.dispatch(removeId())
        this.props.dispatch(removeToken())
        this.props.navigation.navigate('Login')
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (!this.props.auth.isLogin) {
                this.props.navigation.navigate('Login')
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        const { auth } = this.props
        let storePage;
        if (auth.level == 1) {
            storePage = <>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Store') }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Store</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your store products here</Text>
                    </View>
                </TouchableOpacity>
            </>
        } else {
            storePage = <>
                <>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Store') }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Store</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your store products here</Text>
                    </View>
                </TouchableOpacity>
            </>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Orders') }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Orders</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Already 12 orders</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Shipping') }}>
                    <View style={{ paddingLeft: 10, marginTop: 5 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Shipping Adress</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>3 Shipping Adress</Text>
                    </View>
                </TouchableOpacity>
            </>
        }
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
                        <Body />
                        <Right>
                            <Button transparent>
                                <Image source={require('./../../assets/icons/Search.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 10, marginRight: 10 }}>My Profile</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={require('./../../assets/images/Network-Profile.png')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Bayu</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{this.props.auth.name}</Text>
                                <Text style={{ color: 'gray' }}>{this.props.auth.email}</Text>
                            </View>
                        </View>

                        {storePage}

                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Setting') }}
                        >

                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Settings</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Notification, Password</Text>
                            </View>
                        </TouchableOpacity>
                    </Content>
                    <Button full rounded danger style={{ marginHorizontal: 10, marginBottom: 15 }}
                        onPress={this.Logout}
                    >
                        <Text>Logout</Text>
                    </Button>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Profile);