import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import axios from 'axios';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';
var foodImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/FoodImages/';


export default class FoodMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            FoodList:[]
        
        };
    };
    helbonPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: 'חלבון'
        }).then((v) => {
         
        

            let data= JSON.parse(v.data.d)
     
            let list = data.map((food ,index) =>{
                return (
                <TouchableOpacity key={index} style={{borderRadius:8}}>
                    <View style={{flexDirection:'row',margin:5,backgroundColor:'white',borderRadius:8}}>
                     <View  >
                        <Image source={{uri:foodImages+food.Food_Img_Url}} style={{width:100,height:100,marginLeft:5}}></Image>
                     </View>
                     <View style={{marginLeft:20}}>
                     <Text style={{fontSize:20,marginBottom:10}}>שם:{food.Food_Name}</Text>
                        <Text style={{fontSize:20}}>קלוריות:{food.Food_Calorie}</Text>
                     </View>
                    </View>
                </TouchableOpacity>
                );
               })
              this.setState({FoodList:list});

        });
        setTimeout(() => {
            
            this.setState({ modalVisible: true });
            return 
        }, 1500);

    }
 
    
    render() {
        console.log(this.state.FoodList)
        return (
            <View style={{ flex: 1, }}>
                <View>
                    <TouchableOpacity onPress={this.helbonPressed}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'helbon.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.shumanPressed}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'shuman.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.pahmimaPressed}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'pahmema.jpg' }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("home") }}
                    style={styles.backBtnStyle}
                >
                    <Text>Go Back</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => null}
                    style={styles.modalStyle}
                >
                  {this.state.FoodList}
                    <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: false, })}
                    >
                        <View style={{ width: WIDTH, backgroundColor: "rgba(238,206,206,0.7)" }}>
                            <Text style={{ fontSize: 25, color: "white", textAlign: 'center', marginTop: 25 }}>
                                Close
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View >
        )
    };

}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = {
    backBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        height: 60,
    },
    selectionBtn: {
        width: WIDTH,
        height: (HEIGHT / 3) - 20,

    },
    modalStyle: {
        position: "absolute",
        width: WIDTH,
        height: HEIGHT,
        alignSelf: "center",
    }
}