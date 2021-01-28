import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Container} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';
import CardProduct from '../components/CardProduct';
import axios from 'axios';
import {API_URL} from '@env';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    products: [],
    productNew: [],
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

  getPopularProducts = () => {
    axios
      .get(API_URL + 'products/sort?sortBy=product_rating&orderBy=desc')
      .then(({data}) => {
        // console.log(data)
        this.setState({
          products: data.data.products,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  refresh = () => {
    this.getNewProducts();
    this.getPopularProducts();
  };

  componentDidMount = () => {
    this.getNewProducts();
    this.getPopularProducts();
  };
  render() {
    const {products, productNew, pageInfo} = this.state;
    // console.log(API_URL)
    return (
      <Container>
        <ScrollView vertical={true}>
          <View style={{height: 180}}>
            <ImageBackground
              style={{width: '100%', height: '100%'}}
              source={require('../assets/images/header.png')}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  marginBottom: 15,
                  marginLeft: 10,
                }}>
                <Text style={{fontSize: 35, fontWeight: 'bold', color: '#fff'}}>
                  {' '}
                  Street Clothes
                </Text>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Notification');
                  }}
                  style={{position: 'absolute', right: 20, top: 40}}>
                  <Image source={require('../assets/icons/bell.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.refresh}
                  style={{position: 'absolute', right: 20, top: 130}}>
                  <Image source={require('../assets/icons/refresh.png')} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <Grid style={{padding: 10}}>
            <SafeAreaView>
              <View>
                <Text style={styles.title}>New</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Category', {
                      ctgId: 'new',
                      ctgName: 'New Products',
                    });
                  }}>
                  <Text style={styles.view}>View all</Text>
                </TouchableOpacity>

                <Text style={styles.text}>You’ve never seen it before!</Text>
              </View>
              <Row size={4}>
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
              </Row>

              <View>
                <Text style={styles.title}>Popular</Text>
                <Text style={styles.view}>View all</Text>
                <Text style={styles.text}>You’ve never seen it before!</Text>
              </View>
              <Row size={4}>
                <SafeAreaView>
                  <ScrollView horizontal={true}>
                    {products &&
                      products.map(
                        ({
                          id,
                          product_name,
                          product_price,
                          product_category,
                          product_img,
                        }) => {
                          let img = product_img.split(',')[0];
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
                    {/* <CardProduct navigation={this.props.navigation}  /> */}
                  </ScrollView>
                </SafeAreaView>
              </Row>
            </SafeAreaView>
          </Grid>
        </ScrollView>
      </Container>
    );
  }
}

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: 10,
  },
  title: {
    fontSize: 34,
    marginTop: 20,
    fontFamily: 'Metropolis',
    fontWeight: '700',
  },
  view: {
    alignSelf: 'flex-end',
    fontFamily: 'Metropolis',
  },
  text: {
    fontFamily: 'Metropolis',
    color: '#9B9B9B',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.24,
  },
});
