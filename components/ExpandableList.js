import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { STYLES } from "../utils/constants";
const ExpandableList = ({ topic }) => {
  const [expand, setExpand] = useState(false);

  return (
    <View
      style={{
        ...expandableListStyles.container,
        ...STYLES["shadow-2"],
      }}>
      <View style={expandableListStyles["list-container"]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {
            <View
              style={{
                ...expandableListStyles.circle,
                backgroundColor: topic.level,
              }}></View>
          }

          <Text style={expandableListStyles.text}>{topic.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox containerStyle={{ padding: 0, margin: 0 }}></CheckBox>

          <Pressable
            style={expandableListStyles["down-arrow-container"]}
            onPress={() => {
              setExpand((prev) => !prev);
            }}>
            {!expand ? (
              <Image
                source={require("../assets/images/down-arrow.png")}
                style={expandableListStyles["down-arrow"]}
              />
            ) : (
              <Image
                source={require("../assets/images/up-arrow.png")}
                style={expandableListStyles["down-arrow"]}
              />
            )}
          </Pressable>
        </View>
      </View>
      {expand && (
        <View>
          <View style={expandableListStyles["expand-view-container"]}>
            <View
              style={{
                ...expandableListStyles.circle,
                backgroundColor: "#000",
                width: 8,
                height: 8,
              }}></View>
            <Text>Learn HTML</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const expandableListStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 0,

    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100",
    marginBottom: 10,
  },

  "list-container": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  circle: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "green",
    marginRight: 10,
    marginLeft: 10,
  },
  "down-arrow-container": {
    // position: "absolute",
    // top: 12,
    // right: 10,
  },
  "down-arrow": {
    width: 25,
    height: 25,
  },

  text: {
    fontSize: 14,
    textTransform: "capitalize",
    fontFamily: "font-family-2",
    letterSpacing: 0.5,
  },

  "expand-view-container": {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
});

export default ExpandableList;
