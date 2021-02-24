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
  CheckBox,
} from 'native-base';
import {
  Image,
  View,
  TouchableOpacity,
  Picker,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {vw} from 'react-native-expo-viewport-units';
import {orderItems} from './../../utils/redux/ActionCreators/bag';
import axios from 'axios';
import {BASE_URL} from '@env';
import CardAdress from './../../components/cardAddressPayment';
import PushNotification from 'react-native-push-notification';
import {showNotification} from '../../notif';

import {useSocket} from './../../utils/context/SocketProvider';
// const socket = useSocket()

const channel = 'notif';

class CheckOut extends React.Component {
  state = {
    isCheckedMaster: false,
    isCheckedPost: false,
    isCheckedGopay: false,
    selectedPayment: 0,
    address: [],
    kurir: [],
    jasaKirim: '0',
    shippingPrice: 0,
  };

  checkedMaster = () => {
    this.setState({
      isCheckedMaster: !this.state.isCheckedMaster,
      isCheckedPost: false,
      isCheckedGopay: false,
      selectedPayment: 1,
    });
  };

  checkedPost = () => {
    this.setState({
      isCheckedMaster: false,
      isCheckedPost: !this.state.isCheckedPost,
      isCheckedGopay: false,
      selectedPayment: 2,
    });
  };

  checkedGopay = () => {
    this.setState({
      isCheckedMaster: false,
      isCheckedPost: false,
      isCheckedGopay: !this.state.isCheckedGopay,
      selectedPayment: 3,
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
    }
    if (
      payment !== 0 &&
      this.props.address.activeAddress !== null &&
      this.state.jasaKirim !== '0'
    ) {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const day = new Date().getDate();
      const Order = {
        trxId: `INV/${year}/${month}/${day}/${this.props.bag.trxId}`,
        payment: payment,
        address: this.props.address.activeAddress,
      };
      if (this.props.dispatch(orderItems(Order))) {
        const newTrx = {
          user_id: this.props.auth.id,
          TrxId: Order.trxId,
          payment: payment,
          address: this.props.address.activeAddress,
          kurir: this.state.jasaKirim,
          qty: this.props.bag.mybag.length,
          total: this.props.bag.totalAmmount + this.state.shippingPrice,
          trackingNumber: `No Data`,
        };
        axios
          .post(BASE_URL + '/transaksi', newTrx)
          .then((result) => {
            //emit dari BE
            axios
              .post(BASE_URL + '/transaksi/itemOrder', this.props.bag.mybag)
              .then((res) => {
                showNotification(
                  'Notification',
                  `Checkout Success with ID: ${Order.trxId}`,
                  channel,
                );
                const notifData = {
                  user_id: this.props.auth.id,
                  level: this.props.auth.level,
                  title: `Order ID: ${Order.trxId}.`,
                  message: `You can view your order history by going to Order Page.`,
                };
                axios
                  .post(BASE_URL + '/notif/add', notifData)
                  .then(({data}) => {
                    this.props.navigation.replace('Success');
                  })
                  .catch(({response}) => {
                    console.log(response.data);
                  });
              })
              .catch(({response}) => {
                console.log(response.data);
              });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    } else {
      ToastAndroid.show(
        'Please select address and payment',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  componentDidMount = () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + this.props.auth.token,
      },
    };
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      axios
        .get(
          BASE_URL + `/address/get/${this.props.address.activeAddress}`,
          config,
        )
        .then(({data}) => {
          this.setState({
            address: data.data,
          });
        })
        .catch(({response}) => {
          console.log(response.data);
        });
      axios
        .get(BASE_URL + '/kurir/jasa_pengiriman')
        .then(({data}) => {
          this.setState({
            kurir: data.data,
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

  setKurir = (e) => {
    if (e !== 0) {
      const price = this.state.kurir.filter((jasa) => {
        return jasa.id === e;
      });
      console.log('harga', price);
      this.setState({
        jasaKirim: e,
        shippingPrice: 15000,
      });
    }
  };

  render() {
    // console.log(this.props.bag.mybag[0])
    const {
      address,
      kurir,
      jasaKirim,
      shippingPrice,
      selectedPayment,
    } = this.state;
    // console.log(jasaKirim, shippingPrice, selectedPayment)
    let cardAdress;
    if (this.props.address.activeAddress != null) {
      cardAdress = (
        <>
          <CardAdress
            key={address.id}
            type={address.address_name}
            addressId={address.id}
            name={address.name}
            city={address.city}
            postal={address.zip}
            phone={address.phone}
            navigation={this.props.navigation}
          />
        </>
      );
    } else {
      cardAdress = <Text>No Selected Adreess.</Text>;
    }
    return (
      <>
        {this.props.bag.length < 1 ? (
          <></>
        ) : (
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
                  <Title
                    style={{
                      color: 'black',
                      marginLeft: 35,
                      fontWeight: 'bold',
                    }}>
                    Checkout
                  </Title>
                </Body>
              </Header>
              <Content style={{backgroundColor: '#f0f0f0'}}>
                <View style={{margin: 10}}>
                  <View style={{height: 150}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        Shipping Address
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Shipping');
                        }}>
                        <Text
                          style={{
                            marginRight: 5,
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          Change Address
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {cardAdress}
                  </View>

                  <Text
                    style={{
                      marginTop: 20,
                      marginLeft: 5,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    Payment
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: vw(5),
                      height: 60,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('./../../assets/icons/master.png')}
                        style={{width: 105, height: 88}}
                      />
                      <Text style={{marginTop: 30, width: 120}}>
                        Master Card
                      </Text>
                    </View>
                    <CheckBox
                      style={{marginTop: 30}}
                      checked={this.state.isCheckedMaster}
                      onPress={this.checkedMaster}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: vw(5),
                      height: 60,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image source={require('./../../assets/icons/pos.png')} />
                      <Text style={{marginTop: 30, width: 120}}>
                        Post Indonesia
                      </Text>
                    </View>
                    <CheckBox
                      style={{marginTop: 30}}
                      checked={this.state.isCheckedPost}
                      onPress={this.checkedPost}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: vw(5),
                      height: 60,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('./../../assets/icons/gopay.png')}
                      />
                      <Text style={{marginTop: 30, width: 120}}>GoPay</Text>
                    </View>
                    <CheckBox
                      style={{marginTop: 30}}
                      checked={this.state.isCheckedGopay}
                      onPress={this.checkedGopay}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 25,
                    marginVertical: 5,
                    marginTop: 30,
                  }}>
                  <Text style={{width: 80, color: 'gray'}}>Shipping :</Text>
                  <View style={{width: 150, height: 40, marginTop: -15}}>
                    <Picker
                      // selectedValue={this.state.jasaKirim}
                      selectedValue={jasaKirim}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setKurir(itemValue)
                      }>
                      <Picker.Item
                        label="Delivery Service"
                        value="0"
                        style={{backgroundColor: 'gray'}}
                      />
                      {kurir &&
                        kurir.map(({id, nama_kurir, waktu}) => {
                          return (
                            <Picker.Item
                              label={nama_kurir + ', ' + waktu}
                              value={`${id}`}
                            />
                          );
                        })}
                    </Picker>
                  </View>
                </View>
              </Content>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 160,
                  marginTop: 10,
                  borderTopEndRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                    marginVertical: 5,
                  }}>
                  <Text style={{width: 100, color: 'gray'}}>Order :</Text>
                  <Text>Rp. {this.props.bag.totalAmmount}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                    marginVertical: 5,
                  }}>
                  <Text style={{width: 100, color: 'gray'}}>Shipping :</Text>
                  <Text>Rp. {this.state.shippingPrice}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                    marginVertical: 5,
                  }}>
                  <Text style={{width: 100, color: 'gray'}}>Summary :</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    Rp. {this.props.bag.totalAmmount + this.state.shippingPrice}
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
            </Container>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = ({auth, address, bag, notification}) => {
  return {
    auth,
    address,
    bag,
    notification,
  };
};

export default connect(mapStateToProps)(CheckOut);
