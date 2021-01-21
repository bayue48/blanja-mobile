import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class cardAddress extends React.Component {
    render() {
        let isActive;
        if (this.props.address.selectedAddress == this.props.addressId) {
            isActive = <Text style={{ color: 'green', fontWeight: 'bold' }}>Active</Text>
        }
        return (
            <>
                <View style={styles.order} >
                    <View style={{ margin: 10, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: '200', fontSize: 18 }}>
                                {this.props.name}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('ChangeAddress', {
                                        addressId: this.props.addressId,
                                    })
                                }}
                            >
                                <Text style={{ marginRight: 10, fontWeight: 'bold', color: 'red' }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                            {this.props.city + ', '}<Text style={{ color: 'green', fontWeight: 'bold' }}>{this.props.postal}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                                {this.props.phone}
                            </Text>
                            <View>
                                {isActive}
                            </View>
                        </View>
                    </View>
                </View>

            </>
        )
    }
}

const mapStateToProps = ({ auth, address }) => {
    return {
        auth,
        address
    };
};

export default connect(mapStateToProps)(cardAddress);

const styles = StyleSheet.create({
    order: {
        borderRadius: 10, height: 105,
        width: 328, backgroundColor: 'white',
        marginTop: 7,
        marginLeft: 5, marginRight: 10,
        marginBottom: 7,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 10, height: 10 }
    }
})