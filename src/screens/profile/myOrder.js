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
} from 'native-base';
import {Image, View} from 'react-native';

import CardOrder from './../../components/cardOrders';
import {BASE_URL} from '@env';
import {connect} from 'react-redux';
import axios from 'axios';

class Orders extends React.Component {
  state = {
    cardOrder: [],
    emptyOrder: '',
  };
  getMyOrder = () => {
    axios
      .get(BASE_URL + '/transaksi/myTransaction/' + this.props.auth.id)
      .then(({data}) => {
        this.setState({
          cardOrder: data.data,
        });
      })
      .catch(({response}) => {
        this.setState({
          emptyOrder: 'No Transaction...',
        });
        console.log(response.data);
      });
  };

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getMyOrder();
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const {cardOrder} = this.state;
    let orderContent;
    if (cardOrder.length > 0) {
      orderContent = (
        <>
          {cardOrder &&
            cardOrder.map(
              (
                {
                  trxId,
                  trackingNumber,
                  qty,
                  total,
                  created_at,
                  status,
                  status_id,
                },
                index,
              ) => {
                return (
                  <>
                    <CardOrder
                      key={index}
                      trxId={trxId}
                      trackingNumber={trackingNumber}
                      qty={qty}
                      total={total}
                      created_at={created_at}
                      idStatus={status_id}
                      status={status}
                      navigation={this.props.navigation}
                    />
                  </>
                );
              },
            )}
        </>
      );
    } else {
      orderContent = (
        <>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {this.state.emptyOrder}
          </Text>
        </>
      );
    }
    // console.log(this.state.cardOrder)
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
              <Title
                style={{color: 'black', marginLeft: 30, fontWeight: 'bold'}}>
                My Orders
              </Title>
            </Body>
          </Header>
          <Content style={{backgroundColor: '#f0f0f0'}}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 42,
                  marginRight: 10,
                  marginTop: 20,
                  marginBottom: 10,
                  marginLeft: 10,
                }}>
                My Orders
              </Text>
            </View>
            {orderContent}
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

export default connect(mapStateToProps)(Orders);
