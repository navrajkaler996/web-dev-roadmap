import React, { useRef } from "react";
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
  useAnimatedValue,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";

const BASE_HEADING_FONT_SIZE = 24;
const adjustedFontSize = PixelRatio.getFontScale() * BASE_HEADING_FONT_SIZE;

const RoadmapScreen = () => {
  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Merriweather-Regular.ttf"),
    "font-family-2": require("../assets/fonts/Merriweather-Bold.ttf"),
  });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  const offset1 = useSharedValue(300);
  const offset2 = useSharedValue(600);
  const offset3 = useSharedValue(900);

  const animatedText1 = useAnimatedStyle(() => ({
    transform: [{ translateX: offset1.value }],
  }));
  const animatedText2 = useAnimatedStyle(() => ({
    transform: [{ translateX: offset2.value }],
  }));
  const animatedText3 = useAnimatedStyle(() => ({
    transform: [{ translateX: offset3.value }],
  }));

  React.useEffect(() => {
    offset1.value = withRepeat(withTiming(0, { duration: 700 }), 1, true);
    offset2.value = withRepeat(withTiming(0, { duration: 1400 }), 1, true);
    offset3.value = withRepeat(withTiming(0, { duration: 2100 }), 1, true);
  }, []);
  return (
    <View>
      <View id="roadmap-container" style={roadmapStyles["text-1-container"]}>
        <Animated.View style={[animatedText1]}>
          <Text style={roadmapStyles["text-1"]}>Only roadmap </Text>
        </Animated.View>
        <Animated.View style={[animatedText2]}>
          <Text style={roadmapStyles["text-1"]}>You need to become</Text>
        </Animated.View>
        <Animated.View style={[animatedText3]}>
          <Text style={roadmapStyles["text-1"]}>
            A fullstack Web developer!
          </Text>
        </Animated.View>
        <View style={roadmapStyles["text-primary-container"]}>
          <View style={roadmapStyles["text-background"]}>
            <Text style={roadmapStyles["text-primary"]}>
              Learning web development is not tough
            </Text>
          </View>
          <View style={roadmapStyles["text-background"]}>
            <Text style={{ ...roadmapStyles["text-primary"] }}>
              If you are following a proper roadmap.
            </Text>
          </View>
          <View style={roadmapStyles["text-background"]}>
            <Text style={{ ...roadmapStyles["text-primary"] }}>
              We will help you!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const roadmapStyles = StyleSheet.create({
  container: {},
  "text-1-container": {
    flex: 1,
    marginTop: 120,
    // marginLeft: -50,
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
    fontSize: 16,
    letterSpacing: "1",
    fontFamily: "font-family-1",
  },
  "text-background": {
    backgroundColor: "#001645",
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default RoadmapScreen;
