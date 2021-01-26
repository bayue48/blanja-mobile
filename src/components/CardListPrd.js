import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import {API_URL} from '@env';

class CardListPrd extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {id, name, price, category, image} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('DetailPage', {
            itemId: this.props.id,
          });
        }}>
        <View style={styles.container}>
          <Image source={{uri: API_URL + image, width: 90, height: 120}} />
          <View style={styles.infobag}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 5,
                  maxWidth: 175,
                }}>
                {name}
              </Text>
              <Button
                full
                rounded
                success
                style={{width: 50, height: 20, marginTop: 5}}
                onPress={() => {
                  this.props.navigation.navigate('EditProduct', {
                    itemId: this.props.id,
                  });
                }}>
                <Text style={{fontWeight: '700', fontSize: 12, color: '#FFF'}}>
                  Edit
                </Text>
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'gray', marginBottom: 10}}>{category}</Text>
              {/* <Button full rounded danger style={{ width: 50, height: 20, marginTop: 5 }}>
                                <Text style={{ fontWeight: '700', fontSize: 12, color: '#FFF' }}>Delete</Text>
                            </Button> */}
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{color: 'gray'}}>
                Qty :<Text style={{color: 'black'}}>1</Text>
              </Text>
              <View style={styles.price}>
                <Text
                  style={{
                    fontFamily: 'Metropolis-Bold',
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginLeft: 80,
                    marginTop: -10,
                  }}>
                  {price}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CardListPrd;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 120,
    marginBottom: 20,
  },
  price: {
    marginTop: 7,
    marginLeft: 50,
  },
  img: {
    width: 95,
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infobag: {
    backgroundColor: '#fff',
    width: 245,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 5,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});
