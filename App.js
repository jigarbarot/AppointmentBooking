/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import AppReducer from "./src/reducers";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import AppointmentScreen from "./src/screens/AppointmentScreen";
import DetailScreen from "./src/screens/DetailScreen";
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createStackNavigator();

console.disableYellowBox = true;

export const getStore = createStore(
    AppReducer,
    applyMiddleware(thunk)
);


const App = () => {
    return (
        <Provider store={getStore}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'SplashScreen'} component={SplashScreen} options={{headerShown: false}}/>
                    <Stack.Screen name={'Appointment'} component={AppointmentScreen}/>
                    <Stack.Screen name={'Detail'} component={DetailScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;
