import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Body,
  Left,
  Right,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconBack} from '../../assets';
import {API_URL} from '@env';
import axios from 'axios';

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    store: '',
    errorForm: '',
    btnState: false,
  };

  signup = () => {
    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.password === ''
    ) {
      this.setState({
        errorForm: 'Semua kolom harus diisi',
      });
    } else {
      let datas = {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
      };
      if (this.state.btnState) {
        data = {
          ...datas,
          level_id: 1,
          store: this.state.store,
        };
      } else {
        data = {
          ...datas,
          level_id: 2,
          store: '',
        };
      }
      console.log(data);
      axios
        .post(API_URL + 'auth/register', data)
        .then(({data}) => {
          this.setState({
            errorForm: '',
          });
          console.log(data);
          alert('Register Berhasil');
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error.response.data.msg);
          alert(error.response.data.msg);
        });
    }
  };

  render() {
    let {email, name, password, btnState, store} = this.state;
    console.log(this.state);
    let btnText;
    let formState;
    if (!btnState) {
      btnText = <Text style={{color: '#d9534f'}}> Customer </Text>;
      formState = (
        <>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              name="name"
              value={name}
              onChangeText={(text) => {
                this.setState({name: text});
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              name="email"
              value={email}
              onChangeText={(text) => {
                this.setState({email: text});
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              name="password"
              value={password}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
              secureTextEntry={true}
            />
          </Item>
        </>
      );
    } else {
      btnText = <Text style={{color: '#d9534f'}}> Seller </Text>;
      formState = (
        <>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              name="fullname"
              value={name}
              onChangeText={(text) => {
                this.setState({name: text});
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              name="email"
              value={email}
              onChangeText={(text) => {
                this.setState({email: text});
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Store Name</Label>
            <Input
              name="store"
              value={store}
              onChangeText={(text) => {
                this.setState({store: text});
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              name="password"
              value={password}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
              secureTextEntry={true}
            />
          </Item>
        </>
      );
    }
    return (
      <Container style={styles.container}>
        <Header transparent>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={IconBack} />
            </Button>
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>

        <Content>
          <View style={styles.rowTitle}>
            <Text style={styles.textTitle}>Register</Text>
          </View>
          <View style={styles.btnWrap}>
            <Button
              bordered
              danger
              full
              style={styles.btnSelector}
              onPress={() => {
                this.setState({btnState: !btnState});
              }}>
              {btnText}
            </Button>
          </View>
          <View style={{marginTop: 15}}>
            {formState}

            <TouchableOpacity
              style={{flexDirection: 'row-reverse'}}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text> Already have an account?</Text>
            </TouchableOpacity>
            <Button
              danger
              full
              rounded
              style={{marginTop: 15}}
              onPress={this.signup}>
              <Text style={{color: '#fff'}}> REGISTER </Text>
            </Button>
            <Text
              style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>
              {this.state.errorForm}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  rowTitle: {
    marginTop: 5,
  },
  textTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  btnWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  btnSelector: {
    width: 100,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
});
