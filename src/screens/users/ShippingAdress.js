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
  Item,
  Input,
  Right,
} from 'native-base';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import {setAddress} from '../../utils/redux/ActionCreators/address';
import CardAdress from '../../components/CardAdress';

class Shipping extends React.Component {
  state = {
    shippingAddress: [],
    selectedAddress: null,
  };

  getAddress = () => {
    axios
      .get(API_URL + `address/1`)
      .then(({data}) => {
        console.log(data);
        this.setState({
          shippingAddress: data.data,
        });
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getAddress();
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  setAddress = (id) => {
    this.setState({
      selectedAddress: id,
    });
  };
  setActiveAddress = () => {
    alert('Adress ' + this.state.selectedAddress + ' terpilih');
    this.props.dispatch(setAddress(this.state.selectedAddress));
  };

  render() {
    console.log(this.props.auth);
    const {shippingAddress} = this.state;

    return (
      <>
        <Container>
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image source={require('../../assets/icons/back.png')} />
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'black', fontWeight: 'bold'}}>
                My Shipping Address
              </Title>
            </Body>
            <Right>
              <Button transparent onPress={this.getAddress}>
                <Image source={require('./../../assets/icons/refresh.png')} />
              </Button>
            </Right>
          </Header>
          <Content style={{backgroundColor: '#f0f0f0', margin: 10}}>
            <Item rounded style={{marginTop: 20, backgroundColor: 'white'}}>
              <Input placeholder="Search Here" />
            </Item>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 18}}>
                Shipping Address
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AddAddress');
                }}>
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 18}}>
                  Add New
                </Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView>
              <ScrollView
                style={{height: 380, marginBottom: 20, marginTop: -20}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setAddress(id);
                  }}>
                  {shippingAddress &&
                    shippingAddress.map(({id, name, city, zip, phone}) => {
                      return (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              this.setAddress(id);
                            }}>
                            <CardAdress
                              key={id}
                              addressId={id}
                              name={name}
                              city={city}
                              postal={zip}
                              phone={phone}
                              navigation={this.props.navigation}
                            />
                          </TouchableOpacity>
                        </>
                      );
                    })}
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>

            <Button full rounded bordered dark>
              <TouchableOpacity onPress={this.setActiveAddress}>
                <Text>Choose Address</Text>
              </TouchableOpacity>
            </Button>
          </Content>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({auth, address}) => {
  return {
    auth,
    address,
  };
};

export default connect(mapStateToProps)(Shipping);
