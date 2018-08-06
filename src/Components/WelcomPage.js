import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'

export default class WelcomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        };
    };

    render() {
        return (
            <View>
                <TouchableOpacity style={{ width: WIDTH, height: HEIGHT }}
                    onPress={() => {this.props.navigation.navigate("Login") }}
                />
                <TouchableOpacity
                    style={styles.newUserButton}
                    onPress={() => { this.props.navigation.navigate("NewUser") }}
                >
                    <Text>New User? Press Here</Text>
                </TouchableOpacity>
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
        left: HALFWIDTH-100,
        width: WIDTH - 200,
        height: 40,
        backgroundColor: '#a79494',
    }
};