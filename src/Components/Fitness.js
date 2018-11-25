import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StatusBar, FlatList, ProgressBarAndroid, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';
var workoutImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/WorkoutImages/';
var foodFlag;

export default class Fitness extends Component {
    componentDidMount() {
        StatusBar.setHidden(true);
    }

    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            workoutList: [],
        };
    };

    trainPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetExerciseList', {
            exerciseType: 1
        }).then((v) => {
            let data = JSON.parse(v.data.d)

            const list = <FlatList
                data={data}
                keyExtractor={(exercise, index) => index.toString()}
                renderItem={({ item, index }) => {


                    return (
                        <TouchableOpacity key={index} style={{ borderRadius: 8, backgroundColor: "rgba(221,221,221,0.9)" }} onPress={() => console.log('stretch')}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 17, marginVertical: 2.5, backgroundColor: 'white', borderRadius: 8 }}>
                                <Image source={{ uri: workoutImages + item.Exercise_Img }} style={{ height: 100, width: '40%', marginLeft: 5 }}></Image>
                                <View style={{ marginLeft: 13, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, marginBottom: 15, marginTop: 10 }}>שם: {item.Exercise_Name}</Text>
                                    <Text style={{ fontSize: 15, textAlign: 'center' }}>{item.Exercise_Reps}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    );
                }}
            />
            this.setState({ workoutList: list });

        });
        setTimeout(() => {
            this.setState({ modalVisible: true });
            return
        }, 500);
    }
    stretchPressed = () => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetExerciseList', {
            exerciseType: 2
        }).then((v) => {
            let data = JSON.parse(v.data.d)

            const list = <FlatList
                data={data}
                keyExtractor={(exercise, index) => index.toString()}
                renderItem={({ item, index }) => {


                    return (
                        <TouchableOpacity key={index} style={{ borderRadius: 8, backgroundColor: "rgba(221,221,221,0.9)" }} onPress={() => console.log('stretch')}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 17, marginVertical: 2.5, backgroundColor: 'white', borderRadius: 8 }}>
                                <Image source={{ uri: workoutImages + item.Exercise_Img }} style={{ height: 90, width: '50%', marginLeft: 3 }}></Image>
                                <View style={{ marginLeft: 8, alignItems: 'center', }}>
                                    <Text style={{ fontSize: 14, marginBottom: 15, marginTop: 10 }}>{item.Exercise_Name}</Text>
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>{item.Exercise_Reps}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    );
                }}
            />
            this.setState({ workoutList: list });

        });
        setTimeout(() => {
            this.setState({ modalVisible: true });
            return
        }, 500);
    }

    questionPressed = () => {
        ToastAndroid.showWithGravity(
            'בחר אימונים או מתיחות',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
        ToastAndroid.showWithGravity(
            'ויוצג לפניך מה וכמה לבצע',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }

    render() {

        return (
            <View style={{ flex: 1, }}>
                <View>
                    <TouchableOpacity onPress={this.trainPressed}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'workoutPic2.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.stretchPressed}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'flex.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.questionPressed}>
                        <Image source={{ uri: siteImages + 'questionMark.png' }} style={{ height: 17, width: 17, marginLeft: 10, marginTop: 2 }} />
                    </TouchableOpacity>
                    <View style={styles.myPlate}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'red', fontSize: 20 }}>האימונים שלי</Text>
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
                    {this.state.workoutList}
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
        height: (HEIGHT / 2) - 85,

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