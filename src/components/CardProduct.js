import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Container, Card, CardItem} from 'native-base';
import {API_URL} from '@env';

class CardProduct extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {id, name, price, category, image} = this.props;
    // console.log(this.props.id)
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('DetailPage', {
            itemId: this.props.id,
          });
        }}>
        <Card style={{height: 280, marginRight: 10, width: 148}}>
          <CardItem cardBody>
            <View>
              <Image
                source={{uri: API_URL + image, maxWidth: 150, height: 180}}
              />
              <Image
                source={require('../assets/icons/rating.png')}
                style={{marginTop: 5}}
              />
              <Text style={{color: 'gray', marginTop: 5}}> {category} </Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}> {name} </Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}> {price} </Text>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default CardProduct;
