import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Picker,
  Modal,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Textarea,
  Left,
  Body,
} from 'native-base';
import {BASE_URL} from '@env';
import {setLoginfalse} from './../../../utils/redux/ActionCreators/auth';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_name: '',
      product_category: '',
      product_color: '',
      product_size: '',
      product_condition: '',
      product_price: '',
      product_qty: '',
      product_desc: '',
      product_img: [],
      taken_pic: {},
      photoFromDB: '',
      isSetImage: false,
      modalVisible: false,
    };
  }

  setCategory = (e) => {
    this.setState({
      product_category: e,
    });
  };

  setColor = (e) => {
    this.setState({
      product_color: e,
    });
  };

  setSize = (e) => {
    this.setState({
      product_size: e,
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
        this.setState({
          product_img: images,
          isSetImage: true,
        });
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
        this.setState({
          taken_pic: images,
          isSetImage: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUpdateData = () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + this.props.auth.token,
      },
    };
    axios
      .get(
        BASE_URL + '/product/getProductData/' + this.props.route.params.itemId,
        config,
      )
      .then(({data}) => {
        // console.log(data.data)
        this.setState({
          product_name: data.data[0].product_name,
          product_category: '' + data.data[0].product_category,
          product_color: '' + data.data[0].product_color,
          product_size: '' + data.data[0].product_size,
          product_condition: '' + data.data[0].product_condition,
          product_price: '' + data.data[0].product_price,
          product_qty: '' + data.data[0].product_qty,
          product_desc: data.data[0].product_desc,
          photoFromDB: data.data[0].product_img,
        });
      })
      .catch(({response}) => {
        console.log(response.data);
      });
  };

  componentDidMount = () => {
    this.getUpdateData();
  };

  postProduct = () => {
    this.setState({
      modalVisible: true,
    });
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + this.props.auth.token,
        'Content-type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    data.append('product_name', this.state.product_name);
    data.append('product_category', this.state.product_category);
    data.append('product_color', this.state.product_color);
    data.append('product_size', this.state.product_size);
    data.append('product_condition', this.state.product_condition);
    data.append('product_price', this.state.product_price);
    data.append('product_qty', this.state.product_qty);
    data.append('product_desc', this.state.product_desc);
    data.append('user_id', this.props.auth.id);
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
      .patch(
        BASE_URL + `/product/updateProduct/` + this.props.route.params.itemId,
        data,
        config,
      )
      .then((data) => {
        console.log(data.data);
        this.setState({
          modalVisible: false,
        });
        this.props.navigation.replace('ListProduct');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          ToastAndroid.show(
            'Invalid Session',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          if (this.props.dispatch(setLoginfalse())) {
            this.props.navigation.replace('Login');
          }
        }
        console.log(err.response.data);
      });
  };

  render() {
    const {
      product_name,
      product_category,
      product_color,
      product_size,
      product_condition,
      product_price,
      product_qty,
      product_desc,
      product_img,
      taken_pic,
      isSetImage,
    } = this.state;
    console.log(this.state);
    let thumbPhoto;
    let {photoFromDB} = this.state;
    photoFromDB = photoFromDB.split(',');
    if (!isSetImage) {
      thumbPhoto = (
        <>
          {photoFromDB &&
            photoFromDB.map((items) => (
              <>
                <Image
                  source={{uri: BASE_URL + items}}
                  style={styles.imageStyle}
                />
              </>
            ))}
        </>
      );
    }
    let prevImgFromCamera;
    if (Object.keys(this.state.taken_pic).length > 0) {
      prevImgFromCamera = (
        <>
          <Image source={{uri: taken_pic.path}} style={styles.imageStyle} />
        </>
      );
    }
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
                <Image source={require('./../../../assets/back.png')} />
              </Button>
            </Left>
            <Body>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                Edit Product
              </Text>
            </Body>
          </Header>
          <Content style={{marginRight: 15, backgroundColor: 'white'}}>
            <ScrollView style={{height: 550, backgroundColor: 'white'}}>
              <View>
                <Form>
                  <KeyboardAvoidingView style={{marginLeft: 10}}>
                    <Label style={{fontWeight: 'bold'}}>Product Name</Label>
                    <Item regular>
                      <Input
                        name="product_name"
                        value={product_name}
                        onChangeText={(text) => {
                          this.setState({product_name: text});
                        }}
                      />
                    </Item>
                  </KeyboardAvoidingView>
                  <Label style={{fontWeight: 'bold', marginLeft: 10}}>
                    Category
                  </Label>
                  <View style={styles.size}>
                    <Picker
                      selectedValue={product_category}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setCategory(itemValue)
                      }>
                      <Picker.Item
                        label="select--"
                        value="0"
                        style={{backgroundColor: 'gray'}}
                      />
                      <Picker.Item label="T-shirt" value="1" />
                      <Picker.Item label="Short" value="2" />
                      <Picker.Item label="Jacket" value="3" />
                      <Picker.Item label="Pants" value="4" />
                      <Picker.Item label="Shoes" value="5" />
                    </Picker>
                  </View>
                  <Label style={{fontWeight: 'bold', marginLeft: 10}}>
                    Color
                  </Label>
                  <View style={styles.size}>
                    <Picker
                      selectedValue={product_color}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setColor(itemValue)
                      }>
                      <Picker.Item
                        label="select--"
                        value="0"
                        style={{backgroundColor: 'gray'}}
                      />
                      <Picker.Item label="Black" value="1" />
                      <Picker.Item label="White" value="2" />
                      <Picker.Item label="Red" value="3" />
                      <Picker.Item label="Green" value="4" />
                      <Picker.Item label="Blue" value="5" />
                    </Picker>
                  </View>
                  <Label style={{fontWeight: 'bold', marginLeft: 10}}>
                    Size
                  </Label>
                  <View style={styles.size}>
                    <Picker
                      selectedValue={product_size}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setSize(itemValue)
                      }>
                      <Picker.Item
                        label="select--"
                        value="0"
                        style={{backgroundColor: 'gray'}}
                      />
                      <Picker.Item label="XS" value="1" />
                      <Picker.Item label="S" value="2" />
                      <Picker.Item label="M" value="3" />
                      <Picker.Item label="L" value="4" />
                      <Picker.Item label="XL" value="5" />
                      <Picker.Item label="38" value="6" />
                      <Picker.Item label="39" value="7" />
                      <Picker.Item label="40" value="8" />
                      <Picker.Item label="41" value="9" />
                      <Picker.Item label="42" value="10" />
                      <Picker.Item label="43" value="11" />
                      <Picker.Item label="44" value="12" />
                    </Picker>
                  </View>
                  <Label style={{fontWeight: 'bold', marginLeft: 10}}>
                    Condition
                  </Label>
                  <View style={styles.size}>
                    <Picker
                      selectedValue={product_condition}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setCondition(itemValue)
                      }>
                      <Picker.Item
                        label="select--"
                        value="0"
                        style={{backgroundColor: 'gray'}}
                      />
                      <Picker.Item label="New" value="New" />
                      <Picker.Item label="Second" value="Second" />
                    </Picker>
                  </View>
                  <KeyboardAvoidingView style={{marginLeft: 10}}>
                    <Label style={{fontWeight: 'bold'}}>Price</Label>
                    <Item regular>
                      <Input
                        name="price"
                        value={product_price}
                        onChangeText={(text) => {
                          this.setState({product_price: text});
                        }}
                      />
                    </Item>
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView style={{marginLeft: 10}}>
                    <Label style={{fontWeight: 'bold'}}>Quantity</Label>
                    <Item regular>
                      <Input
                        name="qty"
                        value={product_qty}
                        onChangeText={(text) => {
                          this.setState({product_qty: text});
                        }}
                      />
                    </Item>
                  </KeyboardAvoidingView>
                  <View style={{marginLeft: 10}}>
                    <Label style={{fontWeight: 'bold'}}>
                      Product Description
                    </Label>
                    <Textarea
                      rowSpan={5}
                      bordered
                      placeholder="Description"
                      name="description"
                      value={product_desc}
                      onChangeText={(text) => {
                        this.setState({product_desc: text});
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
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
                      {thumbPhoto}
                    </View>
                    <View style={{marginTop: 15}}>
                      <Label style={{fontWeight: 'bold'}}>
                        Product picture
                      </Label>
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
                    </View>
                  </View>
                </Form>
              </View>
            </ScrollView>
            <Button
              danger
              full
              rounded
              onPress={this.postProduct}
              style={{marginLeft: 15}}>
              <Text style={{color: '#fff'}}> SUBMIT </Text>
            </Button>
          </Content>
        </Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Please Wait</Text>
            </View>
          </View>
        </Modal>
      </>
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
  textTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  btnSection: {
    width: '100%',
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  size: {
    width: '97%',
    height: 40,
    // paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 0.4,
    paddingHorizontal: 5,
    paddingBottom: 50,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 200,
    height: 200,
    width: 100,
    height: 100,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: 50,
    width: 200,
    borderWidth: 4,
    borderColor: '#20232a',
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
