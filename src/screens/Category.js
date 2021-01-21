import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import CardCategory from '../components/CardProduct'
import { Container, Header, Title, Content, Button, Left, Body, Right } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid'
import { API_URL } from "@env"
import axios from 'axios'

class ShopCategory extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        products: [],
        productNew: [],
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.props.route.params.url) {
                axios.get(API_URL + 'search?' + this.props.route.params.url)
                    .then(({ data }) => {
                        console.log(data)
                        this.setState({
                            productNew: data.data.products,
                        })
                    }).catch(err => {
                        console.log(err)
                    })
            } else {
                if (this.props.route.params.ctgId == 'new') {
                    axios.get(API_URL + 'products/sort?sortBy=updated_at&orderBy=desc')
                        .then(({ data }) => {
                            // console.log(data.data.products)
                            this.setState({
                                productNew: data.data.products,
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                } else {
                    axios.get(API_URL + 'products/sort?category=' + this.props.route.params.ctgId)
                        .then(({ data }) => {
                            // console.log(data.data.products)
                            this.setState({
                                productNew: data.data.products,
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }
    
    render() {
        const { productNew } = this.state;
        console.log(this.props.route.params)
        return (
            <>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>{this.props.route.params.ctgName}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Image source={require('../assets/icons/Search.png')} />
                        </Button>
                    </Right>
                </Header>
                <Container>
                    <View style={styles.filter}>
                        <Grid>
                            <Col>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Filter') }}>
                                    <Text style={styles.txtFilter}> Filter </Text>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity>
                                    <Text style={styles.txtFilter}> Sort </Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>

                    <ScrollView>
                        <View style={styles.grid} >
                            {
                                productNew && productNew.map(({ id, product_name, product_price, product_category, product_img }) => {
                                    let img = product_img.split(',')[0];
                                    // console.log(img);
                                    return (
                                        <CardCategory id={id} name={product_name} price={product_price} category={product_category} image={img} navigation={this.props.navigation} />
                                    )
                                })
                            }

                        </View>
                    </ScrollView>
                </Container>
            </>
        );
    }
}

export default ShopCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: 10
    },
    filter: {
        marginLeft: 10,
        marginBottom: 10, flexDirection: 'row',
        justifyContent: 'center'
    },
    txtFilter: {
        fontSize: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DB3022",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
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
        marginVertical: 10
    },
    cardTitle: {
        flex: 1,
        textAlign: 'center',
    }
});