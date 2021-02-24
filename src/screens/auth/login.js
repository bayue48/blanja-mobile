import React from 'react';
import {Form, Item, Input, Label, Button} from 'native-base';
import {setLogintrue} from './../../utils/redux/ActionCreators/auth';
import {ToastAndroid, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env';

const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorForm: '',
  };

  Login = () => {
    console.log('login' + BASE_URL);
    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        errorForm: 'Please Input all fields!',
      });
    } else {
      this.setState({
        errorForm: 'Please wait..',
      });
      if (regexEmail.test(this.state.email)) {
        const data = {
          email: this.state.email,
          password: this.state.password,
        };

        axios
          .post(BASE_URL + '/auth/login', data)
          .then(({data}) => {
            console.log('loginsukses' + BASE_URL);
            this.setState({
              errorForm: '',
              email: '',
              password: '',
            });
            const dataLogin = {
              name: data.result.name,
              email: data.result.email,
              level: data.result.level,
              id: data.result.user_id,
              token: data.result.token,
            };
            ToastAndroid.show(
              'Login Success',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.props.dispatch(setLogintrue(dataLogin));
            this.props.navigation.replace('Tab');
          })
          .catch(({response}) => {
            console.log('loginfail' + BASE_URL);
            console.log(response.data);
            ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
            this.setState({
              password: '',
            });
          });
      } else {
        Alert.alert('Error', 'Wrong Email', [{text: 'OK', style: 'cancel'}]);
      }
    }
  };

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.props.auth.isLogin) {
        this.props.navigation.navigate('Home');
      }
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    // console.log(this.state)
    const {email, password} = this.state;
    const {auth} = this.props;
    // console.log(BASE_URL)
    return (
      <>
        <View style={{margin: 20}}>
          <Text>{'\n'}</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace('Tab');
            }}>
            <Image
              style={{alignSelf: 'center'}}
              source={require('./../../assets/Vector.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#DB3022',
              alignSelf: 'center',
            }}>
            Blanja
          </Text>
          <Form>
            <Text
              style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>
              {this.state.errorForm}
            </Text>
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
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                name="password"
                value={password}
                onChangeText={(text) => {
                  this.setState({password: text});
                }}
                secureTextEntry={true}
              />
            </Item>
            <TouchableOpacity
              style={{
                flexDirection: 'row-reverse',
                marginTop: 10,
                marginBottom: 25,
              }}
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
              }}>
              <Text style={{fontWeight: 'bold', color: '#DB3022'}}>
                Forgot your password? -{'>'}
              </Text>
            </TouchableOpacity>
            <Button full rounded danger onPress={this.Login}>
              <Text style={{color: 'white'}}>LOGIN</Text>
            </Button>
          </Form>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}>
            <Text style={{fontWeight: 'bold'}}>
              Dont have an account? Register Here
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Login);
