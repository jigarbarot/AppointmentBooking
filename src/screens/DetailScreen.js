import React, {Component} from 'react';
import {View, TextInput, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {getStore} from "../../App";
import {APPOINTMENT} from "../actions/Types";

const {width, height} = Dimensions.get('window')

class DetailScreen extends Component {
    constructor(props) {
        super(props);

        this.props.navigation.setOptions({
            title: `Detail ( ${props.route.params.item.slot} )`
        })

        let userInfo = props.route.params.item.userInfo


        this.state = {
            firstName: Boolean(userInfo) ? userInfo.firstName : '',
            lastName: Boolean(userInfo) ? userInfo.lastName :'',
            mobile: Boolean(userInfo) ? userInfo.mobile : '',
            hasError:false
        }
    }

    handleSave = () => {
        const{firstName, lastName, mobile}=this.state

        if(!Boolean(firstName) || !Boolean(lastName) || !Boolean(mobile)){
            this.setState({hasError:true})
        }
        else {

            if(mobile.match(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/)){
                let userInfo = {
                    firstName, lastName, mobile
                }
                let appointments = JSON.parse(JSON.stringify(getStore.getState().appointmentList))
                let {index} = this.props.route.params
                appointments[index].userInfo = userInfo

                getStore.dispatch({
                    type:APPOINTMENT,
                    payload: appointments
                })

                this.setState({hasError:false})

                this.props.navigation.pop()
            }
            else {
                this.setState({
                    mobile:'',
                    hasError:true
                })
            }


        }
    }

    handleCancel = () => {
        this.props.navigation.pop()
    }

    render() {
        const{hasError, firstName, lastName, mobile} = this.state
        return (
            <View style={styles.container}>

                <TextInput style={[styles.input, (!Boolean(firstName) && hasError) && styles.error]} placeholder={'Fist Name*'}
                           onChangeText={(firstName) => this.setState({firstName})}
                           maxLength={20} value={firstName}
                />
                <TextInput style={[styles.input, (!Boolean(lastName) && hasError) && styles.error]} placeholder={'Last Name*'}
                           onChangeText={(lastName) => this.setState({lastName})}
                           maxLength={20} value={lastName}
                />
                <TextInput style={[styles.input, (!Boolean(mobile) && hasError) && styles.error]} placeholder={'Mobile*'}
                           onChangeText={(mobile) => this.setState({mobile})}
                           keyboardType={'number-pad'} maxLength={13} value={mobile}
                />

                <View style={{flexDirection: 'row', width: width - 30,}}>

                    <TouchableOpacity onPress={this.handleSave} style={styles.btnSave}>
                        <Text style={styles.txtSave}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleCancel} style={styles.btnCancel}>
                        <Text style={styles.txtCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 15
    },
    input: {
        borderWidth: 1, borderRadius: 5, borderColor: '#ccc', height: 40, marginTop: 15, paddingLeft: 10
    },
    btnCancel: {
        flex: 1, borderWidth: 1, borderRadius: 5, marginTop: 20, borderColor: '#ccc', marginLeft: 10
    },
    btnSave: {
        flex: 1, borderWidth: 1, borderRadius: 5, marginTop: 20, borderColor: '#ccc', backgroundColor: 'black'
    },
    txtSave: {
        textAlign: 'center',
        marginVertical: 10,
        color: 'white',
        fontWeight: '600'
    },
    txtCancel: {
        textAlign: 'center', marginVertical: 10,
    },
    error:{
        borderColor:'red'
    }
})