import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,Dimensions } from 'react-native';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

class MyPlate extends Component {
 
    constructor(props){
        super(props)
       
   this.state={
       plate:{}
   }
 }
 
    render() {
        const Plate = this.props.navigation.getParam('plate')

        return (
            <View style={styles.container}>
            <Image source={{uri: siteImages + "Plate.jpg"}} style={{height:HEIGHT,width:WIDTH,position:"absolute"}}/>
            <View>
            {  Plate.map((Item)=>{
            return <Text style={{color:"white"}}>{Item.Food_Name} </Text>
            })}
            </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("foodMainPage")}}>
                        <Text style={{color:"Red",fontSize:15}}>לך אחורה </Text>
                </TouchableOpacity >
            </View>
        );
    }6
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
});

export default MyPlate;
