import React from 'react';
import {Form, Item, Input, Label, Button} from 'native-base';
import {KeyboardAvoidingView} from 'react-native';
import {Text, View, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env';

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    store: '',
    phone: '',
    errorForm: '',
    registSeller: false,
  };

  Register = () => {
    const mailer = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    const passer = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.password === ''
    ) {
      this.setState({
        errorForm: 'Please input all fileds',
      });
    } else if (!this.state.email.match(mailer)) {
      this.setState({
        errorForm: 'Invalid email format, ex: user@domain.com',
      });
    } else if (!this.state.password.match(passer)) {
      this.setState({
        errorForm:
          'Password must contain at least 1 number, and be longer than 8 character',
      });
    } else {
      this.setState({
        errorForm: 'Please wait...',
      });
      let data = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      };
      if (this.state.registSeller) {
        data = {
          ...data,
          level_id: 1,
          store: this.state.store,
          phone: this.state.phone,
        };
      } else {
        data = {
          ...data,
          level_id: 2,
        };
      }
      console.log(data);
      axios
        .post(BASE_URL + '/auth/signup', data)
        .then(({data}) => {
          this.setState({
            errorForm: '',
          });
          // console.log(data)
          ToastAndroid.show(
            data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.navigate('Login');
        })
        .catch(({response}) => {
          ToastAndroid.show(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    }
  };

  render() {
    let {name, email, password, registSeller, store, phone} = this.state;
    let btnSwitch;
    let formSeller;
    if (registSeller) {
      btnSwitch = (
        <>
          <View style={{flexDirection: 'row'}}>
            <Button
              bordered
              danger
              small
              style={{
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                width: 100,
              }}
              onPress={() =>
                this.setState({
                  registSeller: !this.state.registSeller,
                })
              }>
              <Text
                style={{marginLeft: '25%', fontWeight: 'bold', color: 'black'}}>
                Customer
              </Text>
            </Button>
            <Button
              danger
              small
              style={{
                borderTopEndRadius: 20,
                borderBottomEndRadius: 20,
                width: 100,
              }}>
              <Text
                style={{marginLeft: '25%', fontWeight: 'bold', color: 'white'}}>
                Seller
              </Text>
            </Button>
          </View>
        </>
      );
      formSeller = (
        <>
          <KeyboardAvoidingView>
            <Item floatingLabel>
              <Label>Store Name</Label>
              <Input
                name="store"
                value={store}
                onChangeText={(text) => {
                  this.setState({store: text});
                }}
              />
            </Item>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input
                name="phone"
                type="number"
                value={phone}
                onChangeText={(text) => {
                  this.setState({phone: text});
                }}
              />
            </Item>
          </KeyboardAvoidingView>
        </>
      );
    } else {
      btnSwitch = (
        <>
          <View style={{flexDirection: 'row'}}>
            <Button
              danger
              small
              style={{
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                width: 100,
              }}>
              <Text
                style={{marginLeft: '25%', fontWeight: 'bold', color: 'white'}}>
                Customer
              </Text>
            </Button>
            <Button
              bordered
              danger
              small
              style={{
                borderTopEndRadius: 20,
                borderBottomEndRadius: 20,
                width: 100,
              }}
              onPress={() =>
                this.setState({
                  registSeller: !this.state.registSeller,
                })
              }>
              <Text
                style={{marginLeft: '25%', fontWeight: 'bold', color: 'black'}}>
                Seller
              </Text>
            </Button>
          </View>
        </>
      );
    }
    return (
      <>
        <View style={{margin: 20}}>
          <Text>{'\n'}</Text>
          <Image
            style={{alignSelf: 'center'}}
            source={require('./../../assets/Vector.png')}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#DB3022',
              alignSelf: 'center',
            }}>
            Blanja
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View></View>
            {btnSwitch}
            <View></View>
          </View>
          <Form>
            <Text
              style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>
              {this.state.errorForm}
            </Text>
            <KeyboardAvoidingView>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input
                  name="firstname"
                  value={name}
                  onChangeText={(text) => {
                    this.setState({name: text});
                  }}
                />
              </Item>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={email}
                  onChangeText={(text) => {
                    this.setState({email: text});
                  }}
                />
              </Item>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  name="password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => {
                    this.setState({password: text});
                  }}
                />
              </Item>
            </KeyboardAvoidingView>
            {formSeller}
            <TouchableOpacity
              style={{
                flexDirection: 'row-reverse',
                marginTop: 10,
                marginBottom: 25,
              }}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={{fontWeight: 'bold', color: '#DB3022'}}>
                Already have an account, Login here -{'>'}
              </Text>
            </TouchableOpacity>

            <Button full rounded danger onPress={this.Register}>
              <Text style={{color: 'white'}}>REGISTER</Text>
            </Button>
            {/* <TouchableOpacity
              style={{
                flexDirection: 'row-reverse',
                marginTop: 10,
                marginBottom: 25,
              }}
              onPress={() => {
                this.props.navigation.navigate('Activate');
              }}>
              <Text style={{fontWeight: 'bold'}}>
                Already register? Activate your account here -{'>'}
              </Text>
            </TouchableOpacity> */}
          </Form>
        </View>
      </>
    );
  }
}
export default Register;
