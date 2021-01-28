import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Right,
  Text,
  Item,
  Input,
  Label,
} from 'native-base';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import CardProduct from '../../components/CardListPrd';
import {API_URL} from '@env';
import axios from 'axios';
import {connect} from 'react-redux';

class ListProduct extends React.Component {
  state = {
    products: [],
  };

  getAllProducts = () => {
    axios
      .get(API_URL + `products/getByUser/1`)
      .then(({data}) => {
        this.setState({products: data.data});
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    const {products} = this.state;
    return (
      <>
        <Container style={{padding: 20}}>
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image source={require('./../../assets/icons/back.png')} />
              </Button>
            </Left>
            <Body>
              <Title
                style={{color: 'black', fontWeight: 'bold', marginLeft: 20}}>
                My Product
              </Title>
            </Body>
            <Right>
              <Button transparent onPress={this.getAllProducts}>
                <Image source={require('./../../assets/icons/refresh.png')} />
              </Button>
            </Right>
          </Header>
          <Content style={{backgroundColor: '#f0f0f0', margin: 10}}>
            {products &&
              products.map(
                ({
                  id,
                  product_name,
                  product_price,
                  product_category,
                  product_size,
                  product_color,
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
                      size={product_size}
                      color={product_color}
                      image={img}
                      navigation={this.props.navigation}
                    />
                  );
                },
              )}
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:15 }}>
                            <Button full rounded bordered dark style={styles.btn}>
                                <Text>Edit Product</Text>
                            </Button>
                            <Button full rounded bordered dark style={styles.btn}>
                                <Text>Edit Stock</Text>
                            </Button>
                        </View> */}
          </Content>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 150,
  },
});

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(ListProduct);
