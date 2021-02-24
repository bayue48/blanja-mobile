import React from 'react';
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
} from 'native-base';
import {
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {setAddress} from './../../utils/redux/ActionCreators/adress';
import {BASE_URL} from '@env';

import CardAdress from './../../components/cardAdress';

class Shipping extends React.Component {
  state = {
    shippingAddress: [],
    selectedAddress: null,
  };

  getAddress = () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + this.props.auth.token,
      },
    };
    axios
      .get(BASE_URL + `/address`, config)
      .then(({data}) => {
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
    // ToastAndroid.show('Adress ' + this.state.selectedAddress + ' terpilih', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    this.props.dispatch(setAddress(this.state.selectedAddress));
  };

  render() {
    // console.log(this.props.auth)
    const {shippingAddress} = this.state;
    // console.log(this.props.address)
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
                <Image source={require('./../../assets/back.png')} />
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'black', fontWeight: 'bold'}}>
                My Shipping Address
              </Title>
            </Body>
          </Header>
          <Content style={{backgroundColor: '#f0f0f0', margin: 10}}>
            <Item rounded style={{marginTop: 20, backgroundColor: 'white'}}>
              <Input placeholder="Search Here" />
            </Item>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginHorizontal: 10,
                marginTop: 15,
              }}>
              Shipping Address
            </Text>
            <SafeAreaView>
              <ScrollView
                style={{height: 380, marginBottom: 20, marginTop: 20}}>
                {shippingAddress.length > 0 ? (
                  <>
                    {shippingAddress &&
                      shippingAddress.map(
                        ({id, name, city, zip, phone, address_name}) => {
                          const color =
                            this.state.selectedAddress === id
                              ? '#dedede'
                              : 'white';
                          return (
                            <>
                              <TouchableOpacity
                                onPress={() => {
                                  this.props.navigation.replace(
                                    'DetailsAddress',
                                    {
                                      addressId: id,
                                    },
                                  );
                                }}>
                                <CardAdress
                                  key={id}
                                  addressId={id}
                                  type={address_name}
                                  color={color}
                                  name={name}
                                  city={city}
                                  postal={zip}
                                  phone={phone}
                                  navigation={this.props.navigation}
                                />
                              </TouchableOpacity>
                            </>
                          );
                        },
                      )}
                  </>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text></Text>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                      No Adreess.
                    </Text>
                    <Text></Text>
                  </View>
                )}
              </ScrollView>
            </SafeAreaView>
          </Content>
          <View
            style={{
              backgroundColor: '#f0f0f0',
              marginBottom: 10,
              marginHorizontal: 10,
            }}>
            <Button
              full
              rounded
              danger
              onPress={() => {
                this.props.navigation.navigate('AddAddress');
              }}>
              <Text>Add New Address</Text>
            </Button>
          </View>
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
