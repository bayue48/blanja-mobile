import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Title,
  Body,
  Right,
  Left,
} from 'native-base';
import {IconBack} from '../../assets';
import {
  setLogintrue,
  setName,
  setEmail,
  setId,
  setToken,
  setLevelUser,
} from './../../utils/redux/ActionCreators/auth';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';

class Login extends React.Component {
  state = {
    isLogin: false,
    email: '',
    password: '',
    errorForm: '',
  };

  Login = () => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        errorForm: 'Semua kolom harus diisi!',
      });
    } else {
      const data = {
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post(API_URL + 'auth/login', data)
        .then(({data}) => {
          console.log(data.data);
          this.setState({
            errorForm: '',
          });

          this.props.dispatch(setLogintrue());
          this.props.dispatch(setName(data.name));
          this.props.dispatch(setEmail(data.email));
          this.props.dispatch(setId(data.id));
          this.props.dispatch(setToken(data.tokenId));
          this.props.dispatch(setLevelUser(data.level_id));
          this.props.navigation.navigate('Home');
        })
        .catch(({response}) => {
          console.log(response.data);
          alert(response.data.msg);
        });
    }
  };

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.props.auth.isLogin) {
        this.props.navigation.navigate('Home');
      }
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const {email, password} = this.state;
    const {auth} = this.props;
    // console.log(auth)
    return (
      <Container style={styles.container}>
        <Header transparent>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <Image source={IconBack} />
            </Button>
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <View style={styles.rowTitle}>
          <Text style={styles.textTitle}>Login</Text>
        </View>
        <View style={{marginTop: 73}}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              placeholder="Regular Textbox"
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
              placeholder="Regular Textbox"
              name="password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
            />
          </Item>
          <TouchableOpacity
            style={{flexDirection: 'row-reverse'}}
            onPress={() => {
              this.props.navigation.navigate('Forgot');
            }}>
            <Text> Forgot your password?</Text>
          </TouchableOpacity>
          <Button
            danger
            full
            rounded
            style={{marginTop: 15}}
            onPress={this.Login}>
            <Text style={{color: '#fff'}}> LOGIN </Text>
          </Button>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}>
            <Text>Dont have an account? Register Here</Text>
          </TouchableOpacity>
          <Text style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>
            {this.state.errorForm}
          </Text>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Login);

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
});
