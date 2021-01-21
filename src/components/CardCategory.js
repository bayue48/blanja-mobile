import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem } from "native-base";
import {REACT_APP_BASE_URL} from "@env"

class CardCategory extends Component {
    render() {
        return (
            <>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('DetailPage') }}
                >
                    <Card style={{ height: 270, marginRight: 10, width:160 }}>
                        <CardItem cardBody>
                            <View >
                                <Image source={require('./../assets/images/image.png')} style={{width:160}} />
                                <Image source={require('./../assets/icons/5stars.png')} style={{ marginTop: 5 }} />
                                <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                            </View>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </>
        );
    }
}

export default CardCategory;