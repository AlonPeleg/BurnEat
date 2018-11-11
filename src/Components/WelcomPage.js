import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar } from 'react-native'

var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

export default class WelcomePage extends Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    render() {
        return (
        <View>
            <View>
            <Image style={{width:50,height:50}} source={{uri: siteImages + 'shuman.jpg'}}/>
            </View>
            <View>  
                <TouchableOpacity style={[styles.ExistingUserButton, { justifyContent: 'center', alignItems: 'center' }]}
                    onPress={() => { this.props.navigation.navigate("Login") }}
                >
                    <Text style={{ fontSize: 15 }}>משתמש קיים</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.newUserButton, { justifyContent: 'center', alignItems: 'center' }]}
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
        top: HEIGHT - 200,
        left: HALFWIDTH - 70,
        width: WIDTH - 200,
        height: 40,
        backgroundColor: "#FAFAD2",
        borderRadius: 70
    },
    ExistingUserButton: {
        position: "absolute",
        top: HEIGHT - 250,
        left: HALFWIDTH - 70,
        width: WIDTH - 200,
        height: 40,
        backgroundColor: "#FAFAD2",
        borderRadius: 70
    }
};
