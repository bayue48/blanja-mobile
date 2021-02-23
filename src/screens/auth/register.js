import React, { Component } from 'react';
import { Form, Item, Input, Label, Button, Toast } from 'native-base';
import { KeyboardAvoidingView } from 'react-native'
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ToastAndroid
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env'

class Register extends React.Component {
    state = {
        fullname: '',
        email: '',
        password: '',
        storeName: '',
        errorForm: '',
        registSeller: false
    }

    Register = () => {
        if (this.state.fullname === '' || this.state.email === '' || this.state.password === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi'
            })
        } else {
            let data = {
                email: this.state.email,
                password: this.state.password,
                fullname: this.state.fullname,
            }
            if (this.state.registSeller) {
                data = {
                    ...data,
                    level_id: 2,
                    storeName: this.state.storeName
                }
            } else {
                data = {
                    ...data,
                    level_id: 1,
                    storeName: ''
                }
            }
            console.log(data)
            axios.post(BASE_URL + '/auth/signup', data)
                .then(({ data }) => {
                    this.setState({
                        errorForm: ''
                    })
                    // console.log(data)
                    ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    this.props.navigation.navigate('Login')
                }).catch(({response}) => {
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                })
        }

    }


    render() {
        let { fullname, email, password, registSeller, storeName } = this.state
        let btnSwitch;
        let formSeller;
        if (registSeller) {
            btnSwitch = <>
                <View style={{ flexDirection: 'row' }}>
                    <Button bordered danger small style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, width: 100 }}
                        onPress={() => this.setState({
                            registSeller: !this.state.registSeller
                        })}
                    >
                        <Text style={{marginLeft:'25%', fontWeight:'bold', color:'black'}}>Customer</Text>
                    </Button>
                    <Button danger small style={{ borderTopEndRadius: 20, borderBottomEndRadius: 20, width: 100 }}
                    >
                        <Text style={{marginLeft:'25%',fontWeight:'bold', color:'white'}}>Seller</Text>
                    </Button>
                </View>
            </>
            formSeller = <>
                <KeyboardAvoidingView>
                    <Item floatingLabel>
                        <Label>Store Name</Label>
                        <Input name="firstname" value={storeName} onChangeText={(text) => { this.setState({ storeName: text }) }} />
                    </Item>
                </KeyboardAvoidingView>
            </>
        } else {
            btnSwitch = <>
                <View style={{ flexDirection: 'row' }}>
                    <Button danger small style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, width: 100 }}
                    >
                        <Text style={{  marginLeft:'25%',fontWeight:'bold', color:'white' }}>Customer</Text>
                    </Button>
                    <Button bordered danger small style={{ borderTopEndRadius: 20, borderBottomEndRadius: 20, width: 100 }}
                        onPress={() => this.setState({
                            registSeller: !this.state.registSeller
                        })}
                    >
                        <Text style={{marginLeft:'25%',fontWeight:'bold', color:'black'}}>Seller</Text>
                    </Button>
                </View>
            </>
        }
        return (
            <>
                <View style={{ margin: 20 }}>
                    <Text>
                        {'\n'}
                    </Text>
                    <Image style={{ alignSelf: 'center' }}
                        source={require('./../../assets/Vector.png')}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: 'red', alignSelf: "center" }}>BlanjaIn</Text>
                    <View style={{marginTop: 10, flexDirection:'row', justifyContent:'space-around' }}>
                        <View></View>
                        {btnSwitch}
                        <View></View>
                    </View>
                    <Form>
                        <KeyboardAvoidingView>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                            </Item>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <Item floatingLabel last>
                                <Label>Password</Label>
                                <Input name="password" secureTextEntry={true} value={password} onChangeText={(text) => { this.setState({ password: text }) }} />
                            </Item>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <Item floatingLabel>
                                <Label>Fullname</Label>
                                <Input name="firstname" value={fullname} onChangeText={(text) => { this.setState({ fullname: text }) }} />
                            </Item>
                        </KeyboardAvoidingView>
                        {formSeller}
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Login')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already have an account, Login here -{'>'}</Text>
                        </TouchableOpacity>

                        <Button full rounded danger
                            onPress={this.Register}>
                            <Text style={{ color: 'white' }}>Register</Text>
                        </Button>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Activate')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already register? Activate your account here -{'>'}</Text>
                        </TouchableOpacity>
                    </Form>
                    <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{this.state.errorForm}</Text>
                </View>
            </>
        )
    }
}
export default Register;