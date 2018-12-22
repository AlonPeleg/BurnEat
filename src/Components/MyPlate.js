import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';




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
                {  Plate.map((Item)=>{
            return <Text>{Item.Food_Name} </Text>
            })}
                 
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("foodMainPage")}}>
                        <Text>לך אחורה </Text>
                </TouchableOpacity >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
});

export default MyPlate;
