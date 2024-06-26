import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { COLORS, STYLES } from "../utils/constants";
import { useUpdateTopicStatusMutation } from "../services/user-services";

const ExpandableList = ({
  key,
  topic,
  topicsCompleted,
  userId,
  updateProgressInUI,
}) => {
  const [updateTopicStatus] = useUpdateTopicStatusMutation();

  const [expand, setExpand] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (topicsCompleted && topicsCompleted?.includes(topic.id))
      setIsCompleted(true);
  }, []);

  const updateTopicHandler = (topic, userId, isCompleted) => {
    updateProgressInUI(topic, !isCompleted);
    setIsCompleted((prev) => !prev);

    updateTopicStatus({
      userId,
      topicId: topic.id,
    })
      .then(() => {
        console.log("Status updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View
      key={key}
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
          <CheckBox
            containerStyle={{ padding: 0, margin: 0, alignSelf: "center" }}
            checked={isCompleted}
            checkedColor={COLORS["btn-primary-1"]}
            uncheckedColor={COLORS.red}
            onIconPress={(value) =>
              updateTopicHandler(topic, userId, isCompleted)
            }></CheckBox>

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
    marginBottom: 15,
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
    borderRadius: 5,
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
    width: 20,
    height: 20,
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
