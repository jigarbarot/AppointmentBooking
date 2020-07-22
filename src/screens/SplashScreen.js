import React, {Component} from 'react';
import {View, Text, Animated} from "react-native";
import {getStore} from "../../App";
import {APPOINTMENT} from "../actions/Types";

class SplashScreen extends Component {
    animatedValue = new Animated.Value(0)

    componentDidMount() {
        Animated.timing(this.animatedValue, {toValue:1, duration: 5000, useNativeDriver:false}).start()

       let appointmentList = getStore.getState().appointmentList

        if(appointmentList.length === 0){
            let timeslot = []

            let x = 60; //minutes interval
            let times = []; // time array
            let tt = 0; // start time
            let ap = ['AM', 'PM']; // AM-PM

//loop to increment the time and push results in array
            for (let i=0;tt<24*60; i++) {
                let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                let mm = (tt%60); // getting minutes of the hour in 0-55 format
                if(hh > 8 && hh<= 17){
                    times.push({slot: ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) +' '+ ap[Math.floor(hh/12)]})
                }
                tt = tt + x;
            }

            getStore.dispatch({
                type:APPOINTMENT,
                payload: times
            })

            this.props.navigation.navigate('Appointment')

        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
                <Animated.Text style={{fontSize:25,fontWeight:'600',
                    color: this.animatedValue.interpolate({
                        inputRange:[0,1],
                        outputRange:['#85c20a', '#ed8c32']
                    })}}>Appointment</Animated.Text>
            </View>
        );
    }
}

export default SplashScreen;