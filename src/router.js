import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/Home';
import Profile from './screens/users/Profile';
import Login from './screens/auths/login';
import Signup from './screens/auths/signup';
import Forgot from './screens/auths/forgot';
import Otp from './screens/auths/otp';
import ResetPassword from './screens/auths/reset_password';
import Shop from './screens/Shop';
import Category from './screens/Category';
import DetailPage from './screens/DetailPage';
import Bag from './screens/cart/MyBag';
import Checkout from './screens/cart/Checkout';
import Success from './screens/cart/Success';
import Order from './screens/users/MyOrder';
import Shipping from './screens/users/ShippingAdress';
import Setting from './screens/users/Settings';
import ChangeAddress from './screens/users/ChangeAddress';
import AddAddress from './screens/users/AddAddress';
import DetailOrders from './screens/users/DetailOrder';
import Filter from './screens/Filter';
import Notification from './screens/Notification';
import UserStore from './screens/users/UserStore';
import ListProduct from './screens/users/ListProduct';
import AddProduct from './screens/users/AddProduct';
import EditProduct from './screens/users/EditProduct';
import Search from './screens/Search';
import Review from './screens/users/ProductReview';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      headerMode="none"
      sceneContainerStyle={{borderWidth: 0}}
      barStyle={{borderTopLeftRadius: 20}}
      tabBarOptions={{
        activeTintColor: '#DB3022',
        style: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="home" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopPage}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="shopping-cart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MyBag"
        component={MyBag}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="shopping-bag" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Login}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="heart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MainProfile}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="user-circle-o" size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ShopPage = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Filter" component={Filter} />
    </Stack.Navigator>
  );
};

const MyBag = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MyBag" component={Bag} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

const MainProfile = () => {
  return (
    <Stack.Navigator initialRouteName="MainProfile" headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Orders" component={Order} />
      <Stack.Screen name="Store" component={UserStore} />
      <Stack.Screen name="ListProduct" component={ListProduct} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="DetailsOrders" component={DetailOrders} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Shipping" component={Shipping} />
      <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

const appRouter = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <>
      {/* <NavigationContainer> */}
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Tab" component={MyTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </>
  );
};

export default appRouter;
