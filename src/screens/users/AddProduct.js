import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Picker, ToastAndroid
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Textarea,
  Left,
  Body,
  Right,
} from 'native-base';
import {API_URL} from '@env';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {showNotification} from '../../services/LocalPushController';

const channel = 'notif';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_name: '',
      product_brand: '',
      product_category: 0,
      product_price: '',
      product_desc: '',
      product_img: [],
      product_condition: '',
      product_qty: '',
      taken_pic: {},
      user_id: 1,
    };
  }

  setCategory = (e) => {
    this.setState({
      product_category: e,
    });
  };

  setCondition = (e) => {
    this.setState({
      product_condition: e,
    });
  };

  chooseFile = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log(images.length);
        this.setState({product_img: images});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  takePicture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log(images.length);
        this.setState({taken_pic: images});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  postProduct = () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + this.props.auth.token,
        'Content-type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    data.append('product_name', this.state.product_name);
    data.append('product_brand', this.state.product_brand);
    data.append('product_category', this.state.product_category);
    data.append('product_price', this.state.product_price);
    data.append('product_desc', this.state.product_desc);
    data.append('product_qty', this.state.product_qty);
    data.append('product_condition', this.state.product_condition);
    data.append('user_id', this.state.user_id);
    if (Object.keys(this.state.taken_pic).length > 0) {
      data.append('product_img', {
        name: this.state.taken_pic.path.split('/').pop(),
        type: this.state.taken_pic.mime,
        uri:
          Platform.OS === 'android'
            ? this.state.taken_pic.path
            : this.state.taken_pic.path.replace('file://', ''),
      });
    }
    if (this.state.product_img[0]) {
      for (let i = 0; i < this.state.product_img.length; i++) {
        data.append('product_img', {
          name: this.state.product_img[i].path.split('/').pop(),
          type: this.state.product_img[i].mime,
          uri:
            Platform.OS === 'android'
              ? this.state.product_img[i].path
              : this.state.product_img[i].path.replace('file://', ''),
        });
      }
    }

    console.log(data);
    axios
      .post(API_URL + `products/`, data, config)
      .then((data) => {
        console.log(data.data);
        ToastAndroid.show("Add Product Success", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        showNotification('Notification', 'Sukses Tambah Produk', channel);
        this.props.navigation.navigate('ListProduct');
      })
      .catch((err) => {
        console.log('error disini');
        console.log(err);
      });
  };

  componentDidMount = () => {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //     axios.get(API_URL + `/address/get/${this.props.address.selectedAddress}`)
    //         .then(({ data }) => {
    //             this.setState({
    //                 address: data.data
    //             })
    //         }).catch(({ response }) => {
    //             console.log(response.data)
    //         })
    // })

    PushNotification.createChannel(
      {
        channelId: 'notif',
        channelName: 'My Notification channel',
        channelDescription: 'A channel to categories your notification',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createchannel returned '${created}'`),
    );
    // code to run on component mount

    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    });
  };

  render() {
    const {
      product_name,
      product_category,
      product_price,
      product_desc,
      product_img,
      product_brand,
      product_condition,
      product_qty,
    } = this.state;
    console.log(this.state);
    let prevImgFromCamera;
    if (Object.keys(this.state.taken_pic).length > 0) {
      prevImgFromCamera = (
        <>
          <Image source={{uri: taken_pic.path}} style={styles.imageStyle} />
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
              <Image source={require('./../../assets/icons/back.png')} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black', fontWeight: 'bold'}}>
              Add Product
            </Title>
          </Body>
        </Header>

        <Content>
          <ScrollView>
            {/* <View style={styles.rowTitle}>
                            <Text style={styles.textTitle}>Add Product</Text>
                        </View> */}
            <View>
              <Form>
                <Item floatingLabel>
                  <Label>Product Name</Label>
                  <Input
                    name="product_name"
                    value={product_name}
                    onChangeText={(text) => {
                      this.setState({product_name: text});
                    }}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Product Brand</Label>
                  <Input
                    name="product_brand"
                    value={product_brand}
                    onChangeText={(text) => {
                      this.setState({product_brand: text});
                    }}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Product QTY</Label>
                  <Input
                    name="product_qty"
                    value={product_qty}
                    onChangeText={(text) => {
                      this.setState({product_qty: text});
                    }}
                  />
                </Item>
                <View style={styles.size}>
                  <Picker
                    selectedValue={product_condition}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setCondition(itemValue)
                    }>
                    <Picker.Item
                      label="Condition"
                      value="0"
                      style={{color: 'gray'}}
                    />
                    <Picker.Item label="New" value="New" />
                    <Picker.Item label="Used" value="Used" />
                  </Picker>
                </View>

                <View style={styles.size}>
                  <Picker
                    selectedValue={product_category}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setCategory(itemValue)
                    }>
                    <Picker.Item
                      label="Category"
                      value="0"
                      style={{color: 'gray'}}
                    />
                    <Picker.Item label="T-shirt" value="1" />
                    <Picker.Item label="Short" value="2" />
                    <Picker.Item label="Jacket" value="3" />
                    <Picker.Item label="Pants" value="4" />
                    <Picker.Item label="Shoes" value="5" />
                  </Picker>
                </View>
                <Item floatingLabel>
                  <Label>Price</Label>
                  <Input
                    name="product_price"
                    value={product_price}
                    onChangeText={(text) => {
                      this.setState({product_price: text});
                    }}
                  />
                </Item>
                <Item floatingLabel>
                <Label>Description</Label>
                  <Input
                  placeholder="Description"
                  name="description"
                  value={product_desc}
                  onChangeText={(text) => {
                    this.setState({product_desc: text});
                  }}
                />
                 </Item>

                <View>
                  {product_img &&
                    product_img.map((item) => {
                      return (
                        <Image
                          key={product_img.indexOf(item)}
                          source={{
                            uri: product_img.length !== 0 ? item.path : '',
                          }}
                          style={styles.imageStyle}
                        />
                      );
                    })}
                  {prevImgFromCamera}
                </View>

                {/* <View style={{ flexDirection: 'row' }}>

                                    <Image

                                        source={{ uri: this.state.taken_pic.path }}
                                        style={styles.imageStyle}
                                    />

                                </View> */}

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.btnSection}
                  onPress={this.chooseFile}>
                  <Text style={styles.btnText}>Choose Image</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.btnSection}
                  onPress={this.takePicture}>
                  <Text style={styles.btnText}>Take Picture</Text>
                </TouchableOpacity>
              </Form>

              
            </View>
          </ScrollView>
        </Content>
        <Button
                danger
                full
                rounded
                onPress={this.postProduct}>
                <Text style={{color: '#fff'}}> SUBMIT </Text>
              </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(AddProduct);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  rowTitle: {
    marginTop: 14,
    marginLeft: 5,
  },
  textTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  btnSection: {
    marginTop: 20,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  size: {
    width: '100%',
    height: 40,
    // paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#9B9B9B',
    paddingHorizontal: 5,
    paddingBottom: 15,
  },
  imageStyle: {
    width: 200,
    height: 200,
    width: 100,
    height: 100,
    margin: 5,
    // borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
});
