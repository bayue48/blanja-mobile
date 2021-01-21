import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Footer, FooterTab, Icon, Left, Body, Textarea, View, Form, Text, Label } from "native-base";
import { Image, Picker } from 'react-native'
import { API_URL } from '@env'
import {connect} from 'react-redux'
import axios from 'axios'

class writeReview extends Component {
    state = {
        listProduct: [],
        selectedProduct: 0,
        star: 0,
        review: ''
    }

    getDataTrx = () => {
        axios.get(API_URL + '/transactions/trx/' + this.props.route.params.trxId)
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    listProduct: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    setProduct = (e) => {
        this.setState({
            selectedProduct: e
        })
    }

    setRating = (e) => {
        this.setState({
            star: e
        })
    }

    submitReview = () =>{
        if(this.state.selectedProduct != 0){
            const reviewData = {
                user_id:this.props.auth.id,
                product_id:this.state.selectedProduct,
                rating:this.state.star,
                review:this.state.review
            }
            axios.post(API_URL+'/user/addReview', reviewData)
            .then(({data}) =>{
                alert(data.message)
                this.props.navigation.goBack()
            }).catch(({response}) =>{
                console.log(response.data)
            })
        }else{
            alert('Silahkan pilih produk terlebih dahulu')
        }
    }

    componentDidMount = () => {
        this.getDataTrx()
    }

    render() {
        const { listProduct, selectedProduct, star } = this.state
        return (
            <Container >
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', marginLeft: 20, fontWeight: 'bold' }}>Write a Review</Title>
                    </Body>
                </Header>
                <Content padder style={{ backgroundColor: '#f0f0f0' }}>
        <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20, marginBottom:20}}>Beri ulasan untuk transaksi {this.props.route.params.trxId}</Text>
                    <Label>Pilih Produk</Label>
                    <View style={{ borderWidth:1, borderColor:'red', borderRadius:5 , marginBottom:20}}>
                        <Picker
                            selectedValue={selectedProduct}
                            onValueChange={(itemValue, itemIndex) => this.setProduct(itemValue)}
                        >
                            <Picker.Item label="product" value='0' style={{ backgroundColor: 'gray' }} />
                            {
                                listProduct && listProduct.map(({ product_id, product_name }) => {
                                    return <Picker.Item label={product_name} value={product_id} />
                                })
                            }
                        </Picker>
                    </View>
                    <Label>Beri rating</Label>
                    <View style={{ borderWidth:1, borderColor:'red', borderRadius:5 , marginBottom:20}}>
                        <Picker
                            selectedValue={star}
                            onValueChange={(itemValue, itemIndex) => this.setRating(itemValue)}
                        >
                            <Picker.Item label="Beri Bintang" value='0' />
                            <Picker.Item label="Bintang 1" value='1' />
                            <Picker.Item label="Bintang 2" value='2' />
                            <Picker.Item label="Bintang 3" value='3' />
                            <Picker.Item label="Bintang 4" value='4' />
                            <Picker.Item label="Bintang 5" value='5' />
                        </Picker>
                    </View>
                    <Form>
                        <Label>Review</Label>
                        <Textarea rowSpan={5} bordered placeholder='Write review here...' onChangeText={(text) => { this.setState({ review: text }) }}/>
                    </Form>
                    <Button full rounded danger style={{marginTop:15}}
                        onPress={this.submitReview}
                    >
                        <Text>
                            Submit Review
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(writeReview);