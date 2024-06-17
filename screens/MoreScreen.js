import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../utils/constants";

const MoreScreen = ({ navigation, route }) => {
  useFocusEffect(
    React.useCallback(() => {
      route.params.activeTabHandler("more");
    }, [])
  );
  return (
    <View style={moreScreenStyles.container}>
      <Text style={moreScreenStyles.title}>Navraj</Text>
      <View style={moreScreenStyles["horizontal-line"]}></View>
      <View style={moreScreenStyles["list-container"]}>
        <View style={moreScreenStyles["list-item"]}>
          <Ionicons
            name="bar-chart"
            color={COLORS["btn-primary-1"]}
            size={30}
          />

          <Text style={moreScreenStyles["list-text"]}>My porgress</Text>
        </View>
        <View style={moreScreenStyles["list-item"]}>
          <Ionicons
            name="document-text"
            color={COLORS["btn-primary-1"]}
            size={30}
          />

          <Text style={moreScreenStyles["list-text"]}>Feedback</Text>
        </View>
        <View style={moreScreenStyles["list-item"]}>
          <Ionicons name="heart" color={COLORS["btn-primary-1"]} size={30} />

          <Text style={moreScreenStyles["list-text"]}>Rate it</Text>
        </View>
      </View>
      <View
        style={{
          ...moreScreenStyles["horizontal-line"],
          margin: 0,
          marginTop: 20,
        }}></View>
      <View style={{ ...moreScreenStyles["list-item"], marginLeft: 20 }}>
        <Ionicons name="power" color={COLORS["btn-primary-1"]} size={30} />

        <Text style={{ ...moreScreenStyles["list-text"], fontWeight: "bold" }}>
          Log out
        </Text>
      </View>
    </View>
  );
};

const moreScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  title: {
    marginLeft: 20,
    fontFamily: "font-family-1",
    fontSize: 24,
    marginBottom: 20,
  },
  "horizontal-line": {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
  },
  "list-item": {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  "list-container": {
    marginLeft: 20,
    marginRight: 20,
  },
  "list-text": {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
});
export default MoreScreen;
