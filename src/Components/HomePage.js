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

  goToPage = async (choosedPage) => {
    if (choosedPage === 1) {
      let userId;
      await AsyncStorage.getItem("user").then(v => userId = JSON.parse(v).Email);
      let currentStretch;
      let currentExc;
      await AsyncStorage.getItem(userId).then(v => {
        if (v) {
          console.log(v)
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
          AsyncStorage.setItem(userId, JSON.stringify({ stretchs: 0, exercise: 0 }))
          currentStretch = 0
          currentExc = 0;
        }
      })
      this.props.navigation.navigate("Fitness", { currentStretch, currentExc });
    }
    else if (choosedPage === 2) {
      this.props.navigation.navigate("foodMainPage");
    }
    else if (choosedPage === 3) {
      this.props.navigation.navigate("steps");
    }
    else if (choosedPage === 4) {
      await AsyncStorage.getItem("user").then((v) => {
        this.props.navigation.navigate("profile", { user: JSON.parse(v) })
      })
    }
    else if (choosedPage === 5) {
      AsyncStorage.removeItem("user").then((v) => this.props.navigation.navigate("Welcome"));
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.goToPage(4)} style={styles.logOutProfileBtns} >
            <Text>פרופיל</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.goToPage(5)} style={styles.logOutProfileBtns} >
            <Text>התנתק</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.goToPage(1)}>
            <Image
              style={styles.imageSize}
              source={{ uri: siteImages + 'workoutPic.jpg' }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.goToPage(2)}>
            <Image
              style={styles.imageSize}
              source={{ uri: siteImages + 'foodPic.png' }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.goToPage(3)}>
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