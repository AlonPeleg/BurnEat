import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';


export default class FoodMain extends Component {
    constructor(props) {
        super(props)

        this.state = {

        };
    };

    render() {
        return (
            <View>
                <Text>
                    Test test
            </Text>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("home") }}
                    style={styles.backBtnStyle}
                >
                    <Text>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    };

}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = {
    backBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ddd',
        height:25,
        top: HEIGHT-50,
    }
}