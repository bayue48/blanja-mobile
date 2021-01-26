import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardBag from '../../components/CardBag';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';

class Mybag extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    emptyBag: false,
  };

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (!this.props.auth.isLogin) {
        this.props.navigation.navigate('Login');
      }
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const bagState = this.props.cart.mybag;
    let thisBag;
    if (bagState.length < 1) {
      thisBag = (
        <>
          <View>
            <Text>Cart anda masih kosong</Text>
          </View>
        </>
      );
    } else {
      thisBag = (
        <>
          {bagState &&
            bagState.map(
              ({
                id,
                product_img,
                product_name,
                color,
                size,
                qty,
                product_price,
              }) => {
                return (
                  <>
                    <CardBag
                      productId={id}
                      img={product_img}
                      name={product_name}
                      color={color}
                      size={size}
                      qty={qty}
                      price={product_price}
                    />
                  </>
                );
              },
            )}
        </>
      );
    }
    return (
      <>
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
          <Right>
            <Button transparent>
              <Image source={require('../../assets/icons/Search.png')} />
            </Button>
          </Right>
        </Header>
        <Container>
          <View style={styles.container}>
            <Text
              style={{
                fontFamily: 'Metropolis-Bold',
                fontSize: 34,
                fontWeight: '700',
                marginTop: 10,
                marginBottom: 10,
              }}>
              My Bag
            </Text>

            {thisBag}
          </View>
          <View style={styles.addcart}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <Text style={{fontFamily: 'Metropolis-Light', color: '#9B9B9B'}}>
                Total amount:
              </Text>
              <Text style={{fontFamily: 'Metropolis-Bold'}}>
                Rp. {this.props.cart.totalAmount}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Checkout');
              }}>
              <View style={styles.btn}>
                <Text style={{color: '#fff'}}>CHECK OUT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({auth, cart}) => {
  return {
    auth,
    cart,
  };
};

export default connect(mapStateToProps)(Mybag);

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  addcart: {
    position: 'absolute',
    bottom: 0,
    top: undefined,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#DB3022',
    width: windowWidth,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
});
