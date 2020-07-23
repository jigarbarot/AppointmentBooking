import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Modal} from "react-native";
import moment from 'moment'
import {connect} from "react-redux";
import PhotoGallery from "./PhotoGallery";
const {width} = Dimensions.get('window')

class AppointmentScreen extends Component {
    constructor(props) {
        super(props);

        this.props.navigation.setOptions({
            title: `Appointments of ${moment().format('DD/MM/YYYY')}`
        })

        this.state={
            showGallery:false
        }
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
                <TouchableOpacity onPress={()=> this.setState({showGallery:true})}>
                <View style={{width: width - 30,height: 40, alignItems: 'center', justifyContent: 'center', margin: 15, backgroundColor:'white', borderWidth:1, borderRadius: 10, borderColor:'#ccc'}}>
                    <Text style={{}}>Open Gallery</Text>
                </View>
                </TouchableOpacity>

                <FlatList
                    data={this.props.appointmentList}
                    keyExtractor={(item, index) => 'appointment_' + index}
                    contentContainerStyle={{paddingHorizontal: 15}}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.navigation.push('Detail',{item, index})}>
                                <View style={[styles.btn, Boolean(item.userInfo) && styles.btnAllottedTime]}>
                                    <Text style={styles.btnText} numberOfLines={1}>{item.slot }{Boolean(item.userInfo) ?` ( ${item.userInfo.firstName} ${item.userInfo.lastName} )` : ''}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />

                <Modal
                    visible={this.state.showGallery}
                >
                    <PhotoGallery handleClose={()=> this.setState({showGallery:false})} />
                </Modal>
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
        width: '100%', marginVertical: 15, borderRadius: 10,   backgroundColor: '#249109', paddingHorizontal: 20
    },
    btnText: {
        color: 'white', textAlign: 'center', fontWeight: '600',
    },
    btnAllottedTime: {
        backgroundColor: 'tomato'
    }
})