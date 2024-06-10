import React, { useRef } from "react";
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Animated as Animated2,
  Image,
} from "react-native";

import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import Carousel from "../components/Carousel.js";
import Button from "../components/Button.js";
import { COLORS } from "../utils/constants.js";

const BASE_HEADING_FONT_SIZE = 24;
const adjustedFontSize = PixelRatio.getFontScale() * BASE_HEADING_FONT_SIZE;

const EntryScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Jost-Black.ttf"),
    "font-family-2": require("../assets/fonts/Jost-Bold.ttf"),
    "font-family-3": require("../assets/fonts/Jost-Italic.ttf"),
    "font-family-4": require("../assets/fonts/Jost-SemiBold.ttf"),
    "Lato-regular": require("../assets/fonts/Lato-Black.ttf"),
  });

  return (
    <>
      <LinearGradient
        colors={["#68d8d6", "#c4fff9"]}
        style={entryScreenStyles.container}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={entryScreenStyles["text-1"]}>Web dev roadmap</Text>
          <Text style={entryScreenStyles["text-2"]}>
            A guide to become a full stack web developer
          </Text>
        </View>
        <Image
          source={require("../assets/images/logo-demo.png")}
          style={{
            width: "100%",
            height: 300,
            marginLeft: "auto",
            marginRight: "auto",
            position: "absolute",
            bottom: 0,
          }}
        />
      </LinearGradient>

      <View
        style={{
          ...entryScreenStyles["container-2"],
        }}>
        <View>
          <View
            style={{
              marginTop: 50,
            }}>
            <View>
              <Carousel />
            </View>
            <Button
              title="Start your journey"
              styles={{
                width: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: COLORS["btn-primary-1"],
                borderRadius: 20,
              }}
              titleStyles={{
                fontSize: 14,
                letterSpacing: 1,
                fontFamily: "font-family-2",
              }}
              image="right-arrow"
              onPress={() => navigation.navigate("LoginScreen")}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const entryScreenStyles = StyleSheet.create({
  container: {
    flex: 0.6,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 80,
    position: "relative",
  },
  "container-2": {
    flex: 0.4,
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
    color: "#000",
    fontSize: adjustedFontSize + 2,
    letterSpacing: "1.5",
    marginBottom: 10,
    fontFamily: "font-family-1",
    textTransform: "uppercase",
  },
  "text-2": {
    color: "#000",
    fontSize: adjustedFontSize - 6,
    letterSpacing: "1.5",
    marginBottom: 10,
    fontFamily: "Lato-regular",

    textAlign: "center",
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

export default EntryScreen;
