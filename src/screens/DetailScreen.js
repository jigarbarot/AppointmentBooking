import React, {Component} from 'react';
import {View, TextInput, Dimensions, Text} from 'react-native'

const {width, height} = Dimensions.get('window')

class DetailScreen extends Component {
    constructor(props) {
        super(props);

        this.props.navigation.setOptions({
            title: 'Detail'
        })
    }
    render() {
        return (
            <View style={{flex:1, backgroundColor:'white', paddingHorizontal:15, paddingVertical:15}}>

                <TextInput style={{borderWidth:1, borderRadius:5, borderColor:'#ccc', height:40, marginTop:15, paddingLeft:10}} placeholder={'Fist Nme'} />
                <TextInput style={{borderWidth:1, borderRadius:5, borderColor:'#ccc', height:40, marginTop:15, paddingLeft:10}} placeholder={'Last Name'} />
                <TextInput style={{borderWidth:1, borderRadius:5, borderColor:'#ccc', height:40, marginTop:15, paddingLeft:10}} placeholder={'Mobile'} />

                <View style={{flexDirection:'row', width:width - 30,}}>
                <View style={{flex:1, borderWidth:1, borderRadius: 5, marginTop: 20, borderColor:'#ccc', backgroundColor:'black'}}>
                    <Text style={{textAlign:'center', marginVertical:10, color:'white', fontWeight:'600'}}>Save</Text>
                </View>
                <View style={{flex:1, borderWidth:1, borderRadius: 5, marginTop: 20, borderColor:'#ccc', marginLeft:10}}>
                    <Text style={{textAlign:'center', marginVertical:10,}}>Cancel</Text>
                </View>
                </View>

            </View>
        );
    }
}

export default DetailScreen;