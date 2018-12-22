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
        currCoorSum: 0

    };

    componentWillMount() {
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
                    this.setState({ prevCoorSum: parseFloat(coords.longitude) + parseFloat(coords.latitude) })
                    checkFlag = 1;
                }

                else {
                    if (this.state.prevCoorSum - this.state.currCoorSum >= 0.00006 || this.state.prevCoorSum - this.state.currCoorSum <= -0.00006) {
                        console.log(this.state.prevCoorSum - this.state.currCoorSum);
                        if (flag === 1) {
                            this.setState({ lat1: coords.latitude, lon1: coords.longitude });
                            flag = 0;
                            this.getDistanceFromLatLonInKm(coords.latitude, coords.longitude, this.state.lat2, this.state.lon2);
                        }
                        else if (flag === 2) {
                            this.setState({ lat1: coords.latitude, lon1: coords.longitude, lat2: coords.latitude, lon2: coords.longitude });
                            flag = 0;
                        }
                        else {
                            this.setState({ lat2: coords.latitude, lon2: coords.longitude });
                            flag = 1;
                            this.getDistanceFromLatLonInKm(this.state.lat1, this.state.lon1, coords.latitude, coords.longitude);
                        }
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
        }, 10000);
    }

    stopPressed = () => {
        clearInterval(walkInterval);
        flag = 2;
        alert("you walked " + sumCount.toFixed(0) + " meters\nequal to " + steps.toFixed(0) + " steps");
        this.setState({ walk: 'Walking.png' })
        ToastAndroid.showWithGravity(
            'צעד הוא 0.762 מטרים',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
        checkFlag = 0;
    }
    stepReset = () => {
        steps = 0;
        sumCount = 0;
        flag = 3;
        this.setState({ mySteps: 0, sumCounter: 0 })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{ uri: siteImages + this.state.walk }} style={{ position: 'absolute', width: 100, height: 100, top: 50 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.paragraph}>{this.state.sumCounter.toFixed(1)}{'\n'}</Text>
                    <Image source={{ uri: siteImages + 'distanceIcon.png' }} style={{ width: 50, height: 50 }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.paragraph}>{this.state.mySteps.toFixed(0)}</Text>
                    <Image source={{ uri: siteImages + 'stepsIcon2.png' }} style={{ width: 50, height: 50 }} />
                </View>
                <TouchableOpacity style={styles.btnStyle}
                    onPress={this.startPressed}
                >
                    <Text>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle}
                    onPress={this.stopPressed}
                >
                    <Text>Stop</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle}
                    onPress={this.stepReset}
                >
                    <Text>Reset counter!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                        this.props.navigation.navigate("home")
                    }}
                    style={{ width: 200, height: 25, backgroundColor: "#DDD", alignItems: "center", justifyContent: 'center', }}
                >
                    <Text>Back</Text>
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
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
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
        backgroundColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center'
    }
};