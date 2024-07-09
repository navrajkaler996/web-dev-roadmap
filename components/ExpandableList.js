import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { COLORS, STYLES } from "../utils/constants";
import { useUpdateTopicStatusMutation } from "../services/user-services";
import { useGetTopicLinksQuery } from "../services/topic-services";
import { Ionicons } from "@expo/vector-icons";
import Loader from "./Loader";

const links = [{ id: 1 }, { id: 1 }];

const ExpandableList = ({
  key,
  topic,
  topicsCompleted,
  userId,
  updateProgressInUI,
}) => {
  const {
    data: topicLinksData,
    error: topicLinksError,
    isLoading: topicLinksIsLoading,
  } = useGetTopicLinksQuery(topic?.id);

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

          {/* <Pressable
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
          </Pressable> */}
        </View>
      </View>
      {/* {expand && (
        <View style={{ marginLeft: 0, marginTop: 4 }}>
          {topicLinksIsLoading && <Loader />}
          {!topicLinksIsLoading &&
            topicLinksData?.length > 0 &&
            topicLinksData.map((link) => {
              return (
                <View style={expandableListStyles["expand-view-container"]}>
                  <Ionicons
                    name="link-outline"
                    color={COLORS["btn-primary-1"]}
                    size={16}
                  />
                  <Text
                    style={expandableListStyles.link}
                    onPress={() => Linking.openURL(link.link)}>
                    {link.title}
                  </Text>
                </View>
              );
            })}
        </View>
      )} */}
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
    marginBottom: 20,
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
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  link: {
    // marginTop: 10,
    fontSize: 12,
    letterSpacing: 0.3,
    fontFamily: "Lato-Regular",
    color: "#0070E0",
    marginLeft: 5,
  },
});

export default ExpandableList;
