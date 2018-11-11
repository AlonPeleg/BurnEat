import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, Image } from 'react-native'

var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

export default class WelcomePage extends Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    render() {
        return (
            <View>
                <View>
                <Image style={{ borderRadius:5,width: 80, height: 80,position: 'absolute',top:50,left:50  }} source={{ uri: siteImages + 'BurnEat-red.jpeg' }}/>
                </View>
                <Image style={{ width: WIDTH, height: HEIGHT, position: 'absolute'  }} source={{ uri: siteImages + 'background.jpg' }}/>
                <View>
                    <TouchableOpacity style={[styles.ExistingUserButton, { justifyContent: 'center', alignItems: 'center', left: 100, top: 400 }]}
                        onPress={() => { this.props.navigation.navigate("Login") }}
                    >
                        <Text style={{ fontSize: 15 }}>משתמש קיים</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.newUserButton, { justifyContent: 'center', alignItems: 'center', left: 100, top: 450 }]}
                        onPress={() => { this.props.navigation.navigate("NewUser") }}
                    >
                        <Text style={{ fontSize: 15 }}>משתמש חדש</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const HALFWIDTH = Dimensions.get('window').width / 2;
const HALFHEIGHT = Dimensions.get('window').height / 2;

const styles = {
    newUserButton: {
        position: "absolute",
        top: HEIGHT - 65,
        width: WIDTH - 200,
        height: 40,
        backgroundColor: "#FAFAD2",
        borderRadius: 70
    },
    ExistingUserButton: {
        position: "absolute",
        top: HEIGHT - 115,
        width: WIDTH - 200,
        height: 40,
        backgroundColor: "#FAFAD2",
        borderRadius: 70
    }
};
