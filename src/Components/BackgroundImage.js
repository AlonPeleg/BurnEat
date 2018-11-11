import React from "react";
import { Image, Dimensions, View, Text, StyleSheet } from "react-native";


var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';


const BackgroundImage = () => {
  const { containerStyle } = styles;
  return (
    <View>
      <Image
        source={{ uri: siteImages + 'backWelcome.png' }} style={containerStyle}
        style={styles.containerStyle}
      />
    </View>

  );
};
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const styles = {
  containerStyle: {
    width: WIDTH,
    height: HEIGHT,
    position: "absolute",
    resizeMode: "cover"
  }
};

// const styles = StyleSheet.create({
//   containerStyle: {
//     width: WIDTH,
//     height: HEIGHT
//   }
// })
export default BackgroundImage;
