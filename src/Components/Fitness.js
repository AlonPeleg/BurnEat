import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StatusBar, FlatList, ProgressBarAndroid, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';
var workoutImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/WorkoutImages/';
var timerInterval;
var stretchCounter;
var exerciseCounter;
var userId;
var rTimerInterval;
var defTimer;


export default class Fitness extends Component {
    async componentWillMount() {
        this.setState({ defualtTimer: 30 })
        stretchCounter = this.props.navigation.state.params.currentStretch;
        exerciseCounter = this.props.navigation.state.params.currentExc;
        StatusBar.setHidden(true);
        await AsyncStorage.getItem("user").then(v => userId = JSON.parse(v).Email);
        await AsyncStorage.getItem(userId).then(v => {
            console.log(v)
            if (v) {
                if (JSON.parse(v).stretchs) {
                    stretchCounter = parseInt(JSON.parse(v).stretchs);
                } else {
                    stretchCounter = 0;
                }
                if (JSON.parse(v).exercise) {
                    exerciseCounter = parseInt(JSON.parse(v).exercise);
                } else {
                    exerciseCounter = 0;
                }
            }
            else {
                stretchCounter = 0
                exerciseCounter = 0;
            }
        });

    }

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            workoutList: [],
            currentImage: '',
            modalVisibleImage: false,
            timerTime: 0,
            repsTime: 0,
            tmpTime: 0,
            strExcFlag: false,
            timerStartFlag: false,
            addTimerFlag: false,
            timerOn: false,
            regTimerFlag: false,
            defualtTimer: 30,
        };
    };
    finishExercise = () => {
        let myTime = 0;
        if (this.state.addTimerFlag == true) {
            clearInterval(rTimerInterval);
            myTime = 30 - this.state.defualtTimer;
            setTimeout(() => {
                this.setState({ defualtTimer: 30, regTimerFlag: false })
            }, 2000);
            if (myTime === 0) {
                ToastAndroid.showWithGravity(
                    "סיימתי!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            } else {
                ToastAndroid.showWithGravity(
                    "לקח לי " + myTime + " שניות לסיים",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } else {
            ToastAndroid.showWithGravity(
                "סיימתי!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        exerciseCounter++;
        let currentStr = 0;
        AsyncStorage.getItem(userId).then((v) => { currentStr = JSON.parse(v).stretchs })
        setTimeout(() => {
            AsyncStorage.setItem(userId, JSON.stringify({ stretchs: currentStr, exercise: exerciseCounter.toString() }));
        }, 1000);

    }
    regularTimer = () => {
        this.setState({ regTimerFlag: true })
        defTimer = this.state.defualtTimer;
        rTimerInterval = setInterval(() => {
            this.setState({ defualtTimer: defTimer-- })
            if (this.state.defualtTimer === 0) {
                clearInterval(rTimerInterval);
                this.setState({ defualtTimer: 30, regTimerFlag: false })
                ToastAndroid.showWithGravity(
                    'הזמן עבר',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }, 1000);
    }
    resetRegularTimer = () => {
        clearInterval(rTimerInterval);
        this.setState({ defualtTimer: 30, regTimerFlag: false })
    }
    startTimer = () => {
        let timer = this.state.timerTime;
        this.setState({ tmpTime: this.state.timerTime, timerStartFlag: true });
        timerInterval = setInterval(() => {
            this.setState({ timerTime: timer-- })
            if (this.state.timerTime === 0) {
                clearInterval(timerInterval);
                this.setState({ timerTime: this.state.tmpTime, timerStartFlag: false })
                stretchCounter++;
                ToastAndroid.showWithGravity(
                    'מתיחה בוצעה בהצלחה',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                let currentExercise = 0;
                AsyncStorage.getItem(userId).then((v) => { currentExercise = JSON.parse(v).exercise })
                setTimeout(() => {
                    AsyncStorage.setItem(userId, JSON.stringify({ stretchs: stretchCounter.toString(), exercise: currentExercise }));
                }, 1000);


            }
        }, 1000);

    }
    resetTimer = () => {
        clearInterval(timerInterval);
        this.setState({ timerTime: this.state.tmpTime, timerStartFlag: false })
    }
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
                        <TouchableOpacity key={index} style={styles.fetchTouchStyle} onPress={() => {
                            this.setState({
                                modalVisible: false,
                                modalVisibleImage: true,
                                currentImage: workoutImages + item.Exercise_Img + '.gif',
                                strExcFlag: false,
                                repsTime: item.Exercise_Reps
                            })
                        }}>
                            <View style={styles.fetchViewStyle}>
                                <Image source={{ uri: workoutImages + item.Exercise_Img + '.jpg' }} style={{ height: 100, width: '40%', marginLeft: 5 }}></Image>
                                <View style={{ marginLeft: 13, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, marginBottom: 15, marginTop: 10 }}>{item.Exercise_Name}</Text>
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
                        <TouchableOpacity key={index} style={styles.fetchTouchStyle} onPress={() => {
                            this.setState({
                                modalVisible: false,
                                modalVisibleImage: true,
                                currentImage: workoutImages + item.Exercise_Img + '.jpg',
                                timerTime: parseInt(item.Exercise_Reps.split(':')[1]),
                                strExcFlag: true
                            });
                        }}>
                            <View style={styles.fetchViewStyle}>
                                <Image source={{ uri: workoutImages + item.Exercise_Img + '.jpg' }} style={{ height: 90, width: '50%', marginLeft: 3 }}></Image>
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
                            <Text>{stretchCounter} מתיחות שבוצעו</Text>
                            <Text>{exerciseCounter} אימונים שבוצעו</Text>
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisibleImage}
                    onRequestClose={() => null}
                    style={styles.modalStyle}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', }}>
                        <Image source={{ uri: this.state.currentImage }} style={{ height: 250, width: "100%" }} />
                        {this.state.strExcFlag ?
                            <View style={styles.textTimerView}>
                                <Text style={{ marginTop: 15 }}>{this.state.timerTime} שניות</Text>
                                <View style={styles.timerBtnsView}>

                                    <TouchableOpacity
                                        style={styles.timerBtns}
                                        onPress={this.state.timerStartFlag ? null : this.startTimer}
                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>התחל טיימר</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.timerBtns}
                                        onPress={this.resetTimer}
                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>אפס טיימר</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            :
                            <View style={styles.textTimerView} >
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 15, marginRight: 5 }}>{this.state.repsTime}</Text>
                                    <Text style={{ marginTop: 15 }}>{this.state.repsTime.toString().includes(':') ? "שניות" : "חזרות"}</Text>
                                </View>
                                <View style={styles.timerBtnsView}>

                                    <TouchableOpacity
                                        style={styles.timerBtns}
                                        onPress={this.finishExercise}
                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>סיימתי</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.timerBtns}
                                        onPress={() => { this.setState({ addTimerFlag: !this.state.addTimerFlag, timerOn: !this.state.timerOn }) }}
                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>{this.state.timerOn ? "הסר " : "הוסף "} טיימר</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.addTimerFlag ?
                                    <View style={styles.textTimerView}>
                                        <Text style={{ marginTop: 15 }}>{this.state.defualtTimer} שניות</Text>
                                        <View style={styles.timerBtnsView}>

                                            <TouchableOpacity
                                                style={styles.timerBtns}
                                                onPress={this.state.regTimerFlag ? null : this.regularTimer}
                                            >
                                                <Text style={{ textAlign: 'center', color: 'white' }}>התחל טיימר</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.timerBtns}
                                                onPress={this.resetRegularTimer}
                                            >
                                                <Text style={{ textAlign: 'center', color: 'white' }}>אפס טיימר</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    : null}
                            </View>
                        }
                        <TouchableOpacity
                            onPress={() => this.setState({ modalVisible: true, modalVisibleImage: false })}
                        >
                            <View style={{ width: WIDTH, backgroundColor: "#54a9a3", height: 50, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, color: "white", textAlign: 'center', }}>
                                    סגור
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
    },
    timerBtns: {
        backgroundColor: "rgba(190,0,0,0.6)",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: "50%"
    },
    timerBtnsView: {
        flexDirection: 'row',
        marginHorizontal: 1,
        height: 60,
        marginTop: 10
    },
    textTimerView: {
        width: '100%',
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fetchViewStyle: {
        flexDirection: 'row',
        marginHorizontal: 17,
        marginVertical: 2.5,
        backgroundColor: 'white',
        borderRadius: 8
    },
    fetchTouchStyle: {
        borderRadius: 8,
        backgroundColor: "rgba(221,221,221,0.9)"
    }
}