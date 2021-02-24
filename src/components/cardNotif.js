import React, {Component} from 'react';
import {Card, CardItem, Text, Body} from 'native-base';
import {vw, vh} from 'react-native-expo-viewport-units';

export default class CardHeaderFooterExample extends Component {
  render() {
    const {title, content} = this.props;
    return (
      <>
        <Card style={{marginLeft: vw(2), width: vw(96), marginBottom: vh(1)}}>
          <CardItem>
            <Body>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
              <Text>{content}</Text>
            </Body>
          </CardItem>
        </Card>
      </>
    );
  }
}
