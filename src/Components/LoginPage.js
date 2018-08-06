import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emailInput: '',
            passInput: ''
        };
    };
    checkLogin = () => {
        this.props.navigation.navigate("home", {
            myEmail: this.state.emailInput,
        });
    }
    render() {
        return (
            <View>
                <Text>Welcome Back!</Text>
                <Text>Email:</Text>
                <TextInput
                    onChangeText={(e) => { this.setState({ emailInput: e }) }}
                    placeholder="Enter Email"
                    style={{ width: 200 }}
                />
                <Text>Password: </Text>
                <TextInput
                    onChangeText={(e) => { this.setState({ passInput: e }) }}
                    placeholder="Enter Password"
                    style={{ width: 200 }}
                />
                <TouchableOpacity
                    style={{ position: 'absolute', top: HEIGHT - 100, left: 100, width: 100, height: 50, backgroundColor: '#ddd' }}
                    onPress={this.checkLogin}
                >
                    <Text style={{ textAlign: 'center' }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    };
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = {

};