import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";

import CircularProgress from "../components/CircularProgress";
import { useFonts } from "expo-font";
import ProgressStepBar from "../components/ProgressStepBar";
import Steps from "../components/Steps";

import { topics as list } from "../data/data";

import { STYLES } from "../utils/constants";
import { useGetCoursesQuery } from "../services/course-services";

const RoadmapScreen = ({ navigation }) => {
  const { data, isLoading, isError, error } = useGetCoursesQuery();

  useEffect(() => {}, [isLoading, data]);

  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Jost-Black.ttf"),
    "font-family-2": require("../assets/fonts/Jost-Bold.ttf"),
    "font-family-3": require("../assets/fonts/Jost-Italic.ttf"),
    "font-family-4": require("../assets/fonts/Jost-SemiBold.ttf"),
    "lato-regular": require("../assets/fonts/Lato-Regular.ttf"),
    "lato-black": require("../assets/fonts/Lato-Black.ttf"),
  });

  const onPress = (item) => {
    navigation.navigate("TopicDetailScreen", { item });
  };

  return (
    <>
      <View>
        <View
          id="progress"
          style={{
            ...roadmapStyles["progress-container"],
            ...roadmapStyles["resusable-conatiner"],
            ...STYLES["shadow-2"],
            borderRadius: 10,
          }}>
          <CircularProgress />
          <ProgressStepBar />
        </View>
      </View>

      <ScrollView style={roadmapStyles.conatiner}>
        {list.map((item, i) => {
          return (
            <Steps
              item={item}
              index={i}
              length={list.length}
              onPress={onPress}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const roadmapStyles = StyleSheet.create({
  conatiner: {
    flex: 1,

    backgroundColor: "#F5F5F5",
    paddingTop: 20,
  },

  "progress-container": {
    marginTop: 80,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },
});

export default RoadmapScreen;
