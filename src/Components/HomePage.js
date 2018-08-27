import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import BackgroundImage2 from "./BackgroundImage2";

export default class HomePage extends Component {


  constructor(props) {
    super(props);

    this.state = {};
  }
  static navigationOptions = { header: null }

  run = () => {
    this.props.navigation.navigate("steps");
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Welcome");}} >
          <Image
            style={styles.imgb}
            source={require("../Images/bw.png")}
          />
        </TouchableOpacity>
        <View style={{}}>
          <TouchableOpacity onPress={this.workoutz}>
            <Image
              style={styles.imgw}
              source={require("../Images/gym-workout.jpg")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.foodz}>
          <Image
            style={styles.imgf}
            source={require("../Images/dark-mood.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.run}>
          <Image
            style={styles.imgs}
            source={require("../Images/sonic.jpg")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  imgw: {
    width: WIDTH,
    height: (HEIGHT / 3 - 5),
  },
  imgf: {
    width: WIDTH,
    height: HEIGHT / 3,
  },
  imgs: {
    width: WIDTH,
    height: HEIGHT / 3 + 5,
  },
  imgb: {
    width: WIDTH,
    height: 60
  }
});
