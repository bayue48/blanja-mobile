import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Picker, 
  ToastAndroid
} from 'react-native';
import CardProduct from '../components/CardProduct';
import Review from '../components/Review';
import {Left, Body, Right, Title, Button, Container, Header} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';
import axios from 'axios';
import {API_URL} from '@env';
import {addItems} from '../utils/redux/ActionCreators/cart';
import {connect} from 'react-redux';
import Nav from '../components/BottomNav';

class DetailPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    selectedSize: 0,
    selectedColor: 0,
    product: [],
    productNew: [],
  };

  setSize = (e) => {
    this.setState({
      selectedSize: e,
    });
  };

  setColor = (e) => {
    this.setState({
      selectedColor: e,
    });
  };

  getSingleProduct = () => {
    axios
      .get(API_URL + 'products/' + this.props.route.params.itemId)
      .then(({data}) => {
        // console.log(data.data)
        this.setState({
          product: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getNewProducts = () => {
    axios
      .get(API_URL + 'products/sort?sortBy=updated_at&orderBy=desc')
      .then(({data}) => {
        // console.log(data.data.products)
        this.setState({
          productNew: data.data.products,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getNewProducts();
    this.getSingleProduct();
  };

  addToCart = () => {
    if (!this.props.auth.isLogin) {
      ToastAndroid.show("Harus Login Terlebih Dahulu", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    } else {
      if (this.state.selectedColor == 0 || this.state.selectedSize == 0) {
        ToastAndroid.show("Pilih warna dan ukuran", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else {
        const Items = {
          user_id: this.props.auth.id,
          product_id: this.props.route.params.itemId,
          product_name: this.state.product[0].product_name,
          product_img: this.state.product[0].product_img.split(',')[0],
          product_color: this.state.selectedColor,
          produtc_size: this.state.selectedSize,
          product_price: this.state.product[0].product_price,
          qty: 1,
        };
        console.log(Items);
        this.props.dispatch(addItems(Items));
        ToastAndroid.show("berhasil masukan keranjang", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        this.props.navigation.navigate('MyBag');
      }
    }
  };

  render() {
    const {product, productNew} = this.state;
    const id_productDetails = this.props.route.params.itemId;
    return (
      <>
        <Header transparent>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={require('../assets/icons/back.png')} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black', marginLeft: 35, fontWeight: 'bold'}}>
              Detail Product
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Image source={require('../assets/icons/Search.png')} />
            </Button>
          </Right>
        </Header>

        {product &&
          product.map(
            ({
              id,
              product_name,
              product_price,
              product_desc,
              product_category,
              product_img,
            }) => {
              return (
                <Container>
                  <Grid>
                    <SafeAreaView>
                      <ScrollView>
                        <Row size={50}>
                          <View style={styles.imgwrap}>
                            <SafeAreaView>
                              <ScrollView horizontal={true}>
                                {product_img &&
                                  product_img.split(',').map((img) => {
                                    return (
                                      <Image
                                        source={{uri: API_URL + img}}
                                        style={styles.image}
                                      />
                                    );
                                  })}
                              </ScrollView>
                            </SafeAreaView>
                          </View>
                        </Row>

                        <Row size={50}>
                          <View style={styles.container}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <TouchableOpacity>
                                <View style={styles.size}>
                                  <Picker
                                    selectedValue={this.state.selectedSize}
                                    onValueChange={(itemValue, itemIndex) =>
                                      this.setSize(itemValue)
                                    }>
                                    <Picker.Item
                                      label="Size"
                                      value="0"
                                      style={{backgroundColor: 'gray'}}
                                    />
                                    <Picker.Item label="S" value="S" />
                                    <Picker.Item label="M" value="M" />
                                    <Picker.Item label="L" value="L" />
                                    <Picker.Item label="28" value="28" />
                                    <Picker.Item label="29" value="29" />
                                    <Picker.Item label="30" value="30" />
                                    <Picker.Item label="31" value="31" />
                                    <Picker.Item label="32" value="32" />
                                    <Picker.Item label="33" value="33" />
                                    <Picker.Item label="34" value="34" />
                                    <Picker.Item label="35" value="35" />
                                    <Picker.Item label="36" value="36" />
                                    <Picker.Item label="37" value="37" />
                                    <Picker.Item label="38" value="38" />
                                    <Picker.Item label="39" value="39" />
                                    <Picker.Item label="40" value="40" />
                                    <Picker.Item label="41" value="41" />
                                    <Picker.Item label="42" value="42" />
                                  </Picker>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity>
                                <View style={styles.size}>
                                  <Picker
                                    selectedValue={this.state.selectedColor}
                                    onValueChange={(itemValue, itemIndex) =>
                                      this.setColor(itemValue)
                                    }>
                                    <Picker.Item label="Color" value="0" />
                                    <Picker.Item label="Red" value="Red" />
                                    <Picker.Item label="Green" value="Green" />
                                    <Picker.Item label="Blue" value="Blue" />
                                    <Picker.Item label="Black" value="Black" />
                                  </Picker>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity>
                                <Button
                                  full
                                  rounded
                                  danger
                                  style={{width: 50, height: 40, padding: 5}}
                                  onPress={() => {
                                    this.props.navigation.navigate('Chat');
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: '700',
                                      fontSize: 12,
                                      color: '#FFF',
                                    }}>
                                    Chat
                                  </Text>
                                </Button>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.wraptitle}>
                              <Text style={styles.title}>{product_name}</Text>
                              <Text style={styles.subtitle}>
                                {product_price}
                              </Text>
                            </View>
                            <Text style={styles.PrdName}>
                              {product_category}
                            </Text>
                            <View>
                              <Image
                                source={require('./../assets/icons/rating.png')}
                              />
                              <Text style={styles.PrdName}> (10)</Text>
                            </View>
                            <Text style={styles.desc}>{product_desc}</Text>

                            {/* <ListBar nav={navigation} /> */}
                            {/* <View style={styles.text}>
                                                        <Text style={{ fontFamily: 'Metropolis', fontSize: 18 }}>
                                                            You can also like this
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontFamily: 'Metropolis-Light',
                                                                fontSize: 11,
                                                                color: '#9B9B9B',
                                                            }}>
                                                            3 items
                                                        </Text>
                                                    </View>
                                                    <SafeAreaView>
                                                        <ScrollView horizontal={true}>
                                                            <View style={styles.card}>
                                                                <CardProduct navigation={this.props.navigation} />
                                                                <CardProduct navigation={this.props.navigation} />
                                                                <CardProduct navigation={this.props.navigation} />
                                                            </View>
                                                        </ScrollView>
                                                    </SafeAreaView> */}
                            <SafeAreaView>
                              <ScrollView horizontal={true}>
                                {productNew &&
                                  productNew.map(
                                    ({
                                      id,
                                      product_name,
                                      product_price,
                                      product_category,
                                      product_img,
                                    }) => {
                                      let img = product_img.split(',')[0];
                                      // console.log(img);
                                      return (
                                        <CardProduct
                                          id={id}
                                          name={product_name}
                                          price={product_price}
                                          category={product_category}
                                          image={img}
                                          navigation={this.props.navigation}
                                        />
                                      );
                                    },
                                  )}
                                {/* <CardProduct navigation={this.props.navigation} /> */}
                              </ScrollView>
                            </SafeAreaView>
                            <Review idProduct={id_productDetails} />
                          </View>
                        </Row>
                      </ScrollView>
                    </SafeAreaView>
                  </Grid>

                  <Button
                    danger
                    full
                    rounded
                    style={{marginTop: 15}}
                    onPress={this.addToCart}>
                    <Text style={{color: '#fff'}}> Add to Cart </Text>
                  </Button>
                  <Nav navigation={this.props.navigation} />
                </Container>
              );
            },
          )}
      </>
    );
  }
}

const mapStateToProps = ({auth, bag}) => {
  return {
    auth,
    bag,
  };
};

export default connect(mapStateToProps)(DetailPage);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    marginLeft: windowWidth * 0.02,
    marginRight: windowWidth * 0.02,
    marginTop: windowWidth * 0.04,
  },
  imgwrap: {
    flexDirection: 'row',
  },
  image: {
    width: 350,
    height: 413,
  },
  addcart: {
    position: 'absolute',
    bottom: 0,
    top: undefined,
  },
  btn: {
    backgroundColor: '#DB3022',
    width: '100%',
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
  title: {
    fontFamily: 'Metropolis-Light',
    fontSize: 20,
    width: 230,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: 'Metropolis-Light',
    fontSize: 20,
    fontWeight: '700',
  },
  wraptitle: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-around',
  },
  PrdName: {
    fontFamily: 'Metropolis-Light',
    fontSize: 11,
    color: '#9B9B9B',
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  desc: {
    fontFamily: 'Metropolis',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
  },
  sizecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  love: {
    height: 36,
    width: 36,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 18,
  },
  size: {
    width: 160,
    height: 40,
    // paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9B9B9B',
    paddingHorizontal: 5,
  },
});
