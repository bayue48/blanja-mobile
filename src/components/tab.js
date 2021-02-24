import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

export default class navBottom extends React.Component {
  render() {
    let homeBtn;
    let profileBtn;
    let bagBtn;
    let shopBtn;
    if (this.props.home) {
      homeBtn = (
        <>
          <Image
            source={require('../assets/icons/homeAct.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'red', fontWeight: 'bold', marginLeft: -4}}>
            Home
          </Text>
        </>
      );
    } else {
      homeBtn = (
        <>
          <Image
            source={require('../assets/icons/home.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'gray', marginLeft: -4}}>Home</Text>
        </>
      );
    }
    if (this.props.mybag) {
      bagBtn = (
        <>
          <Image
            source={require('../assets/icons/bagAct.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'red', marginLeft: -6}}>Bag</Text>
        </>
      );
    } else {
      bagBtn = (
        <>
          <Image
            source={require('../assets/icons/bag.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'gray', marginLeft: -6}}>Bag</Text>
        </>
      );
    }
    if (this.props.shop) {
      shopBtn = (
        <>
          <Image
            source={require('../assets/icons/shopAct.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'red', marginLeft: -6}}>Shop</Text>
        </>
      );
    } else {
      shopBtn = (
        <>
          <Image
            source={require('../assets/icons/shop.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'gray', marginLeft: -6}}>Shop</Text>
        </>
      );
    }
    if (this.props.profile) {
      profileBtn = (
        <>
          <Image
            source={require('../assets/icons/accountAct.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'red', marginLeft: -6}}>Profile</Text>
        </>
      );
    } else {
      profileBtn = (
        <>
          <Image
            source={require('../assets/icons/account.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{color: 'gray', marginLeft: -6}}>Profile</Text>
        </>
      );
    }
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#ededed',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <View style={{marginLeft: 20}}>{homeBtn}</View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              this.props.navigation.navigate('Shop');
            }}>
            <View style={{marginLeft: 20}}>{shopBtn}</View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              this.props.navigation.navigate('Cart');
            }}>
            <View style={{marginLeft: 20}}>{bagBtn}</View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              this.props.navigation.navigate('Profile');
            }}>
            <View style={{marginLeft: 20}}>{profileBtn}</View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
