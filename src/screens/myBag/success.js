import React, {Component} from 'react';
import {Container, Content, Button, Text, View} from 'native-base';
import {Image} from 'react-native';

import {setEmptyBag} from './../../utils/redux/ActionCreators/bag';
import {connect} from 'react-redux';

class SuccesPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (this.props.dispatch(setEmptyBag())) {
      console.log('bag kosong');
    }
  };
  render() {
    return (
      <Container>
        <Content style={{backgroundColor: '#f0f0f0', margin: 10}}>
          <View style={{marginTop: '50%', alignItems: 'center'}}>
            <Image source={require('./../../assets/bags.png')} />
            <Text style={{fontWeight: '700', fontSize: 40, marginBottom: 10}}>
              Success!
            </Text>
            <Text>Your order will be delivered soon</Text>
            <Text>Thanks for using Blanja!</Text>
          </View>
          <Button
            full
            rounded
            danger
            style={{marginTop: 160}}
            onPress={() => {
              this.props.navigation.replace('Tab');
            }}>
            <Text>Continue Shopping</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({auth, bag}) => {
  return {
    auth,
    bag,
  };
};

export default connect(mapStateToProps)(SuccesPage);
