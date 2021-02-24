import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Text,
  View,
  Item,
  Label,
  Input,
} from 'native-base';
import {Image, StyleSheet, ToastAndroid} from 'react-native';
import {setLoginfalse} from './../../utils/redux/ActionCreators/auth';
import {vw} from 'react-native-expo-viewport-units';
import {connect} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '@env';

class addShipping extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    address_name: '',
    name: '',
    street: '',
    city: '',
    zip: '',
    phone: '',
    errorForm: '',
  };

  addAddress = () => {
    const regexPhone = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g;
    if (
      !(this.state.phone.length >= 11) ||
      !(this.state.phone.length <= 15) ||
      !regexPhone.test(this.state.phone)
    ) {
      ToastAndroid.show(
        'Wrong Number Format',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      if (this.state.address_type !== '') {
        const addressData = {
          address_name: this.state.address_name,
          name: this.state.name,
          street: this.state.street,
          city: this.state.city,
          zip: this.state.zip,
          phone: this.state.phone,
          user_id: this.props.auth.id,
        };
        const config = {
          headers: {
            'x-access-token': 'Bearer ' + this.props.auth.token,
          },
        };
        console.log(addressData);
        axios
          .post(BASE_URL + `/address/new`, addressData, config)
          .then(({data}) => {
            ToastAndroid.show(
              data.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.navigate('Shipping');
          })
          .catch(({response}) => {
            if (response.status === 401) {
              ToastAndroid.show(
                'Invalid Session',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              if (this.props.dispatch(setLoginfalse())) {
                this.props.navigation.replace('Profile');
              }
            }
          });
      } else {
        this.setState({
          errorForm: 'Please input all fields',
        });
      }
    }
  };

  render() {
    const {address_name, name, street, city, zip, phone} = this.state;
    // console.log(this.state)
    // console.log(this.props.auth)
    return (
      <Container style={{backgroundColor: '#f0f0f0'}}>
        <View style={{backgroundColor: 'white'}}>
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image source={require('./../../assets/back.png')} />
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'black', fontWeight: 'bold'}}>
                Add Shipping Address
              </Title>
            </Body>
          </Header>
        </View>
        <Content style={{backgroundColor: '#f0f0f0', margin: vw(3)}}>
          <View
            style={{
              height: 130,
              width: vw(94),
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Item
              floatingLabel
              style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
              <Label style={{fontSize: 14, color: 'green'}}>
                Save address as (ex: home address, office address)
              </Label>
              <Input
                value={address_name}
                onChangeText={(text) => {
                  this.setState({address_name: text});
                }}
              />
            </Item>
            <Item
              floatingLabel
              style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
              <Label style={{fontSize: 14}}>Recipent Name</Label>
              <Input
                name="name"
                value={name}
                onChangeText={(text) => {
                  this.setState({name: text});
                }}
              />
            </Item>
          </View>
          <View
            style={{
              height: 195,
              width: vw(94),
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Item
              floatingLabel
              style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
              <Label style={{fontSize: 14}}>Address</Label>
              <Input
                name="street"
                value={street}
                onChangeText={(text) => {
                  this.setState({street: text});
                }}
              />
            </Item>
            <Item
              floatingLabel
              style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
              <Label style={{fontSize: 14}}>City or Subdistrict</Label>
              <Input
                name="city"
                value={city}
                onChangeText={(text) => {
                  this.setState({city: text});
                }}
              />
            </Item>
            <Item
              floatingLabel
              style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
              <Label style={{fontSize: 14}}>Postal Code</Label>
              <Input
                name="zip"
                value={zip}
                onChangeText={(text) => {
                  this.setState({zip: text});
                }}
              />
            </Item>
          </View>
          <View
            style={{
              height: 75,
              width: vw(94),
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Item
              floatingLabel
              style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
              <Label style={{fontSize: 14, color: 'gray'}}>
                Recipient Telephone Number
              </Label>
              <Input
                name="phone"
                value={phone}
                onChangeText={(text) => {
                  this.setState({phone: text});
                }}
              />
            </Item>
          </View>
          <Text style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>
            {this.state.errorForm}
          </Text>
        </Content>
        <View style={{margin: vw(3)}}>
          <Button full rounded danger onPress={this.addAddress}>
            <Text style={{color: 'white'}}>Save Address</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(addShipping);

const styles = StyleSheet.create({
  floatingLabel: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
});
