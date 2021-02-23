import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/cardHome'
import { Container, Header, Title, Content, Button, Left, Body, Right, Form, Item, Label, Input } from "native-base";
import { vw, vh } from 'react-native-expo-viewport-units'
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import { BASE_URL } from '@env'

class PopularProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            pageInfo: {},
            currentPage: '',
        }
    }

    nextPage = () => {
        const nextPage = this.state.pageInfo.nextpage
        if (nextPage != null) {
            axios.get(BASE_URL + nextPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    prevPage = () => {
        const prevPage = this.state.pageInfo.previousPage
        if (prevPage != null) {
            axios.get(BASE_URL + prevPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    getItems = () => {
        axios.get(BASE_URL + '/products?sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo
                })
            }).catch((error) => {
                console.log(error.response)
            })
    }

    componentDidMount = () => {
        this.getItems()
    }


    render() {
        const { products, pageInfo } = this.state
        return (
            <>
                <Header transparent style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 15, fontWeight: 'bold' }}>Popular Items</Title>
                    </Body>
                </Header>
                <Container style={{ backgroundColor: '#f0f0f0' }}>
                    <ScrollView>
                        <View style={{ minHeight: vh(98),marginTop:vh(2) }}>
                            <View style={styles.grid} >
                                {
                                    products && products.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }, index) => {
                                        let img = product_img.split(',')[0]
                                        return (
                                            <>
                                                <Card navigation={this.props.navigation} key={index} product_name={product_name} product_price={product_price} product_img={img} keyId={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                            </>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 5 }}>
                            <Button small rounded danger bordered
                                onPress={this.prevPage}
                            >
                                <Text style={{ paddingHorizontal: 10 }}>{`<< `}Prev</Text>
                            </Button>
                            <Button full small bordered style={{ width: 200 }}>
                                <Text>Page {pageInfo.currentPage} of {pageInfo.totalPage}</Text>
                            </Button>
                            <Button small rounded danger bordered
                                onPress={this.nextPage}
                            >
                                <Text style={{ paddingHorizontal: 10 }} >Next {`>> `}</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </Container>
            </>
        );
    }
}

export default PopularProducts;

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