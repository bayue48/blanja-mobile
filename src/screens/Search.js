import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Right,
  Item,
  Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';
import axios from 'axios';
import CardCategory from '../components/CardProduct';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    products: [],
    searchForm: '',
    pageInfo: {},
  };

  search = () => {
    axios
      .get(API_URL + 'products/sort?name=' + this.state.searchForm)
      .then(({data}) => {
        console.log(data);
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  prevPage = () => {
    const prevPage = this.state.pageInfo.previousPage;
    if (prevPage != null) {
      axios
        .get(API_URL + prevPage)
        .then(({data}) => {
          console.log(data);
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
          });
        })
        .catch((err) => {
          console.log(err);
          ToastAndroid.show("Product Tidak Ditemukan", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        });
    }
  };

  nextPage = () => {
    const nextPage = this.state.pageInfo.nextpage;
    if (nextPage != null) {
      axios
        .get(API_URL + nextPage)
        .then(({data}) => {
          console.log(data);
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const {products, searchForm} = this.state;
    console.log(this.state);
    return (
      <>
        <Container style={styles.container}>
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
              <Title
                style={{
                  color: 'black',
                  marginLeft: 35,
                  width: 160,
                  fontWeight: 'bold',
                }}>
                Search Products
              </Title>
            </Body>
            <Right></Right>
          </Header>

          <Content>
            <Item rounded>
              <Input
                placeholder="Search"
                value={searchForm}
                onChangeText={(text) => {
                  this.setState({searchForm: text});
                }}
              />
              <TouchableOpacity onPress={this.search}>
                <Icon name="search" size={25} />
              </TouchableOpacity>
            </Item>

            <ScrollView>
              <View style={styles.grid}>
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
                      // console.log(img);
                      return (
                        <CardCategory
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
              </View>
            </ScrollView>
          </Content>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button full bordered light style={styles.button} onPress={this.prevPage}>
                                <Text style={styles.btnSub}>{`<<<`}</Text>
                            </Button>
                            <Button full bordered light style={styles.button}>
                                <Text style={styles.btnSub}>{this.state.pageInfo.currentPage}</Text>
                            </Button>
                            <Button full bordered light style={styles.button} onPress={this.nextPage}>
                                <Text style={styles.btnSub}>{`>>>`}</Text>
                            </Button>
                        </View> */}
        </Container>
      </>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    // backgroundColor: "#DB3022",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: 70,
  },
  btnTitle: {
    color: '#d9534f',
    fontSize: 35,
  },
  btnSub: {
    color: '#d9534f',
    fontSize: 18,
  },
  card: {
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
    marginVertical: 10,
  },
  cardTitle: {
    flex: 1,
    textAlign: 'center',
  },
  cardImg: {
    maxWidth: 170,
    maxHeight: 120,
  },
  grid: {
    padding: 20,
    flexDirection: 'row',
    marginLeft: 25,
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 10,
  },
});
