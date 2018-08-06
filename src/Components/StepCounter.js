import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class StepCounter extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0
    };
    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({ pastStepCount: result.steps });
            },
            error => {
                this.setState({
                    pastStepCount: "Could not get stepCount: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };
    goBack = () => {
        this._unsubscribe;
        this.props.navigation.navigate("home");
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Steps taken in the last 24 hours: {this.state.pastStepCount}
                </Text>
                <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 500, left: 100, width: 100, height: 30, backgroundColor: '#ccc' }}
                    onPress={this.goBack}
                >
                    <Text>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center"
    }
});