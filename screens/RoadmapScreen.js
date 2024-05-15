import React, { useRef } from "react";
import { StyleSheet, Text, View, useAnimatedValue } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const RoadmapScreen = () => {
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
    <View id="roadmap-container" style={roadmapStyles["text-1-container"]}>
      <Animated.View style={[animatedText1]}>
        <Text style={roadmapStyles["text-1"]}>Only roadmap </Text>
      </Animated.View>
      <Animated.View style={[animatedText2]}>
        <Text style={roadmapStyles["text-1"]}>You need to become</Text>
      </Animated.View>
      <Animated.View style={[animatedText3]}>
        <Text style={roadmapStyles["text-1"]}>A fullstack Web developer!</Text>
      </Animated.View>
    </View>
  );
};

const roadmapStyles = StyleSheet.create({
  container: {},
  "text-1-container": {
    flex: 1,
    marginTop: 120,
    marginLeft: -50,
  },
  "text-1": {
    color: "#fff",
    fontSize: "24",
    // textTransform: "uppercase",
    letterSpacing: "1",
    marginBottom: 10,
  },
  "text-3": {
    color: "#fff",
    fontSize: "24",
    textTransform: "uppercase",
    letterSpacing: "1",
    marginBottom: 10,
    fontSize: 30,
  },
});

export default RoadmapScreen;
