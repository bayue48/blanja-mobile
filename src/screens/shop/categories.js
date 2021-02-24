import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Card from '../../components/cardHome';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Right,
  CheckBox,
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import {vw, vh} from 'react-native-expo-viewport-units';
import axios from 'axios';
import {BASE_URL} from '@env';

class ShopCategory extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    products: [],
    pageInfo: [],
    modalVisible: false,
    modalSortVisible: false,
    isRed: false,
    isGreen: false,
    isBlue: false,
    isBlack: false,
    isWhite: false,
    color: 0,
    sizeSelected: 0,
    catSelected: 0,
    selectedBrand: 0,
    axiosData: '',
    itemNotFound: '',
    sortName: '',
  };

  checkedRed = () => {
    this.setState({
      isRed: !this.state.isRed,
      isGreen: false,
      isBlue: false,
      isBlack: false,
      isWhite: false,
    });
    if (this.state.color === 3) {
      this.setState({
        color: 0,
      });
    } else {
      this.setState({
        color: 3,
      });
    }
  };

  checkedGreen = () => {
    this.setState({
      isRed: false,
      isGreen: !this.state.isGreen,
      isBlue: false,
      isBlack: false,
      isWhite: false,
    });
    if (this.state.color === 4) {
      this.setState({
        color: 0,
      });
    } else {
      this.setState({
        color: 4,
      });
    }
  };

  checkedBlue = () => {
    this.setState({
      isRed: false,
      isGreen: false,
      isBlue: !this.state.isBlue,
      isBlack: false,
      isWhite: false,
    });
    if (this.state.color === 5) {
      this.setState({
        color: 0,
      });
    } else {
      this.setState({
        color: 5,
      });
    }
  };

  checkedBlack = () => {
    this.setState({
      isRed: false,
      isGreen: false,
      isBlue: false,
      isBlack: !this.state.isBlack,
      isWhite: false,
    });
    if (this.state.color === 1) {
      this.setState({
        color: 0,
      });
    } else {
      this.setState({
        color: 1,
      });
    }
  };

  checkedWhite = () => {
    this.setState({
      isRed: false,
      isGreen: false,
      isBlue: false,
      isBlack: false,
      isWhite: !this.state.isWhite,
    });
    if (this.state.color === 2) {
      this.setState({
        color: 0,
      });
    } else {
      this.setState({
        color: 2,
      });
    }
  };

  setSelectedValue = (e) => {
    this.setState({
      selectedBrand: e,
    });
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  setModalSortVisible = (visible) => {
    this.setState({modalSortVisible: visible});
  };

  Discard = () => {
    this.setState({
      isRed: false,
      isGreen: false,
      isBlue: false,
      isBlack: false,
      isWhite: false,
      color: 0,
      sizeSelected: 0,
      catSelected: 0,
      selectedBrand: 0,
      modalVisible: false,
      baseUrl: '',
    });
  };

  Apply = () => {
    let axiosData = '';
    if (this.state.color !== 0) {
      axiosData += `color=${this.state.color}&`;
    }
    if (this.state.sizeSelected !== 0) {
      axiosData += `size=${this.state.sizeSelected}&`;
    }
    if (this.state.catSelected !== 0) {
      axiosData += `category=${this.state.catSelected}&`;
    }
    this.setState({
      axiosData: axiosData,
    });
    let modifiedUrl = '';
    if (this.state.baseUrl !== '/products?') {
      modifiedUrl = '&';
    }
    axios
      .get(BASE_URL + `${this.state.baseUrl}${modifiedUrl}` + axiosData)
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          modalVisible: false,
          itemNotFound: ``,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({
          products: [],
          modalVisible: false,
          itemNotFound: `No Product.`,
        });
      });
  };

  nextPage = () => {
    const nextPage = this.state.pageInfo.nextpage;
    if (nextPage !== null) {
      axios
        .get(BASE_URL + nextPage)
        .then(({data}) => {
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  prevPage = () => {
    const prevPage = this.state.pageInfo.previousPage;
    if (prevPage !== null) {
      axios
        .get(BASE_URL + prevPage)
        .then(({data}) => {
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  refresh = () => {
    axios
      .get(BASE_URL + this.state.baseUrl)
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          itemNotFound: '',
          sortName: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    if (this.props.route.params.categoryType === 'new') {
      axios
        .get(BASE_URL + '/products')
        .then(({data}) => {
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
            baseUrl: '/products?',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(
          BASE_URL +
            '/products?category=' +
            this.props.route.params.categoryType,
        )
        .then(({data}) => {
          // console.log(data)
          this.setState({
            products: data.data.products,
            pageInfo: data.data.pageInfo,
            baseUrl:
              '/products?category=' + this.props.route.params.categoryType,
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  nameAsc = () => {
    let modifiedUrl = '';
    if (this.state.baseUrl !== '/products?') {
      modifiedUrl = '&';
    }
    this.setModalSortVisible(false);
    axios
      .get(
        BASE_URL +
          this.state.baseUrl +
          modifiedUrl +
          'sortBy=product_name&orderBy=asc',
      )
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          sortName: 'Name A-Z',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  nameDesc = () => {
    let modifiedUrl = '';
    if (this.state.baseUrl !== '/products?') {
      modifiedUrl = '&';
    }
    this.setModalSortVisible(false);
    axios
      .get(
        BASE_URL +
          this.state.baseUrl +
          modifiedUrl +
          'sortBy=product_name&orderBy=desc',
      )
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          sortName: 'Name Z-A',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  priceAsc = () => {
    let modifiedUrl = '';
    if (this.state.baseUrl !== '/products?') {
      modifiedUrl = '&';
    }
    this.setModalSortVisible(false);
    axios
      .get(
        BASE_URL +
          this.state.baseUrl +
          modifiedUrl +
          'sortBy=product_price&orderBy=asc',
      )
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          sortName: 'Price low to high',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  priceDesc = () => {
    let modifiedUrl = '';
    if (this.state.baseUrl !== '/products?') {
      modifiedUrl = '&';
    }
    this.setModalSortVisible(false);
    axios
      .get(
        BASE_URL +
          this.state.baseUrl +
          modifiedUrl +
          'sortBy=product_price&orderBy=desc',
      )
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          sortName: 'Price high to low',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  rating = () => {
    let modifiedUrl = '';
    if (this.state.baseUrl !== '/products?') {
      modifiedUrl = '&';
    }
    this.setModalSortVisible(false);
    axios
      .get(
        BASE_URL +
          this.state.baseUrl +
          modifiedUrl +
          'sortBy=rating&orderBy=desc',
      )
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          sortName: 'Rating high to low',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  newest = () => {
    let modifiedUrl = '';
    if (this.state.baseUrl !== '/products?') {
      modifiedUrl = '&';
    }
    this.setModalSortVisible(false);
    axios
      .get(
        BASE_URL +
          this.state.baseUrl +
          modifiedUrl +
          'sortBy=created_at&orderBy=asc',
      )
      .then(({data}) => {
        this.setState({
          products: data.data.products,
          pageInfo: data.data.pageInfo,
          sortName: 'Newest',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalSortVisible: false,
    });
  };
  render() {
    const {
      products,
      pageInfo,
      modalVisible,
      modalSortVisible,
      itemNotFound,
    } = this.state;
    let sizeXS = (
      <Button
        bordered
        danger
        small
        onPress={() => {
          this.setState({sizeSelected: 1});
        }}
        style={styles.btnSize}>
        <Text>XS</Text>
      </Button>
    );
    let sizeS = (
      <Button
        bordered
        danger
        small
        onPress={() => {
          this.setState({sizeSelected: 2});
        }}
        style={styles.btnSize}>
        <Text>S</Text>
      </Button>
    );
    let sizeM = (
      <Button
        bordered
        danger
        small
        onPress={() => {
          this.setState({sizeSelected: 3});
        }}
        style={styles.btnSize}>
        <Text>M</Text>
      </Button>
    );
    let sizeL = (
      <Button
        bordered
        danger
        small
        onPress={() => {
          this.setState({sizeSelected: 4});
        }}
        style={styles.btnSize}>
        <Text>L</Text>
      </Button>
    );
    let sizeXL = (
      <Button
        bordered
        danger
        small
        onPress={() => {
          this.setState({sizeSelected: 5});
        }}
        style={styles.btnSize}>
        <Text>XL</Text>
      </Button>
    );
    if (this.state.sizeSelected === 1) {
      sizeXS = (
        <Button
          danger
          small
          onPress={() => {
            this.setState({sizeSelected: 1});
          }}
          style={styles.btnSize}>
          <Text>XS</Text>
        </Button>
      );
    } else if (this.state.sizeSelected === 2) {
      sizeS = (
        <Button
          danger
          small
          onPress={() => {
            this.setState({sizeSelected: 2});
          }}
          style={styles.btnSize}>
          <Text>S</Text>
        </Button>
      );
    } else if (this.state.sizeSelected === 3) {
      sizeM = (
        <Button
          danger
          small
          onPress={() => {
            this.setState({sizeSelected: 3});
          }}
          style={styles.btnSize}>
          <Text>M</Text>
        </Button>
      );
    } else if (this.state.sizeSelected === 4) {
      sizeL = (
        <Button
          danger
          small
          onPress={() => {
            this.setState({sizeSelected: 4});
          }}
          style={styles.btnSize}>
          <Text>L</Text>
        </Button>
      );
    } else if (this.state.sizeSelected === 5) {
      sizeXL = (
        <Button
          danger
          small
          onPress={() => {
            this.setState({sizeSelected: 5});
          }}
          style={styles.btnSize}>
          <Text>XL</Text>
        </Button>
      );
    }
    return (
      <>
        <Header transparent style={{backgroundColor: 'white'}}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={require('../../assets/icons/back.png')} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black', marginLeft: 50, fontWeight: 'bold'}}>
              {this.props.route.params.title}
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={this.refresh}>
              <Image source={require('../../assets/icons/refresh.png')} />
            </Button>
          </Right>
        </Header>
        <Container style={{backgroundColor: '#f0f0f0'}}>
          <View style={styles.filter}>
            <Grid>
              <Col>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                  <Text style={{...styles.txtFilter, marginTop: 5}}>
                    {' '}
                    Filter{' '}
                    <Image
                      source={require('./../../assets/icons/filter.png')}
                    />
                  </Text>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalSortVisible(true);
                  }}>
                  <Text style={{...styles.txtFilter, marginLeft: vh(2)}}>
                    {' '}
                    Sort{' '}
                    <Image
                      source={require('./../../assets/icons/sort2.png')}
                    />{' '}
                    <Text style={{fontSize: 14}}>{this.state.sortName}</Text>
                  </Text>
                </TouchableOpacity>
              </Col>
            </Grid>
          </View>
          {itemNotFound !== '' ? (
            <View
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: vh(23),
              }}>
              <Image
                source={require('./../../assets/no-product-found.png')}
                style={{width: vh(20), height: vh(20)}}
              />
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                {this.state.itemNotFound}
              </Text>
            </View>
          ) : (
            <></>
          )}
          <ScrollView>
            <View style={styles.grid}>
              {products &&
                products.map(
                  (
                    {
                      id,
                      product_name,
                      product_price,
                      product_img,
                      category_name,
                      color_name,
                      sizes_name,
                      rating,
                      dibeli,
                    },
                    index,
                  ) => {
                    let img = product_img.split(',')[0];
                    return (
                      <>
                        <Card
                          key={index}
                          navigation={this.props.navigation}
                          product_name={product_name}
                          product_price={product_price}
                          product_img={img}
                          keyId={id}
                          category={category_name}
                          color={color_name}
                          size={sizes_name}
                          rating={rating}
                          dibeli={dibeli}
                        />
                      </>
                    );
                  },
                )}
            </View>
          </ScrollView>
          {products.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingBottom: 5,
                borderTopWidth: 0.2,
                borderColor: 'gray',
                paddingTop: 3,
              }}>
              <Button small rounded danger bordered onPress={this.prevPage}>
                <Text style={{paddingHorizontal: 10}}>{`<< `}Prev</Text>
              </Button>
              <Button full small danger bordered style={{width: 200}}>
                <Text>
                  Page {pageInfo.currentPage} of {pageInfo.totalPage}
                </Text>
              </Button>
              <Button small rounded danger bordered onPress={this.nextPage}>
                <Text style={{paddingHorizontal: 10}}>Next {`>> `}</Text>
              </Button>
            </View>
          ) : (
            <></>
          )}
          {modalVisible === true || modalSortVisible === true ? (
            <TouchableOpacity
              onPress={this.closeModal}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'black',
                opacity: 0.6,
              }}></TouchableOpacity>
          ) : (
            <></>
          )}
        </Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Content style={{backgroundColor: '#f0f0f0', width: vw(96)}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, margin: 15}}>
                  Color
                </Text>
                <View style={{height: 80, backgroundColor: 'white'}}>
                  <View
                    style={{
                      marginTop: 15,
                      marginRight: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <CheckBox
                      color="black"
                      checked={this.state.isBlack}
                      style={styles.btnColor}
                      onPress={this.checkedBlack}
                    />
                    <CheckBox
                      color="grey"
                      checked={this.state.isWhite}
                      style={styles.btnColor}
                      onPress={this.checkedWhite}
                    />
                    <CheckBox
                      color="red"
                      checked={this.state.isRed}
                      style={styles.btnColor}
                      onPress={this.checkedRed}
                    />
                    <CheckBox
                      color="green"
                      checked={this.state.isGreen}
                      style={styles.btnColor}
                      onPress={this.checkedGreen}
                    />
                    <CheckBox
                      color="blue"
                      checked={this.state.isBlue}
                      style={styles.btnColor}
                      onPress={this.checkedBlue}
                    />
                  </View>
                </View>
                <Text style={{fontWeight: 'bold', fontSize: 20, margin: 15}}>
                  Sizes
                </Text>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    paddingTop: 10,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 25,
                  }}>
                  {sizeXS}
                  {sizeS}
                  {sizeM}
                  {sizeL}
                  {sizeXL}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                    marginTop: 5,
                  }}>
                  <Button
                    full
                    rounded
                    bordered
                    dark
                    style={styles.btn}
                    onPress={this.Discard}>
                    <Text>Discard</Text>
                  </Button>
                  <Button
                    full
                    rounded
                    danger
                    style={styles.btn}
                    onPress={this.Apply}>
                    <Text>Apply</Text>
                  </Button>
                </View>
              </Content>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSortVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'white'}}>Close [x]</Text>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>
                    Sort By
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalSortVisible(false);
                    }}>
                    <Text style={{marginRight: 10}}>[ X ]</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  transparent
                  style={styles.btnModal}
                  onPress={this.nameAsc}>
                  <Text style={{fontSize: 18}}>Sort By Name: A-Z</Text>
                </Button>
                <Button
                  transparent
                  style={styles.btnModal}
                  onPress={this.nameDesc}>
                  <Text style={{fontSize: 18}}>Sort By Name: Z-A</Text>
                </Button>
                <Button
                  transparent
                  style={styles.btnModal}
                  onPress={this.priceAsc}>
                  <Text style={{fontSize: 18}}>Sort By Price: Low to High</Text>
                </Button>
                <Button
                  transparent
                  style={styles.btnModal}
                  onPress={this.priceDesc}>
                  <Text style={{fontSize: 18}}>Sort By Price: High to Low</Text>
                </Button>
                <Button
                  transparent
                  style={styles.btnModal}
                  onPress={this.rating}>
                  <Text style={{fontSize: 18}}>Sort By Rating</Text>
                </Button>
                <Button
                  transparent
                  style={styles.btnModal}
                  onPress={this.newest}>
                  <Text style={{fontSize: 18}}>Sort By Newest</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default ShopCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  filter: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  txtFilter: {
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DB3022',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  ctgTitle: {
    fontFamily: 'Metropolis-Bold',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 5,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 35,
  },
  btnSub: {
    color: '#fff',
    fontSize: 18,
  },
  card: {
    marginVertical: 10,
  },
  cardTitle: {
    flex: 1,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    height: 330,
    width: vw(100),
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btn: {
    width: 80,
    marginHorizontal: 5,
  },
  btnSize: {
    width: 30,
    justifyContent: 'center',
    color: '#d9534f',
  },
  btnColor: {
    borderRadius: 30,
    width: 30,
    height: 30,
  },
  btnModal: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: 330,
  },
});
