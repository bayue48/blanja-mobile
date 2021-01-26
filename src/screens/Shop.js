import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BottomNavigator from '../components/BottomNav';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Right,
  Card,
  CardItem,
} from 'native-base';
import {REACT_APP_BASE_URL} from '@env';

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {product_category} = this.props;
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
              Categories
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Search');
              }}>
              <Image source={require('../assets/icons/Search.png')} />
            </Button>
          </Right>
        </Header>

        <Container style={styles.container}>
          <ScrollView>
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
              <Text style={styles.btnTitle}>Summer Sales</Text>
              <Text style={styles.btnSub}>Up to 50% off</Text>
            </TouchableOpacity>

            <Card style={styles.card}>
              <CardItem
                cardBody
                button
                onPress={() => {
                  this.props.navigation.navigate('Category', {
                    ctgId: 'new',
                    ctgName: 'New Products',
                  });
                }}>
                <Left>
                  <Text style={styles.cardTitle}>New</Text>
                </Left>
                <Right>
                  <Image
                    source={require('../assets/images/new.png')}
                    style={styles.cardImg}
                  />
                </Right>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem
                cardBody
                button
                onPress={() => {
                  this.props.navigation.navigate('Category', {
                    ctgId: 1,
                    ctgName: 'T-Shirts',
                  });
                }}>
                <Left>
                  <Text style={styles.cardTitle}>T-Shirt</Text>
                </Left>
                <Right>
                  <Image
                    source={require('../assets/images/tshirt-low.jpg')}
                    style={styles.cardImg}
                  />
                </Right>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem
                cardBody
                button
                onPress={() => {
                  this.props.navigation.navigate('Category', {
                    ctgId: 2,
                    ctgName: 'Shorts',
                  });
                }}>
                <Left>
                  <Text style={styles.cardTitle}>Shorts</Text>
                </Left>
                <Right>
                  <Image
                    source={require('../assets/images/short-low.jpg')}
                    style={styles.cardImg}
                  />
                </Right>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem
                cardBody
                button
                onPress={() => {
                  this.props.navigation.navigate('Category', {
                    ctgId: 3,
                    ctgName: 'Jacket',
                  });
                }}>
                <Left>
                  <Text style={styles.cardTitle}>Jackets</Text>
                </Left>
                <Right>
                  <Image
                    source={require('../assets/images/jacket-low.jpg')}
                    style={styles.cardImg}
                  />
                </Right>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem
                cardBody
                button
                onPress={() => {
                  this.props.navigation.navigate('Category', {
                    ctgId: 4,
                    ctgName: 'Pants',
                  });
                }}>
                <Left>
                  <Text style={styles.cardTitle}>Pants</Text>
                </Left>
                <Right>
                  <Image
                    source={require('../assets/images/pant.jpg')}
                    style={styles.cardImg}
                  />
                </Right>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem
                cardBody
                button
                onPress={() => {
                  this.props.navigation.navigate('Category', {
                    ctgId: 5,
                    ctgName: 'Shoes',
                  });
                }}>
                <Left>
                  <Text style={styles.cardTitle}>Shoes</Text>
                </Left>
                <Right>
                  <Image source={require('../assets/images/shoes.png')} />
                </Right>
              </CardItem>
            </Card>
          </ScrollView>
        </Container>
        {/* <BottomNavigator shop={true} navigation={this.props.navigation} /> */}
      </>
    );
  }
}

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DB3022',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
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
});
