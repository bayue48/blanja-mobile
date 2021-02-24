import React from 'react';
import {Form, Item, Input, Label, Button} from 'native-base';
import {ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {removeEmail} from './../../utils/redux/ActionCreators/auth';
import {Text, View, Image} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env';

class ResetPassword extends React.Component {
  state = {
    newPassword: '',
    confPassword: '',
    errorForm: '',
  };

  resetPassword = () => {
    const passer = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
    if (this.state.newPassword === '' || this.state.confPassword === '') {
      this.setState({
        errorForm: 'Please input all fields!',
      });
    } else if (!this.state.password.match(passer)) {
      this.setState({
        errorForm:
          'Password must contain at least 1 number, and be longer than 8 character',
      });
    } else {
      if (this.state.newPassword !== this.state.confPassword) {
        this.setState({
          errorForm: 'Password not same',
        });
      } else {
        this.setState({
          errorForm: 'Please wait..',
        });
        const resetData = {
          email: this.props.auth.email,
          newPassword: this.state.newPassword,
        };
        axios
          .patch(BASE_URL + '/auth/reset', resetData)
          .then(({data}) => {
            console.log(data);
            ToastAndroid.show(
              data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.props.dispatch(removeEmail());
            this.props.navigation.navigate('Login');
          })
          .catch(({response}) => {
            ToastAndroid.show(
              'Failed!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
      }
    }
  };

  render() {
    // console.log(this.state.newPassword, this.state.confPassword)
    // console.log(this.props.auth.email)
    const {newPassword, confPassword} = this.state;
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
          <Text
            style={{
              marginTop: 30,
              fontWeight: 'bold',
              color: 'red',
              textAlign: 'center',
            }}>
            You need to change your password to activate your account
          </Text>
          <Form>
            <Text
              style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>
              {this.state.errorForm}
            </Text>
            <Item floatingLabel style={{marginBottom: 25}}>
              <Label>New Password</Label>
              <Input
                name="newPassword"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => {
                  this.setState({newPassword: text});
                }}
              />
            </Item>
            <Item floatingLabel last style={{marginBottom: 25}}>
              <Label>Confirmation New Password</Label>
              <Input
                name="confPassword"
                secureTextEntry={true}
                value={confPassword}
                onChangeText={(text) => {
                  this.setState({confPassword: text});
                }}
              />
            </Item>
            <Button full rounded danger onPress={this.resetPassword}>
              <Text style={{color: 'white'}}>Reset</Text>
            </Button>
          </Form>
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

export default connect(mapStateToProps)(ResetPassword);
