import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const SizeItem = ({size, changeSize}) => {
  return (
    <TouchableHighlight
      style={{
        ...styles.openButton,
        backgroundColor: '#DB3022',
        marginBottom: 10,
      }}
      onPress={() => changeSize(size)}>
      <View>
        <Text style={styles.textStyle}>{size}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SizeItem;

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
