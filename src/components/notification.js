import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const Bell = ({navigation}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notification');
        }}
        style={{position: 'absolute', right: 20, top: 40}}>
        <Image source={require('./../assets/bell.png')} />
      </TouchableOpacity>
    </>
  );
};
export default Bell;
