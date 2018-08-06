import React, { Component } from 'react';
import { View, Text ,TouchableOpacity,Dimensions} from 'react-native';

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        };
    };
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                style={{position:'absolute',top:HEIGHT/2,left:WIDTH/2,height:35,width:100,alignItems:'center',justifyContent: 'center',}}
                onPress={()=>{this.props.navigation.navigate("steps")}}
                >
                    <Text>Count My Steps</Text>
                </TouchableOpacity>
            </View>
        )
    };
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;