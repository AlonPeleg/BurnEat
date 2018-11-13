import React, { Component } from 'react';
import { View, Image, AsyncStorage,Dimensions } from 'react-native';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';


export default class OpeningPage extends Component {
    componentDidMount() {
        setTimeout(async () => {
            try {
                AsyncStorage.getItem('user').then((v)=>{
                    if(v){
                        this.props.navigation.navigate("home");
                    }
                    else{
                        this.props.navigation.navigate("Welcome");
                    }
                });
            } catch (error) {
                console.warn("Async storage error")
            }
        }, 1500);
    }
    constructor(props) {
        super(props)

        this.state = {

        };
    };
    render() {
        return (
            <View>
                <Image source={{uri:siteImages+'OpeningPageLogo.png'}} style={{width:WIDTH,height:HEIGHT,position:'absolute'}}/>
            </View>
        )
    };
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;