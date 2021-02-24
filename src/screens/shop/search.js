import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Card from '../../components/cardHome';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Body,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {vh} from 'react-native-expo-viewport-units';
import axios from 'axios';
import {BASE_URL} from '@env';

class ShopCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      pageInfo: {},
      currentPage: '',
      intialPage: '',
      searchKey: '',
      emptyResult: '',
      loading: false,
    };
  }

  nextPage = () => {
    const nextPage = this.state.pageInfo.nextpage;
    if (nextPage != null) {
      axios
        .get(BASE_URL + nextPage)
        .then(({data}) => {
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  prevPage = () => {
    const prevPage = this.state.pageInfo.previousPage;
    if (prevPage != null) {
      axios
        .get(BASE_URL + prevPage)
        .then(({data}) => {
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  SearchItems = () => {
    this.setState({
      loading: true,
      emptyResult: '',
    });
    axios
      .get(BASE_URL + '/products?name=' + this.state.searchKey)
      .then(({data}) => {
        // console.log(data)
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          products: [],
          loading: false,
          emptyResult: `Search not found on ${this.state.searchKey}`,
        });
        console.log(error);
      });
  };

  Refresh = () => {
    this.getInitialData();
  };

  render() {
    const {products, pageInfo, loading} = this.state;
    let searchResult;
    if (products.length > 0) {
      searchResult = (
        <>
          <View style={styles.grid}>
            {products &&
              products.map(
                ({
                  id,
                  product_name,
                  product_price,
                  product_img,
                  category_name,
                  color_name,
                  sizes_name,
                  rating,
                  dibeli,
                }) => {
                  let img = product_img.split(',')[0];
                  return (
                    <>
                      <Card
                        navigation={this.props.navigation}
                        key={id}
                        product_name={product_name}
                        product_price={product_price}
                        product_img={img}
                        keyId={id}
                        category={category_name}
                        color={color_name}
                        size={sizes_name}
                        rating={rating}
                        dibeli={dibeli}
                      />
                    </>
                  );
                },
              )}
          </View>
        </>
      );
    } else {
      searchResult = (
        <>
          {this.state.emptyResult !== '' ? (
            <View
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('./../../assets/icons/notfound.png')}
                style={{width: vh(20), height: vh(20)}}
              />
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                {this.state.emptyResult}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </>
      );
    }
    return (
      <>
        <Header transparent style={{backgroundColor: 'white'}}>
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
            <Title style={{color: 'black', marginLeft: 45, fontWeight: 'bold'}}>
              Search
            </Title>
          </Body>
        </Header>
        <Container style={{backgroundColor: '#f0f0f0'}}>
          <ScrollView>
            <Form style={{marginBottom: 10, marginHorizontal: 10}}>
              <Label>Keyword</Label>
              <Item regular style={{marginBottom: 5}}>
                <Input
                  name="searchKey"
                  value={this.state.searchKey}
                  onChangeText={(text) => {
                    this.setState({searchKey: text});
                  }}
                />
              </Item>
              <Button full rounded danger onPress={this.SearchItems}>
                <Text style={{color: 'white'}}>Search</Text>
              </Button>
            </Form>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
              }}>
              <Text style={{fontSize: 18}}>
                Search result for {this.state.searchKey}
              </Text>
            </View>
            <View style={{minHeight: vh(60)}}>
              {loading ? (
                <View style={{marginTop: vh(20)}}>
                  <Text style={{fontSize: 24, textAlign: 'center'}}>
                    Please wait...
                  </Text>
                </View>
              ) : (
                <></>
              )}
              {searchResult}
            </View>
            {products.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingBottom: 5,
                }}>
                <Button small rounded danger onPress={this.prevPage}>
                  <Text style={{paddingHorizontal: 10}}>{`<< `}Prev</Text>
                </Button>
                <Button full small bordered style={{width: 200}}>
                  <Text>
                    Page {pageInfo.currentPage} of {pageInfo.totalPage}
                  </Text>
                </Button>
                <Button small rounded danger onPress={this.nextPage}>
                  <Text style={{paddingHorizontal: 10}}>Next {`>> `}</Text>
                </Button>
              </View>
            ) : (
              <></>
            )}
          </ScrollView>
        </Container>
      </>
    );
  }
}

export default ShopCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  filter: {
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtFilter: {
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DB3022',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  ctgTitle: {
    fontFamily: 'Metropolis-Bold',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 5,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 35,
  },
  btnSub: {
    color: '#fff',
    fontSize: 18,
  },
  card: {
    marginVertical: 10,
  },
  cardTitle: {
    flex: 1,
    textAlign: 'center',
  },
});
