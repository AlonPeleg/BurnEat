import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StatusBar, FlatList, AsyncStorage, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Card, CardItem, Body } from 'native-base';

var userId;
var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

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
            plateList:[]
        };
    };




    render() {
        const s = this.state.plateList;
        console.log(s)
        return (
            <View style={styles.container}>
                <Image source={{ uri: siteImages + "Plate.jpg" }} style={{ height: HEIGHT, width: WIDTH, position: "absolute" }} />
                <View>
                    {s.map((item, key) => {
                        return <Text>{item.Food_Name}</Text>
                    })}
                </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("foodMainPage") }}>
                    <Text style={{ color: 'red', fontSize: 15 }}>לך אחורה </Text>
                </TouchableOpacity >
            </View>
        )
    }
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
};