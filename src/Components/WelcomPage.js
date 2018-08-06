import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'

export default class WelcomePage extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity style={{ width: WIDTH, height: HEIGHT }}
                    onPress={() => { console.warn("screen pressed") }}
                />
                <TouchableOpacity
                    style={styles.newUserButton}
                    onPress={() => { console.warn("New User selected") }}
                >
                    <Text>New User Here</Text>
                </TouchableOpacity>
            </View>
        )
    };
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = {
    newUserButton: {
        position: "absolute",
        top: 100,
        left: WIDTH / 2,
        width: 50,
        height: 50,
        backgroundColor: '#a79494',
    }
}