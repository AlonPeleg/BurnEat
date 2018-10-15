import React, { Component } from 'react';
import { View, ActivityIndicator, Image, AsyncStorage } from 'react-native';

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
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    };
}

const styles ={
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  }