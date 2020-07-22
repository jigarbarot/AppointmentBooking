import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {getStore} from "../../App";
import moment from 'moment'
import {connect} from "react-redux";

class AppointmentScreen extends Component {
    constructor(props) {
        super(props);

        this.props.navigation.setOptions({
            title: `Appointments of ${moment().format('DD/MM/YYYY')}`
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', }}>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor:'#f1f1f1', justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Text style={{fontSize: 18}}>Available</Text>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 5,
                            backgroundColor: '#249109',
                            marginLeft: 10
                        }}/>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
                        <Text style={{marginVertical: 15, fontSize: 18}}>Allotted</Text>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 5,
                            backgroundColor: 'tomato',
                            marginLeft: 10
                        }}/>
                    </View>
                </View>

                <FlatList
                    data={this.props.appointmentList}
                    keyExtractor={(item, index) => 'appointment_' + index}
                    contentContainerStyle={{paddingHorizontal: 15}}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.navigation.push('Detail',{item})}>
                                <View style={[styles.btn, styles.btnAvailable]}>
                                    <Text style={styles.btnText}>{item.slot}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    appointmentList: state.appointmentList
})

export default connect(mapStateToProps, null)(AppointmentScreen);

const styles = StyleSheet.create({
    btn: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', marginVertical: 15, borderRadius: 10
    },
    btnText: {
        color: 'white', textAlign: 'center', fontWeight: '600'
    },
    btnAvailable: {
        backgroundColor: '#249109'
    },
    btnAllottedTime: {
        backgroundColor: 'tomato'
    }
})