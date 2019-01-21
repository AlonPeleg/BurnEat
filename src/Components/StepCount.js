import React, { Component } from 'react';
import { Platform, Text, View, TouchableOpacity, Image, ToastAndroid, WebView, Dimensions } from 'react-native';
import { Constants } from 'expo';

import VerifySpotify from './VerifySpotify';

let flag = 2;
let sumCount = 0;
let temp = 1;
let i = 0;
let walkInterval;
let steps = 0;
let checkFlag = 0

var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

export default class App extends Component {
    state = {
        location: null,
        errorMessage: null,
        lat1: 0,
        lat2: 0,
        lon1: 0,
        lon2: 0,
        sumCounter: 0,
        mySteps: 0,
        walk: "Walking.png",
        prevCoorSum: 0,
        currCoorSum: 0,
        date: "",
        month: "",

    };

    componentWillMount() {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month 
        this.setState({ date: date });
        this.setState({ month: month });
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            // setInterval(() => {
            //     this.getCurrentLocation();
            // }, 10000);
            console.log("no warnings");
        }
    }
    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
                this.setState({ currCoorSum: parseFloat(coords.longitude) + parseFloat(coords.latitude) })
                if (checkFlag === 0) {
                    this.setState({ lat1: coords.latitude, lat2: coords.latitude, lon1: coords.longitude, lon2: coords.longitude });
                    checkFlag = 1;
                } else if (checkFlag === 1) {
                    this.setState({ lat2: coords.latitude, lon2: coords.longitude });
                    console.log(this.state.currCoorSum - (parseFloat(this.state.lon1) + parseFloat(this.state.lat1)))
                    if (this.state.currCoorSum - (parseFloat(this.state.lon1) + parseFloat(this.state.lat1)) >= 0.0001 || this.state.currCoorSum - (parseFloat(this.state.lon1) + parseFloat(this.state.lat1)) <= -0.0001) {
                        this.getDistanceFromLatLonInKm(this.state.lat1, this.state.lon1, this.state.lat2, this.state.lon2);
                    }
                    checkFlag = 2;
                } else if (checkFlag === 2) {
                    this.setState({ lat1: coords.latitude, lon1: coords.longitude });
                    console.log(this.state.currCoorSum - (parseFloat(this.state.lon2) + parseFloat(this.state.lat2)))
                    if (this.state.currCoorSum - (parseFloat(this.state.lon2) + parseFloat(this.state.lat2)) >= 0.0001 || this.state.currCoorSum - (parseFloat(this.state.lon2) + parseFloat(this.state.lat2)) <= -0.0001) {
                        this.getDistanceFromLatLonInKm(this.state.lat1, this.state.lon1, this.state.lat2, this.state.lon2);
                        checkFlag = 1;
                    }
                }
            },
            error => alert(error.message),
            { enableHighAccuracy: true, }
        );
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        console.log('enter distance func')
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        var dr = (d * 1000) // distance in meters
        if (dr >= 1) {
            sumCount += dr;
            steps = (sumCount * 1.3123359580052);
            this.setState({ sumCounter: sumCount, mySteps: steps });
        }
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    startPressed = () => {
        this.setState({ walk: 'Walking.gif' })
        this.getCurrentLocation();
        walkInterval = setInterval(() => {
            this.getCurrentLocation();
        }, 2000);
    }

    stopPressed = () => {
        clearInterval(walkInterval);
        checkFlag=0;
        alert("you walked " + sumCount.toFixed(0) + " meters\nequal to " + steps.toFixed(0) + " steps");
        this.setState({ walk: 'Walking.png' })
        ToastAndroid.showWithGravity(
            'צעד הוא 0.762 מטרים',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
    stepReset = () => {
        steps = 0;
        sumCount = 0;
        checkFlag=0;
        this.setState({ mySteps: 0, sumCounter: 0 })
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.dateStyle} >
                    <Text style={{ fontSize: 50, color: "#3d9985" }}>
                        {this.state.date}\{this.state.month}
                    </Text>

                </View>
                <View style={styles.lineStyle} />
                <View style={{ flexDirection: 'row', top: 10, margin: 5 }}>
                    <View style={{ flexDirection: 'row', left: 0 }}>
                        <Text style={styles.paragraph}>{this.state.mySteps.toFixed(0)}</Text>
                        <Image source={{ uri: siteImages + 'stepsIcon2.png' }} style={{ width: 50, height: 50 }} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 0 }}>
                        <Text style={styles.paragraph}>{this.state.sumCounter.toFixed(1)}{'\n'}</Text>
                        <Image source={{ uri: siteImages + 'distanceIcon.png' }} style={{ width: 50, height: 50 }} />
                    </View>
                </View>
                <Image source={{ uri: siteImages + this.state.walk }} style={{ width: 200, height: 200, top: 200, position: "absolute" }} />
                <TouchableOpacity style={styles.btnStyle}
                    onPress={this.startPressed}
                >
                    <Text >התחל</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle}
                    onPress={this.stopPressed}
                >
                    <Text>עצור</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle}
                    onPress={this.stepReset}
                >
                    <Text>אפס</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                        this.props.navigation.navigate("home")
                    }}
                    style={styles.btnStyle}
                >
                    <Text>חזרה</Text>
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: HEIGHT - 180, width: 300, height: 300, }}>
                    <VerifySpotify />
                </View>
            </View>
        );
    }
}

const HEIGHT = Dimensions.get("window").height;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    btnStyle: {
        width: 200,
        height: 30,
        backgroundColor: '#3d9985',
        alignItems: 'center',
        justifyContent: 'center',
        top: 250,
        marginBottom: 1,

    },
    dateStyle: {
        width: 355,
        height: 80,
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
        top: 5,
    },
    lineStyle: {
        width: 360,
        height: 3,
        margin: 5,
        backgroundColor: '#3d9985'

    }
};