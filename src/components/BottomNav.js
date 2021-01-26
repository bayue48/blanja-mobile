import React, {Component} from 'react';
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
              this.props.navigation.navigate('MyBag');
            }}>
            <View style={{marginLeft: 20}}>{bagBtn}</View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/icons/fav.png')}
                style={{width: 24, height: 24}}
              />
              <Text style={{color: 'gray', marginLeft: -13}}>Favourite</Text>
            </View>
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

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// // import TabItem from './TabItem';
// import {
//     IconHomeAct,
//     IconHome,
//     IconShopAct,
//     IconShop,
//     IconBagAct,
//     IconBag,
//     IconFavoriteAct,
//     IconFavorite,
//     IconProfileAct,
//     IconProfile,
// } from '../assets/index';

// const BottomNavigator = ({ state, descriptors, navigation }) => {
//     const focusedOptions = descriptors[state.routes[state.index].key].options;

//     if (focusedOptions.tabBarVisible === false) {
//         return null;
//     }

//     const Icon = () => {
//         if (label === 'Home') return isFocused ? <IconHomeAct /> : <IconHome />;
//         if (label === 'Shop') return isFocused ? <IconShopAct /> : <IconShop />;
//         if (label === 'Bag') return isFocused ? <IconBagAct /> : <IconBag />;
//         if (label === 'Favorites') return isFocused ? <IconFavoriteAct /> : <IconFavorite />;
//         if (label === 'Profile') return isFocused ? <IconProfileAct /> : <IconProfile />;
//         return <IconHome />;
//     };

//     return (
//         <View style={styles.container}>
//             {state.routes.map((route, index) => {
//                 const { options } = descriptors[route.key];
//                 const label =
//                     options.tabBarLabel !== undefined
//                         ? options.tabBarLabel
//                         : options.title !== undefined
//                             ? options.title
//                             : route.name;

//                 const isFocused = state.index === index;

//                 const onPress = () => {
//                     const event = navigation.emit({
//                         type: 'tabPress',
//                         target: route.key,
//                         canPreventDefault: true,
//                     });

//                     if (!isFocused && !event.defaultPrevented) {
//                         navigation.navigate(route.name);
//                     }
//                 };

//                 const onLongPress = () => {
//                     navigation.emit({
//                         type: 'tabLongPress',
//                         target: route.key,
//                     });
//                 };

//                 return (
//                     <TouchableOpacity
//                         onPress={onPress}
//                         onLongPress={onLongPress}
//                         style={styles.container}>
//                         <Icon />
//                         <Text>{label}</Text>
//                     </TouchableOpacity>
//                 );
//             })}
//         </View>
//     );
// };

// export default BottomNavigator;

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         backgroundColor: '#FFFFFF',
//         justifyContent: 'space-between',
//         paddingHorizontal: 20,
//         paddingVertical: 14,
//     },
// });
