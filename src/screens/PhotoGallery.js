import React, {Component} from 'react';
import {
    Dimensions,
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    FlatList,
    Animated,
    TouchableOpacity
} from 'react-native'

const {width, height} = Dimensions.get('window')

import {hasNotch} from 'react-native-device-info'

import img1 from '../assets/1.jpeg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
import img4 from '../assets/4.jpg'


class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            data: [img1, img2, img3, img4]
        }
        this.animatedValue = new Animated.Value(0)
        this.value = 0
    }

    handleAnimation = () => {
        Animated.timing(this.animatedValue, {
            toValue: this.value === 0 ? 1 : 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            this.value = this.value === 0 ? 1 : 0
        })
    }

    handleScroll = (event) => {
        const xOffset = event.nativeEvent.contentOffset.x
        const currentPage = Math.floor(xOffset / width)

        if (this.state.index !== currentPage) {
            this.setState({
                index: currentPage
            })
        }

    }

    render() {
        const {handleClose} = this.props
        const {index, data} = this.state
        return (
            <View style={{backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', height, width}}>



                <FlatList
                    data={data}
                    horizontal
                    pagingEnabled={true}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => this.handleAnimation()}>
                                <Image source={item}
                                       style={{height: height / 1.5, width: width,}}/>
                            </TouchableWithoutFeedback>
                        )
                    }}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                    bounces={false}
                    onScroll={this.handleScroll}
                />

                <Animated.View style={{
                    height: hasNotch() ? 80 : 50,
                    width: width,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [
                        {
                            translateY: this.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -100]
                            })
                        }
                    ],
                    position:'absolute', top:0
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>{(index + 1) + ' of ' + data.length}</Text>
                    <TouchableWithoutFeedback onPress={() => handleClose()} hitSlop={{left:10, right:10, top:10, bottom:10}}>
                        <Image source={require('../assets/close.png')}
                               style={{height: 25, width: 25, position:'absolute', right:15}}/>
                    </TouchableWithoutFeedback>
                </Animated.View>

            </View>
        );
    }
}

export default PhotoGallery;