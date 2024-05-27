import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CircularProgress from "../components/CircularProgress";
import { useFonts } from "expo-font";
import ProgressStepBar from "../components/ProgressStepBar";
import Steps from "../components/Steps";

const list = [
  {
    id: 0,
    title: "Basics of web",
    description:
      "Before learning web development i.e. developing websites or web applications, you need to understand what is web and how it works.",
    started: true,
    completed: false,
    totalTopics: 21,
    essentialTopics: 7,
  },
  {
    id: 1,
    title: "HTML",
    started: false,
    completed: false,
    totalTopics: 21,
    essentialTopics: 7,
  },
  {
    id: 2,
    title: "CSS",
    started: false,
    completed: false,
    totalTopics: 21,
    essentialTopics: 7,
  },
];

const RoadmapScreen = () => {
  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Jost-Black.ttf"),
    "font-family-2": require("../assets/fonts/Jost-Bold.ttf"),
    "font-family-3": require("../assets/fonts/Jost-Italic.ttf"),
    "font-family-4": require("../assets/fonts/Jost-SemiBold.ttf"),
    "lato-regular": require("../assets/fonts/Lato-Regular.ttf"),
    "lato-black": require("../assets/fonts/Lato-Black.ttf"),
  });
  return (
    <View style={roadmapStyles.conatiner}>
      <View
        id="progress"
        style={{
          ...roadmapStyles["progress-container"],
          ...roadmapStyles["resusable-conatiner"],
          ...roadmapStyles["shadow-1"],
        }}>
        <CircularProgress />
        <ProgressStepBar />
      </View>

      {list.map((item, i) => {
        return <Steps item={item} index={i} length={list.length} />;
      })}
    </View>
  );
};

const roadmapStyles = StyleSheet.create({
  conatiner: { flex: 1, backgroundColor: "#F5F5F5" },

  "progress-container": {
    marginTop: 80,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  "resusable-conatiner": {
    backgroundColor: "#fff",

    borderRadius: 0,
  },

  "steps-container": {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: "50%",
    height: 50,
    flex: 1,
    marginLeft: 20,
  },
  "steps-circle": {
    backgroundColor: "#fff",

    borderRadius: "50%",
    width: 50,
    height: 50,
  },

  "progress-line": {
    height: 60,
    width: 4,
    backgroundColor: "gray",
    marginLeft: 32,
    marginTop: 10,
    marginBottom: 10,
  },

  "shadow-1": {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});

export default RoadmapScreen;
