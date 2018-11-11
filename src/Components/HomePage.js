import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
} from "react-native";

var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }
  static navigationOptions = { header: null }
  goFood = () => {
    this.props.navigation.navigate("foodMainPage");
  }
  goRun = () => {
    this.props.navigation.navigate("steps");
  }
  logOut = () => {
    AsyncStorage.clear().then((v) => this.props.navigation.navigate("Welcome"));
  }
  goToProfile = async () => {
    await AsyncStorage.getItem("user").then((v) => {
      this.props.navigation.navigate("profile", { user: JSON.parse(v) })
    })
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.goToProfile} style={styles.logOutProfileBtns} >
            <Text>פרופיל</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logOut} style={styles.logOutProfileBtns} >
            <Text>התנתק</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.workOut}>
            <Image
              style={styles.imageSize}
              source={{ uri: siteImages + 'workoutPic.jpg' }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goFood}>
            <Image
              style={styles.imageSize}
              source={{ uri: siteImages + 'foodPic.png' }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goRun}>
            <Image
              style={styles.imageSize}
              source={{ uri: siteImages + 'jogPic.jpg' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = {
  imageSize: {
    width: WIDTH,
    height: (HEIGHT / 3) - 20,
  },
  logOutProfileBtns: {
    width: WIDTH / 2,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#DDD",
  },

}