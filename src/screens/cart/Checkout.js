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
  Right,
  CheckBox,
} from 'native-base';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import CardAdress from '../../components/CardAdress';
import {orderItems} from '../../utils/redux/ActionCreators/cart';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import PushNotification from 'react-native-push-notification';
// import { showNotification } from '../../services/notif';

const shippingPrice = 15000;
const channel = 'notif';
class Checkout extends React.Component {
  state = {
    isCheckedMaster: false,
    isCheckedPost: false,
    isCheckedGopay: false,
    selectedPayment: 0,
    address: [],
  };

  checkedMaster = () => {
    this.setState({
      isCheckedMaster: !this.state.isCheckedMaster,
      isCheckedPost: false,
      isCheckedGopay: false,
    });
  };

  checkedPost = () => {
    this.setState({
      isCheckedMaster: false,
      isCheckedPost: !this.state.isCheckedPost,
      isCheckedGopay: false,
    });
  };

  checkedGopay = () => {
    this.setState({
      isCheckedMaster: false,
      isCheckedPost: false,
      isCheckedGopay: !this.state.isCheckedGopay,
    });
  };

  submitOrder = () => {
    let payment = 0;
    if (this.state.isCheckedMaster) {
      payment = 1;
    } else if (this.state.isCheckedPost) {
      payment = 2;
    } else if (this.state.isCheckedGopay) {
      payment = 3;
    } else {
      alert('Harap pilih pembayaran');
    }
    if (payment != 0) {
      const Order = {
        trxId: `TRX00${this.props.cart.trxId}`,
        payment: payment,
        address: this.props.address.selectedAddress,
      };
      if (this.props.dispatch(orderItems(Order))) {
        const newTrx = {
          user_id: 2,
          
        };
        axios
          .post(API_URL + 'history', newTrx)
          .then((result) => {
            axios
              .post(API_URL + 'transactions/itemOrder', this.props.cart.mybag)
              .then((res) => {
                showNotification('Notification', 'Checkout Succes', channel);
                this.props.navigation.navigate('Success');
              })
              .catch(({response}) => {
                console.log(response.data);
              });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    }
  };

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      axios
        .get(API_URL + `address/get/${this.props.address.selectedAddress}`)
        .then(({data}) => {
          this.setState({
            address: data.data,
          });
        })
        .catch(({response}) => {
          console.log(response.data);
        });
    });

    PushNotification.createChannel(
      {
        channelId: 'notif',
        channelName: 'My Notification channel',
        channelDescription: 'A channel to categories your notification',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createchannel returned '${created}'`),
    );
    // code to run on component mount

    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const {address} = this.state;
    console.log(this.props.address.selectedAddress);
    let cardAdress;
    if (this.props.address.selectedAddress != null) {
      cardAdress = (
        <>
          <CardAdress
            key={address.id}
            addressId={address.id}
            name={address.recipient_name}
            city={address.city}
            postal={address.postal}
            phone={address.phone}
            navigation={this.props.navigation}
          />
        </>
      );
    } else {
      cardAdress = <Text>Belum ada alamat terpilih</Text>;
    }
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
              <Title
                style={{color: 'black', marginLeft: 35, fontWeight: 'bold'}}>
                CheckOut
              </Title>
            </Body>
          </Header>
          <Content style={{backgroundColor: '#f0f0f0'}}>
            <View style={{margin: 10}}>
              <Text
                style={{
                  marginTop: 20,
                  marginLeft: 5,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Shipping Address
              </Text>

              {cardAdress}

              <Text
                style={{
                  marginTop: 20,
                  marginLeft: 5,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Payment
              </Text>
              <View style={{flexDirection: 'row', marginRight: 10, height: 60}}>
                <Image source={require('../../assets/images/card.png')} />
                <Text style={{marginTop: 30, width: 120}}>Master Card</Text>
                <CheckBox
                  style={{marginLeft: 70, marginTop: 30}}
                  checked={this.state.isCheckedMaster}
                  onPress={this.checkedMaster}
                />
              </View>
              <View style={{flexDirection: 'row', marginRight: 10, height: 60}}>
                <Image source={require('../../assets/images/card.png')} />
                <Text style={{marginTop: 30, width: 120}}>Post Indonesia</Text>
                <CheckBox
                  style={{marginLeft: 70, marginTop: 30}}
                  checked={this.state.isCheckedPost}
                  onPress={this.checkedPost}
                />
              </View>
              <View style={{flexDirection: 'row', marginRight: 10, height: 60}}>
                <Image source={require('../../assets/images/card.png')} />
                <Text style={{marginTop: 30, width: 120}}>GoPay</Text>
                <CheckBox
                  style={{marginLeft: 70, marginTop: 30}}
                  checked={this.state.isCheckedGopay}
                  onPress={this.checkedGopay}
                />
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                height: 190,
                marginTop: 50,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={{width: 100, color: 'gray'}}>Order :</Text>
                <Text>Rp. {this.props.cart.totalAmount}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={{width: 100, color: 'gray'}}>Shipping :</Text>
                <Text>Rp. {shippingPrice}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={{width: 100, color: 'gray'}}>Summary :</Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Rp. {this.props.cart.totalAmount + shippingPrice}
                </Text>
              </View>
              <Button
                full
                rounded
                danger
                style={{margin: 10}}
                onPress={this.submitOrder}>
                <Text style={{color: 'white'}}>Submit Order</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({auth, address, cart}) => {
  return {
    auth,
    address,
    cart,
  };
};

export default connect(mapStateToProps)(Checkout);
