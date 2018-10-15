import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

let flag = 3;
let sumCount = 0;
let temp = 1;
let i = 0;
export default class App extends Component {
    state = {
        location: null,
        errorMessage: null,
        lat1: 0,
        lat2: 0,
        lon1: 0,
        lon2: 0,
        steps: 0,
        currDistance: 0,
        prevDistance: 0,

    };

    componentWillMount() {

        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            setInterval(() => {
                this.getCurrentLocation();
            }, 2000);
        }
    }
    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
                console.log(coords.latitude, coords.longitude);
                if (flag === 3) {
                    flag = 2;
                }
                else if (flag === 1) {
                    this.setState({ lat1: coords.latitude, lon1: coords.longitude });
                    flag = 0;
                    this.getDistanceFromLatLonInKm(this.state.lat1, this.state.lon1, this.state.lat2, this.state.lon2);
                }
                else if (flag === 2) {
                    this.setState({ lat1: coords.latitude, lon1: coords.longitude, lat2: coords.latitude, lon2: coords.longitude });
                    flag = 0;
                }
                else {
                    this.setState({ lat2: coords.latitude, lon2: coords.longitude });
                    flag = 1;
                    this.getDistanceFromLatLonInKm(this.state.lat1, this.state.lon1, this.state.lat2, this.state.lon2);
                }
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 100000, distanceFilter: 1 }
        );
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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
        sumCount += dr;
        console.log(lat1, lon1, lat2, lon2);
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{this.state.steps} steps</Text>
                <Text>sum count: {sumCount.toFixed(2)}</Text>
                <Text>{text}</Text>
            </View>
        );
    }
}

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
};