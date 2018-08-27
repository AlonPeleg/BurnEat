import React from "react";
import { Image, Dimensions, View, Text, StyleSheet } from "react-native";

const BackgroundImage = () => {
    const { containerStyle } = styles;
    return (
        <View>
            <Text>IMUG</Text>
            <Image
                source={require('../Images/Slod.jpg')} style={containerStyle}
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
