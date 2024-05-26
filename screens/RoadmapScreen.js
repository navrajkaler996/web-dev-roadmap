import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CircularProgress from "../components/CircularProgress";
import { useFonts } from "expo-font";
import ProgressStepBar from "../components/ProgressStepBar";

const RoadmapScreen = () => {
  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Jost-Black.ttf"),
    "font-family-2": require("../assets/fonts/Jost-Bold.ttf"),
    "font-family-3": require("../assets/fonts/Jost-Italic.ttf"),
    "font-family-4": require("../assets/fonts/Jost-SemiBold.ttf"),
    "Lato-regular": require("../assets/fonts/Lato-Black.ttf"),
  });
  return (
    <View style={roadmapStyles.conatiner}>
      <View id="progress" style={roadmapStyles["progress-container"]}>
        <CircularProgress />

        <ProgressStepBar />
      </View>
    </View>
  );
};

const roadmapStyles = StyleSheet.create({
  conatiner: { flex: 1, backgroundColor: "#F5F5F5" },

  "progress-container": {
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 0,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default RoadmapScreen;
