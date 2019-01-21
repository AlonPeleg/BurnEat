import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StatusBar, FlatList, ProgressBarAndroid, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';
var foodImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/FoodImages/';
var foodFlag;
var userId;
var currentPlate;

export default class FoodMain extends Component {
    async componentDidMount() {
        foodFlag = 0;
        await AsyncStorage.getItem("user").then(v => userId = JSON.parse(v).Email);
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
            axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/getDailyCalorie', {
                em: userId
            }).then((v) => { this.setState({ plateSumCalorie: parseInt(JSON.parse(v.data.d)[0].User_Calorie), myProgress: (parseInt(JSON.parse(v.data.d)[0].User_Calorie) / this.state.myTDEE) }) })

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
            progressColor: 'grey',
            plateSumCalorie: 0

        };
    };
    foodPressed = (e) => {
        let plateSum = this.state.plateSumCalorie;
        let currentPlate = this.state.myProgress;
        currentPlate = (this.state.plateSumCalorie / this.state.myTDEE)
        plateSum += e.Food_Calorie;
        currentPlate += (e.Food_Calorie / this.state.myTDEE);
        console.log(currentPlate)
        if (currentPlate !== 0) {
            this.setState({ progressColor: '#d84621' })
        }
        if (currentPlate >= (this.state.myBMR / this.state.myTDEE)) {
            this.setState({ progressColor: '#d7d821' })
        }
        if (currentPlate >= 1 && foodFlag === 0) {
            this.setState({ progressColor: '#8dd821' });
            Alert.alert(
                'Hey now',
                'You reached your TDEE or Passed it!',
                [
                    { text: 'Still Hungry', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                ],
                { cancelable: false }
            )
            foodFlag = 1;
        }
        this.setState({ myProgress: currentPlate, plateSumCalorie: plateSum })
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/InsertToPlate', {
            uEmail: userId,
            foodName: e.Food_Name,
            foodImg: e.Food_Img_Url
        })
        setTimeout(() => {
            axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/updatePlateSum', {
                em: userId,
                newSum: this.state.plateSumCalorie
            })
        }, 500);

    }
    foodTypePressed = (e) => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetFoodList', {
            foodType: e
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
    questionPressed = () => {
        ToastAndroid.showWithGravity(
            'בחר מוצרים לפי\nאחת משלוש הקטגוריות',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
        ToastAndroid.showWithGravity(
            '"הצלחת שלי":\nמספר קלורי של הצלחת שלי\nלעומת\nשריפת קלוריות ממוצעת ביום',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }
    resetDailyPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/FoodDailyReset', {
            em: userId
        })
        this.setState({ plateSumCalorie: 0, myProgress: 0.0 })
    }
    myPlatePressed=()=>{
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/getDailyCalorie',{
            em:userId
        }).then((v)=>{
            if(parseInt(JSON.parse(v.data.d)[0].User_Calorie)===0){
                ToastAndroid.showWithGravity(
                    'הצלחת ריקה',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            }else{
                this.props.navigation.navigate('myPlate')
            }
        })
    }

    render() {

        return (
            <View style={{ flex: 1, }}>
                <View>
                    <TouchableOpacity onPress={() => this.foodTypePressed('חלבון')}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'helbon.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.foodTypePressed('שומן')}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'shuman.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.foodTypePressed('פחמימה')}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'pahmema.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.questionPressed}>
                        <Image source={{ uri: siteImages + 'questionMark.png' }} style={{ height: 17, width: 17, marginLeft: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.resetDailyPressed} style={{ position: 'absolute', top: HEIGHT - 183, left: WIDTH - 50 }}>
                        <Image source={{ uri: siteImages + 'resetWorkout.png' }} style={{ height: 50, width: 50, }} />
                    </TouchableOpacity>
                    <View style={styles.myPlate}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.myPlatePressed }>
                                <Text style={{ color: 'red', fontSize: 20 }}>הצלחת שלי</Text>
                            </TouchableOpacity>
                        </View>
                        <ProgressBarAndroid
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={this.state.myProgress}
                            color={this.state.progressColor}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.plateSumCalorie}    /    {this.state.myTDEE}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("home") }}
                    style={styles.backBtnStyle}
                >
                    <Text style={{ fontSize: 20, color: "white" }}>לך אחורה</Text>
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
                        <View style={{ width: WIDTH, backgroundColor: "#54a9a3", height: 50, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: "white", textAlign: 'center', }}>
                                סגור
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
        backgroundColor: '#54a9a3',
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
        height: (HEIGHT / 3) - 120,
        justifyContent: 'center',
    }
}