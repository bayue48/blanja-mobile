import React from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Bell from './../components/notification';

const Banner = ({navigation}) => {
  const login = useSelector((state) => state.auth.isLogin);
  return (
    <>
      <View style={{height: 180}}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./../assets/Banner.png')}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              marginLeft: 10,
              marginBottom: 15,
            }}>
            <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>
              Street Clothes
            </Text>
          </View>

          {login ? <Bell navigation={navigation} /> : <></>}
        </ImageBackground>
      </View>
    </>
  );
};

export default Banner;
