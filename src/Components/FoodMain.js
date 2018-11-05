import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StatusBar, FlatList, ProgressBarAndroid, AsyncStorage } from 'react-native';
import axios from 'axios';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';
var foodImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/FoodImages/';


export default class FoodMain extends Component {
    componentDidMount() {
        AsyncStorage.getItem("user").then((v) => {
            axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/TDEECalc', {
                height: JSON.parse(v).Height,
                weight: JSON.parse(v).Weight,
                sex: JSON.parse(v).Sex,
                age: JSON.parse(v).Age,
                level: JSON.parse(v).Level
            }).then((v) => { this.setState({ myTDEE: v.data.d }) });
            axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/BMRCalc', {
                height: JSON.parse(v).Height,
                weight: JSON.parse(v).Weight,
                sex: JSON.parse(v).Sex,
                age: JSON.parse(v).Age,
            }).then((v) => { this.setState({ myBMR: v.data.d }) });
        });
        StatusBar.setHidden(true);

    }
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            FoodList: [],
            myProgress: 0.0,
            myTDEE: 0,
            myBMR: 0,
            progressColor: 'red',
            plateSumCalorie: 0

        };
    };
    foodPressed = (e) => {
        let plateSum = this.state.plateSumCalorie;
        let currentPlate = this.state.myProgress;
        plateSum += e.Food_Calorie;
        currentPlate += (e.Food_Calorie / this.state.myTDEE);
        console.log(currentPlate)
        if (currentPlate >= (this.state.myBMR / this.state.myTDEE)) {
            this.setState({ progressColor: 'green' })
        }
        if (currentPlate >= 1) {
            this.setState({ progressColor: 'blue' })
        }
        this.setState({ myProgress: currentPlate, plateSumCalorie: plateSum })
    }
    helbonPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: 'חלבון'
        }).then((v) => {
            let data = JSON.parse(v.data.d)

            const list = <FlatList
                data={data}
                keyExtractor={(food, index) => index.toString()}
                renderItem={({ item, index }) => {


                    return (<TouchableOpacity key={index} style={{ borderRadius: 8, backgroundColor: "rgba(221,221,221,0.9)" }} onPress={() => this.foodPressed(item)}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 17, marginVertical: 2.5, backgroundColor: 'white', borderRadius: 8 }}>
                            <Image source={{ uri: foodImages + item.Food_Img_Url }} style={{ width: 100, height: 100, marginLeft: 5 }}></Image>
                            <View style={{ marginLeft: 25 }}>
                                <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 10 }}>שם: {item.Food_Name}</Text>
                                <Text style={{ fontSize: 20 }}>קלוריות ליחידה: {item.Food_Calorie}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    )
                }}
            />
            this.setState({ FoodList: list });

        });
        setTimeout(() => {
            this.setState({ modalVisible: true });
            return
        }, 500);
    }
    shumanPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: 'שומן'
        }).then((v) => {
            let data = JSON.parse(v.data.d)
            const list = <FlatList
                data={data}
                keyExtractor={(food, index) => index.toString()}
                renderItem={({ item, index }) => {


                    return (<TouchableOpacity key={index} style={{ borderRadius: 8, backgroundColor: "rgba(221,221,221,0.9)" }} onPress={() => this.foodPressed(item)}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 17, marginVertical: 2.5, backgroundColor: 'white', borderRadius: 8 }}>
                            <Image source={{ uri: foodImages + item.Food_Img_Url }} style={{ width: 100, height: 100, marginLeft: 5 }}></Image>
                            <View style={{ marginLeft: 25 }}>
                                <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 10 }}>שם: {item.Food_Name}</Text>
                                <Text style={{ fontSize: 20 }}>קלוריות ליחידה: {item.Food_Calorie}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    )
                }}
            />
            this.setState({ FoodList: list });

        });
        setTimeout(() => {
            this.setState({ modalVisible: true });
            return
        }, 500);
    }
    pahmimaPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: 'פחמימה'
        }).then((v) => {
            let data = JSON.parse(v.data.d)
            const list = <FlatList
                data={data}
                keyExtractor={(food, index) => index.toString()}
                renderItem={({ item, index }) => {


                    return (<TouchableOpacity key={index} style={{ borderRadius: 8, backgroundColor: "rgba(221,221,221,0.9)" }} onPress={() => this.foodPressed(item)}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 17, marginVertical: 2.5, backgroundColor: 'white', borderRadius: 8 }}>
                            <Image source={{ uri: foodImages + item.Food_Img_Url }} style={{ width: 100, height: 100, marginLeft: 5 }}></Image>
                            <View style={{ marginLeft: 25 }}>
                                <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 10 }}>שם: {item.Food_Name}</Text>
                                <Text style={{ fontSize: 20 }}>קלוריות ליחידה: {item.Food_Calorie}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    )
                }}
            />
            this.setState({ FoodList: list });

        });
        setTimeout(() => {
            this.setState({ modalVisible: true });
            return
        }, 500);
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
                    <View style={styles.myPlate}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'red', fontSize: 20 }}>הצלחת שלי</Text>
                        </View>
                        <ProgressBarAndroid
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={this.state.myProgress}
                            color={this.state.progressColor}
                        />
                        <Text>{this.state.plateSumCalorie}/{this.state.myTDEE}</Text>
                    </View>
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
                        <View style={{ width: WIDTH, backgroundColor: "rgba(238,206,206,0.7)", height: 60 }}>
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
        height: (HEIGHT / 3) - 55,

    },
    modalStyle: {
        position: "absolute",
        width: WIDTH,
        height: HEIGHT,
        alignSelf: "center",

    },
    myPlate: {
        width: WIDTH,
        height: (HEIGHT / 3) - 100,
        justifyContent: 'center',
    }
}