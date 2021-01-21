import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Right, CheckBox } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet, Picker } from 'react-native'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

export default class Filters extends React.Component {
    state = {
        isRed: false,
        isGreen: false,
        isBlue: false,
        isBlack: false,
        color: 0,
        sizeSelected: 0,
        catSelected: 0,
        selectedBrand: 0,
        axiosData: '',
        products: []
    }

    checkedRed = () => {
        this.setState({
            isRed: !this.state.isRed,
            isGreen: false,
            isBlue: false,
            isBlack: false,
        })
        if (this.state.color == 1) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 1
            })
        }
    }

    checkedGreen = () => {
        this.setState({
            isRed: false,
            isGreen: !this.state.isGreen,
            isBlue: false,
            isBlack: false,
        })
        if (this.state.color == 2) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 2
            })
        }
    }

    checkedBlue = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: !this.state.isBlue,
            isBlack: false,
        })
        if (this.state.color == 3) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 3
            })
        }
    }

    checkedBlack = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: false,
            isBlack: !this.state.isBlack,
        })
        if (this.state.color == 4) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 4
            })
        }
    }

    setSelectedValue = (e) => {
        this.setState({
            selectedBrand: e
        })
    }

    Discard = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: false,
            isBlack: false,
            color: 0,
            sizeSelected: 0,
            catSelected: 0,
            selectedBrand: 0
        })
    }

    Apply = () => {
        let axiosData = ''
        if (this.state.color != 0) {
            axiosData += `color=${this.state.color}&`
        }
        if (this.state.sizeSelected != 0) {
            axiosData += `size=${this.state.sizeSelected}&`
        }
        if (this.state.catSelected != 0) {
            axiosData += `category=${this.state.catSelected}&`
        }
        this.setState({
            axiosData: axiosData
        })
        this.props.navigation.navigate('Categories', {
            url: axiosData
        })

    }

    render() {
        const { products } = this.state;
        let sizeS = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 1 }) }}><Text>S</Text></Button>
        let sizeM = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 2 }) }}><Text>M</Text></Button>
        let sizeL = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 3 }) }}><Text>L</Text></Button>
        if (this.state.sizeSelected == 1) {
            sizeS = <Button danger small onPress={() => { this.setState({ sizeSelected: 1 }) }}><Text>S</Text></Button>
        } else if (this.state.sizeSelected == 2) {
            sizeM = <Button danger small onPress={() => { this.setState({ sizeSelected: 2 }) }}><Text>M</Text></Button>
        } else if (this.state.sizeSelected == 3) {
            sizeL = <Button danger small onPress={() => { this.setState({ sizeSelected: 3 }) }}><Text>L</Text></Button>
        }
        let all = <Button bordered danger small onPress={() => { this.setState({ catSelected: 0 }) }}><Text>All</Text></Button>
        let tshirt = <Button bordered danger small onPress={() => { this.setState({ catSelected: 1 }) }}><Text>T-shirt</Text></Button>
        let short = <Button bordered danger small onPress={() => { this.setState({ catSelected: 2 }) }}><Text>Short</Text></Button>
        let jacket = <Button bordered danger small onPress={() => { this.setState({ catSelected: 3 }) }}><Text>Jacket</Text></Button>
        let pants = <Button bordered danger small onPress={() => { this.setState({ catSelected: 4 }) }}><Text>Pants</Text></Button>
        let shoes = <Button bordered danger small onPress={() => { this.setState({ catSelected: 5 }) }}><Text>Shoes</Text></Button>
        const category = this.state.catSelected
        if (category == 1) {
            tshirt = <Button danger small onPress={() => { this.setState({ catSelected: 1 }) }}><Text>T-shirt</Text></Button>
        } else if (category == 2) {
            short = <Button danger small onPress={() => { this.setState({ catSelected: 2 }) }}><Text>Short</Text></Button>
        } else if (category == 3) {
            jacket = <Button danger small onPress={() => { this.setState({ catSelected: 3 }) }}><Text>Jacket</Text></Button>
        } else if (category == 4) {
            pants = <Button danger small onPress={() => { this.setState({ catSelected: 4 }) }}><Text>Pants</Text></Button>
        } else if (category == 5) {
            shoes = <Button danger small onPress={() => { this.setState({ catSelected: 5 }) }}><Text>Shoes</Text></Button>
        } else {
            all = <Button danger small onPress={() => { this.setState({ catSelected: 0 }) }}><Text>All</Text></Button>
        }
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../assets/icons/back.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: 'black', marginLeft: 40, fontWeight: 'bold' }}>Filters</Title>
                        </Body>

                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <Text>Axios : {this.state.axiosData}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, margin: 15 }}>Color</Text>
                        <View style={{ height: 80, backgroundColor: 'white' }}>
                            <View style={{ marginTop: 15, marginRight: 15, flexDirection: 'row', justifyContent: "space-around" }}>
                                <CheckBox color="red" checked={this.state.isRed} style={{ borderRadius: 30, width: 50, height: 50 }} onPress={this.checkedRed} />
                                <CheckBox color="green" checked={this.state.isGreen} style={{ borderRadius: 30, width: 50, height: 50 }} onPress={this.checkedGreen} />
                                <CheckBox color="blue" checked={this.state.isBlue} style={{ borderRadius: 30, width: 50, height: 50 }} onPress={this.checkedBlue} />
                                <CheckBox color="black" checked={this.state.isBlack} style={{ borderRadius: 30, width: 50, height: 50 }} onPress={this.checkedBlack} />
                            </View>
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, margin: 15 }}>Sizes</Text>
                        <View style={{ height: 60, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30 }}>
                            {sizeS}
                            {sizeM}
                            {sizeL}
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, margin: 15 }}>Category</Text>
                        <View style={{ height: 60, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30 }}>
                            {all}
                            {tshirt}
                            {short}
                        </View>
                        <View style={{ height: 60, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', float: 'left', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30 }}>
                            {jacket}
                            {pants}
                            {shoes}
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, margin: 15 }}>Brand</Text>
                        <View style={{ backgroundColor: 'white', height: 50 }}>
                            <Picker
                                selectedValue={this.state.selectedBrand}
                                onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Select brand" value="0" />
                                <Picker.Item label="Adidas" value="1" />
                                <Picker.Item label="Nike" value="2" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginHorizontal: 15 }}>
                            <Button full rounded bordered dark style={styles.btn}
                                onPress={this.Discard}
                            >
                                <Text>Discard</Text>
                            </Button>
                            <Button full rounded danger style={styles.btn}
                                onPress={this.Apply}
                            >
                                <Text>Apply</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            </>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 150
    }
})

