import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StatusBar, ScrollView, AsyncStorage, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Card, CardItem, Body } from 'native-base';

var userId;
var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';
var foodImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/FoodImages/';
export default class plate extends Component {
    async componentDidMount() {
        await AsyncStorage.getItem("user").then(v => userId = JSON.parse(v).Email);
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetUserPlate', {
            em: userId
        }).then((v) => this.setState({ plateList: JSON.parse(v.data.d) }))
    }

    constructor(props) {
        super(props)

        this.state = {
            plateList: []
        };
    };


    render() {
        const s = this.state.plateList;

        return (
            <View>
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('foodMainPage')}
                    >
                        <View style={{ borderWidth: 4, borderColor: 'rgba(221,221,221,0.9)', borderRadius: 5 }}>
                            <CardItem>
                                <Body>
                                    {s.map((item, index) => {
                                        return <View key={index} style={{ flexDirection: 'row' }}>
                                            <Image source={{ uri: foodImages + item.Food_Img }} style={{ height: 100, width: 110, marginHorizontal: 5 }} />
                                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, marginLeft: 30 }}>
                                                <Text style={{ textAlign: 'center' }}>{item.Food_Name}</Text>
                                            </View>
                                            <Image source={{ uri: siteImages + 'finishWorkoutV.png' }} style={{ position: 'absolute', top: 32, height: 20, width: 20, left: WIDTH - 60 }} />
                                        </View>
                                    })}
                                </Body>
                            </CardItem>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}


// {s.map((item, index) => {
//     return <Text></Text>
// })}
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
};