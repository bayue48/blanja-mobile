import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base';
import { IconBack } from '../../assets'
import { connect } from 'react-redux'
import axios from 'axios';
import { API_URL } from '@env'
import { setEmail } from '../../utils/redux/ActionCreators/auth'


class Forgot extends React.Component {

    state = {
        email: '',
        errorForm: '',
    }

    ForgotPassword = () => {
        if (this.state.email !== '') {
            const emailData = {
                email: this.state.email
            }
            axios.post(API_URL + 'auth/forgot', emailData)
                .then(({ data }) => {
                    this.setState({
                        errorForm: ''
                    })

                    alert(data.message)

                    this.props.dispatch(setEmail(this.state.email))
                    this.props.navigation.navigate('Otp')
                }).catch(({ response }) => {
                    console.log(response.data)
                    alert(response.data.message)
                })
        } else {
            this.setState({
                errorForm: 'Kolom email harus diisi!'
            })
        }
    }
    render() {
        const { email } = this.state
        console.log(this.state)
        console.log('email :' + this.props.auth.email)
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Home');
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Forgot password</Text>
                </View>

                <View style={{ marginTop: 73 }}>
                    <View>
                        <Text>Please enter your email address. You will receive a link to create a new password via email</Text>
                    </View>
                    <Item floatingLabel>
                        <Label >Email</Label>
                        <Input placeholder='Regular Textbox' name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                    </Item>
                    <Button danger full rounded style={{ marginTop: 15 }} onPress={this.ForgotPassword}>
                        <Text style={{ color: '#fff' }}> SEND </Text>
                    </Button>
                    <Text style={{color:'red', textAlign:'center', fontWeight:'bold'}}>{this.state.errorForm}</Text>
                </View>
            </Container>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Forgot)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 25
    },
    rowTitle: {
        marginTop: 34
    },
    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
})