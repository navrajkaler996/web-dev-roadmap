import React, { useRef } from "react";
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
  useAnimatedValue,
  Animated as Animated2,
  Image,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useFonts } from "expo-font";

import { Button, ButtonGroup } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import Carousel from "../components/Carousel.js";

const BASE_HEADING_FONT_SIZE = 20;
const adjustedFontSize = PixelRatio.getFontScale() * BASE_HEADING_FONT_SIZE;

const RoadmapScreen = () => {
  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Poppins-Regular.ttf"),
    "font-family-2": require("../assets/fonts/Poppins-Bold.ttf"),
    "font-family-3": require("../assets/fonts/Poppins-Italic.ttf"),
  });

  return (
    <>
      <LinearGradient
        colors={["#0172B2", "#001645"]}
        style={roadmapStyles.container}>
        <Image
          source={require("../assets/images/roadmap-logo.png")}
          style={{
            width: 200,
            height: 200,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <View style={{ alignItems: "left", marginLeft: 10 }}>
          <Text style={roadmapStyles["text-1"]}>A proper path</Text>
          <Text style={roadmapStyles["text-1"]}>A proper skill set</Text>
          <Text style={roadmapStyles["text-1"]}>A proper web developer</Text>
        </View>
        <View
          id="headings-container-2"
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: 20,
          }}>
          {/* <Text style={roadmapStyles["text-primary"]}>
            Follow • Learn • Develop
          </Text> */}
          <Text style={roadmapStyles["text-primary"]}>Follow</Text>
          <Text style={roadmapStyles["text-primary"]}>Learn</Text>
          <Text style={roadmapStyles["text-primary"]}>Develop</Text>
          {/* <Text style={roadmapStyles["text-secondary"]}>
            A roadmap helps you learn the right skills in the right order,
            giving you a clear path from beginner to building your own web apps.
          </Text> */}
        </View>

        <View style={{ position: "absolute", bottom: 20 }}>
          <Carousel />
        </View>
      </LinearGradient>
      <LinearGradient
        colors={["#fff", "#fff"]}
        style={roadmapStyles["container-2"]}>
        <View>
          {/* <Text style={roadmapStyles["text-primary"]}>
            Follow • Learn • Develop
          </Text> */}
          <View
            style={{
              marginTop: 50,
              // flexDirection: "row",
              // justifyContent: "center",
            }}>
            <Button
              title="GET STARTED"
              // type="outline"
              containerStyle={{ width: "100" }}
              buttonStyle={{
                borderColor: "#fff",
                borderRadius: 60,
                color: "#fff",
                paddingRight: 100,
                paddingLeft: 100,
                paddingTop: 20,
                paddingBottom: 20,

                backgroundColor: "#001645",
                fontFamily: "font-family-2",
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const roadmapStyles = StyleSheet.create({
  container: {
    flex: 0.8,
    // alignItems: "center",
    // marginRight: 6,
    // marginLeft: 6,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 100,
    position: "relative",
  },
  "container-2": {
    flex: 0.2,
    alignItems: "center",
    marginRight: 6,
    marginLeft: 6,
    marginTop: 6,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  "text-1-container": {
    flex: 1,
    marginTop: 120,
  },
  "text-1": {
    color: "#fff",
    fontSize: adjustedFontSize,
    letterSpacing: "1",
    marginBottom: 10,
    fontFamily: "font-family-2",
  },
  "text-primary-container": {
    position: "absolute",
    top: 140,
  },
  "text-primary": {
    color: "#fff",
    textAlign: "center",
    fontSize: 26,
    letterSpacing: "1",
    fontFamily: "font-family-2",
    marginTop: 10,
    marginBottom: 10,
  },
  "text-secondary": {
    color: "#fff",
    fontFamily: "font-family-1",
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  "text-background": {
    backgroundColor: "#001645",
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 30,
    paddingBottom: 30,

    borderRadius: 20,
  },

  "button-container": {
    position: "absolute",
    bottom: 300,
    left: "auto",
    right: "auto",
  },
  "images-container-1": {
    flexDirection: "row",
    justifyContent: "center",
  },
  "image-styles": {
    width: 60,
    height: 60,
  },
});

export default RoadmapScreen;
