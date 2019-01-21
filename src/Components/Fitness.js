import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StatusBar, FlatList, AsyncStorage, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Card, CardItem, Body } from 'native-base';


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';
var workoutImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/WorkoutImages/';
var timerInterval;
var userId;
var rTimerInterval;
var defTimer;
var noModal=0;


export default class Fitness extends Component {
    async componentWillMount() {
        this.setState({ defualtTimer: 30 });
        StatusBar.setHidden(true);
        await AsyncStorage.getItem("user").then(v => userId = JSON.parse(v).Email);
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetUserExercises', {
            em: userId
        }).then((v) => this.setState({
            dailyExercises: JSON.parse(v.data.d)[0].User_Daily_Exercises
            , totalExercises: JSON.parse(v.data.d)[0].User_Sum_Exercises
        }))
    }

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            workoutList: [],
            myDailyList: [],
            currentImage: '',
            modalVisibleImage: false,
            dailyModalVisible: false,
            timerTime: 0,
            repsTime: 0,
            tmpTime: 0,
            strExcFlag: false,
            timerStartFlag: false,
            addTimerFlag: false,
            timerOn: false,
            regTimerFlag: false,
            defualtTimer: 30,
            currentExeNameChosen: '',
            dailyExercises: 0,
            totalExercises: 0,
            checked: null,
            dailyExName: '',
            dailyExImg: '',
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
          
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/UpdateSumExercise', {
            em: userId
        })
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/InsertToDailyExercises', {
            uEmail: userId,
            exName: this.state.dailyExName,
            exImg: this.state.dailyExImg
        })
        setTimeout(() => {
            axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetUserExercises', {
                em: userId
            }).then((v) => this.setState({
                dailyExercises: JSON.parse(v.data.d)[0].User_Daily_Exercises
                , totalExercises: JSON.parse(v.data.d)[0].User_Sum_Exercises
            }))
        }, 500);


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
                axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/WorkoutDone', {
                    exName: this.state.currentExeNameChosen
                })
                axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/UpdateSumExercise', {
                    em: userId
                })
                axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/InsertToDailyExercises', {
                    uEmail: userId,
                    exName: this.state.dailyExName,
                    exImg: this.state.dailyExImg
                })
                setTimeout(() => {
                    axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetUserExercises', {
                        em: userId
                    }).then((v) => this.setState({
                        dailyExercises: JSON.parse(v.data.d)[0].User_Daily_Exercises
                        , totalExercises: JSON.parse(v.data.d)[0].User_Sum_Exercises
                    }))
                }, 500);
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
                this.setState({ timerTime: this.state.tmpTime, timerStartFlag: false });
                ToastAndroid.showWithGravity(
                    'מתיחה בוצעה בהצלחה',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/WorkoutDone', {
                    exName: this.state.currentExeNameChosen
                })
                axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/UpdateSumExercise', {
                    em: userId
                })
                axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/InsertToDailyExercises', {
                    uEmail: userId,
                    exName: this.state.dailyExName,
                    exImg: this.state.dailyExImg
                })
                setTimeout(() => {
                    axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetUserExercises', {
                        em: userId
                    }).then((v) => this.setState({
                        dailyExercises: JSON.parse(v.data.d)[0].User_Daily_Exercises
                        , totalExercises: JSON.parse(v.data.d)[0].User_Sum_Exercises
                    }))
                }, 500);
            }
        }, 1000);

    }
    resetTimer = () => {
        clearInterval(timerInterval);
        this.setState({ timerTime: this.state.tmpTime, timerStartFlag: false })
    }

    exerciseTypePressed = (e) => {
        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetExerciseList', {
            exerciseType: e
        }).then((v) => {
            let data = JSON.parse(v.data.d)

            const list = <FlatList
                data={data}
                keyExtractor={(exercise, index) => index.toString()}
                renderItem={({ item, index }) => {


                    return (
                        <TouchableOpacity key={index} style={styles.fetchTouchStyle} onPress={() => {
                            e === 2 ?
                                this.setState({
                                    modalVisible: false,
                                    modalVisibleImage: true,
                                    currentImage: workoutImages + item.Exercise_Img + '.jpg',
                                    timerTime: parseInt(item.Exercise_Reps.split(':')[1]),
                                    strExcFlag: true,
                                    currentExeNameChosen: item.Exercise_Name,
                                    dailyExName: item.Exercise_Name,
                                    dailyExImg: item.Exercise_Img
                                }) :

                                this.setState({
                                    modalVisible: false,
                                    modalVisibleImage: true,
                                    currentImage: workoutImages + item.Exercise_Img + '.gif',
                                    strExcFlag: false,
                                    repsTime: item.Exercise_Reps,
                                    currentExeNameChosen: item.Exercise_Name,
                                    dailyExName: item.Exercise_Name,
                                    dailyExImg: item.Exercise_Img
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
    myDailyExercises = () => {

        axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/GetDailyExercises', {
            em: userId
        }).then((v) => {
            let data = JSON.parse(v.data.d)

            const list = <FlatList
                data={data}
                keyExtractor={(exercise, index) => index.toString()}
                renderItem={({ item, index }) => {


                    return (
                        <View style={{ borderWidth: 4, borderColor: 'rgba(221,221,221,0.9)', borderRadius: 5 }}>
                            <CardItem>
                                <Body>
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: workoutImages + item.Exercise_Img + '.jpg' }} style={{ height: 80, width: 150, marginHorizontal: 5 }} />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, marginLeft: 10 }}>
                                            <Text style={{ textAlign: 'center' }}>{item.Exercise_Name}</Text>
                                        </View>
                                        <Image source={{ uri: siteImages + 'finishWorkoutV.png' }} style={{ position: 'absolute', top: 32, height: 20, width: 20, left: WIDTH - 60 }} />
                                    </View>
                                </Body>
                            </CardItem>
                        </View>


                    );
                }}
            />
            this.setState({ myDailyList: list });
            noModal=0;

        }).catch(() => {
            ToastAndroid.showWithGravity(
                'לא נמצאו אימונים יומיים',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            noModal = 1;
        });
        setTimeout(() => {
            if (noModal === 1) {
                return;
            } else {
                this.setState({ dailyModalVisible: true });
                return
            }
        }, 500);
    }
    resetDailyPressed = () => {
        console.log('coming soon')
    }
    render() {

        return (
            <View style={{ flex: 1, }}>
                <View>
                    <TouchableOpacity onPress={() => this.exerciseTypePressed(1)}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'workoutPic2.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.exerciseTypePressed(2)}>
                        <Image
                            style={styles.selectionBtn}
                            source={{ uri: siteImages + 'flex.jpg' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.questionPressed}>
                        <Image source={{ uri: siteImages + 'questionMark.png' }} style={{ height: 17, width: 17, marginLeft: 10, marginTop: 2 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.resetDailyPressed} style={{ position: 'absolute', top: HEIGHT - 172, left: WIDTH - 50 }}>
                        <Image source={{ uri: siteImages + 'resetWorkout.png' }} style={{ height: 50, width: 50, }} />
                    </TouchableOpacity>
                    <View style={styles.myPlate}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.myDailyExercises}>
                                <Text style={{ color: 'red', fontSize: 20 }}>האימונים שלי</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.dailyExercises} אימונים שבוצעו היום</Text>
                            <Text>{this.state.totalExercises} אימונים שבוצעו בכללי</Text>
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.dailyModalVisible}
                    onRequestClose={() => null}
                    style={styles.modalStyle}

                >
                    {this.state.myDailyList}
                    <TouchableOpacity
                        onPress={() => this.setState({ dailyModalVisible: false, })}
                    >
                        <View style={{ width: WIDTH, backgroundColor: "#54a9a3", height: 50, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: "white", textAlign: 'center', zIndex: 1 }}>
                                סגור
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View >
        )
    };

}

const WIDTH = Dimensions.get("window").width ;
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