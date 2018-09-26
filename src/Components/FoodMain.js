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
        };
    };
    helbonPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: 'חלבון'
        }).then((v) => {
            
        });
        setTimeout(() => {
            this.setState({ modalVisible: true });
        }, 1500);

    }
    shumanPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: 'שומן'
        }).then((v) => console.warn(v))
    }
    pahmimaPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: 'פחמימה'
        }).then((v) => console.warn(v))
    }
    render() {
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