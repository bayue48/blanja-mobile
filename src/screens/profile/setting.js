import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Text,
  Item,
  Label,
  Input,
  CheckBox,
  Form,
} from 'native-base';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ToastAndroid,
} from 'react-native';
import {vw} from 'react-native-expo-viewport-units';
import {BASE_URL} from '@env';
import {connect} from 'react-redux';
import axios from 'axios';

class Setting extends React.Component {
  state = {
    isChecked: true,
    modalTrackingVisible: false,
    old_password: '',
    new_password: '',
    conf_password: '',
  };

  setModalVisible = (e) => {
    this.setState({
      modalTrackingVisible: e,
    });
  };

  changePassword = () => {
    if (
      this.state.old_password.length < 8 ||
      this.state.new_password.length < 8 ||
      this.state.conf_password.length < 8
    ) {
      ToastAndroid.show(
        'Min 8 character',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      if (this.state.new_password !== this.state.conf_password) {
        ToastAndroid.show(
          'Password must same ',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        const updateData = {
          old_password: this.state.old_password,
          new_password: this.state.new_password,
        };
        const config = {
          headers: {
            'x-access-token': 'Bearer ' + this.props.auth.token,
          },
        };
        axios
          .patch(BASE_URL + '/user/changePassword', updateData, config)
          .then(({data}) => {
            ToastAndroid.show(
              data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.setState({
              modalTrackingVisible: 'false',
            });
          })
          .catch(({response}) => {
            console.log(response.data);
            if (response.data.status === 401) {
              Alert.alert('Failed', 'Wrong Password', [
                {text: 'OK', style: 'cancel'},
              ]);
            }
          });
      }
    }
  };

  render() {
    const {
      modalTrackingVisible,
      old_password,
      new_password,
      conf_password,
    } = this.state;
    return (
      <>
        <Container>
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image source={require('./../../assets/back.png')} />
              </Button>
            </Left>
            <Body>
              <Title
                style={{color: 'black', marginLeft: 35, fontWeight: 'bold'}}>
                Setting
              </Title>
            </Body>
          </Header>
          <Content style={{backgroundColor: '#f0f0f0'}}>
            <View style={{marginLeft: 15, marginRight: 10}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 42,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                Setting
              </Text>
              <Text style={{fontWeight: 'bold'}}>Personal Information</Text>
              <Item
                floatingLabel
                style={{
                  backgroundColor: 'white',
                  marginTop: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                <Label style={{marginLeft: 10}}>Name</Label>
                <Input style={{marginLeft: 10}} value={this.props.auth.name} />
              </Item>
              <Item
                floatingLabel
                style={{
                  backgroundColor: 'white',
                  marginTop: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                <Label style={{marginLeft: 10}}>Date of Birth</Label>
                <Input style={{marginLeft: 10}} value="24/04/1999" />
              </Item>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                  marginBottom: 5,
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: 'bold'}}>Password</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                  <Text style={{fontWeight: 'bold', color: 'gray'}}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
              <Item
                floatingLabel
                style={{
                  backgroundColor: 'white',
                  marginTop: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                <Label style={{marginLeft: 10}}>Password</Label>
                <Input
                  style={{marginLeft: 10}}
                  secureTextEntry={true}
                  value="Password"
                />
              </Item>
              <Text
                style={{fontWeight: 'bold', marginTop: 30, marginBottom: 5}}>
                Notification
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 10,
                }}>
                <Text style={{marginTop: 10}}>Sales</Text>
                <CheckBox
                  style={{marginEnd: 10}}
                  checked={this.state.isChecked}
                  color="blue"
                  onPress={() => {
                    this.setState({isChecked: !this.state.isChecked});
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 10,
                }}>
                <Text style={{marginTop: 10}}>New Arrivals</Text>
                <CheckBox style={{marginEnd: 10}} color="green" />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 10,
                }}>
                <Text style={{marginTop: 10}}>Change Status Delivery</Text>
                <CheckBox style={{marginEnd: 10}} color="green" />
              </View>
            </View>
          </Content>
        </Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTrackingVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Form>
                <Item floatingLabel>
                  <Label>Old Password</Label>
                  <Input
                    name="oldPassword"
                    secureTextEntry={true}
                    value={old_password}
                    onChangeText={(text) => {
                      this.setState({old_password: text});
                    }}
                    placeholder="Old Password"
                  />
                </Item>
                <Item floatingLabel>
                  <Label>New Password</Label>
                  <Input
                    name="newPassword"
                    secureTextEntry={true}
                    value={new_password}
                    onChangeText={(text) => {
                      this.setState({new_password: text});
                    }}
                    placeholder="New Password"
                  />
                </Item>
                <Item floatingLabel>
                  <Label>New Password</Label>
                  <Input
                    name="confPassword"
                    secureTextEntry={true}
                    value={conf_password}
                    onChangeText={(text) => {
                      this.setState({conf_password: text});
                    }}
                    placeholder="New Password"
                  />
                </Item>
              </Form>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 30,
                }}>
                <Button
                  full
                  rounded
                  bordered
                  style={styles.btnTracking}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text style={{color: 'black'}}>Cancel</Text>
                </Button>
                <Button
                  full
                  rounded
                  danger
                  style={styles.btnTracking}
                  onPress={this.changePassword}>
                  <Text style={{color: 'white'}}>Change</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({auth, bag}) => {
  return {
    auth,
    bag,
  };
};

export default connect(mapStateToProps)(Setting);

const styles = StyleSheet.create({
  btn: {
    width: 150,
  },
  btnTracking: {
    width: 130,
    marginHorizontal: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    height: 320,
    width: vw(100),
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
