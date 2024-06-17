import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { COLORS, STYLES } from "../utils/constants";

const Steps = ({
  item,
  index,
  length,
  onPress,
  topicsCompleted,
  setTopicDetailTitle,
}) => {
  const [expand, setExpand] = useState(false);

  //Function to find the total number of topics completed by the user
  //in the course being iterated
  const getTopicsCompletedForCourse = (topics, topicsCompleted) => {
    let count = 0;

    topics.forEach((topic) => {
      if (topicsCompleted?.includes(topic.id)) count++;
    });

    return count;
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",

          marginLeft: 10,
          marginRight: 10,
        }}>
        <View
          style={{
            ...stepsStyles["steps-circle"],
            ...stepsStyles["shadow-1"],
            backgroundColor:
              item.started && !item.completed ? COLORS.green : COLORS.red,
          }}>
          <Text
            style={{
              color: "#000",
              fontFamily: "font-family-1  ",
              fontSize: "20",
            }}>
            {item.id + 1}
          </Text>
        </View>
        <View
          style={{
            ...stepsStyles["steps-container"],
            ...stepsStyles["resusable-conatiner"],
            ...STYLES["shadow-2"],
            marginBottom: !expand ? 70 : 20,
          }}>
          <Text style={stepsStyles["text-title"]}>{item.title}</Text>
          <Text style={stepsStyles["text-modules"]}>
            {topicsCompleted &&
              getTopicsCompletedForCourse(item.topics, topicsCompleted)}
            /{item.topics?.length}
          </Text>
          <Pressable
            style={stepsStyles["down-arrow-container"]}
            onPress={() => {
              setExpand((prev) => !prev);
            }}>
            {!expand ? (
              <Image
                source={require("../assets/images/down-arrow.png")}
                style={stepsStyles["down-arrow"]}
              />
            ) : (
              <Image
                source={require("../assets/images/up-arrow.png")}
                style={stepsStyles["down-arrow"]}
              />
            )}
          </Pressable>
          {expand && (
            <View style={{ marginBottom: 5 }}>
              <Text style={stepsStyles["course-description"]}>
                {item.description}
              </Text>
              <View style={stepsStyles["course-description-topics-container"]}>
                <Image
                  source={require("../assets/images/exclamation.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text style={stepsStyles["course-essential-topics"]}>
                  {item.essentialTopics} not-to-be missed topics
                </Text>
              </View>
              <View style={stepsStyles["button-container"]}>
                <Button
                  title="start"
                  onPress={() => {
                    setTopicDetailTitle(item.title);
                    onPress(item);
                  }}
                  styles={{
                    marginLeft: "auto",
                    marginRight: "auto",

                    width: "100%",
                    backgroundColor: COLORS["btn-primary-1"],
                    // borderRadius: 20,
                    flexDirection: "row,",
                  }}
                  titleStyles={{
                    fontSize: 14,
                    letterSpacing: 1,
                    fontFamily: "font-family-2",
                  }}
                />
              </View>
            </View>
          )}
        </View>
        {index !== length - 1 && (
          <View
            style={{
              ...stepsStyles["progress-line"],
              ...stepsStyles["shadow-1"],
              position: "absolute",
              top: 55,
              left: -8,
              height: expand ? 130 : 50,
            }}></View>
        )}
      </View>
    </>
  );
};

const stepsStyles = StyleSheet.create({
  conatiner: { flex: 1, backgroundColor: "#5A5858" },

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
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
  },

  "steps-container": {
    flexDirection: "column",
    borderRadius: "50%",
    height: "auto",
    flex: 1,
    marginLeft: 20,
    paddingTop: 2,

    paddingLeft: 8,
    paddingRight: 8,
  },
  "steps-circle": {
    backgroundColor: "#fff",

    borderRadius: "50%",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  "progress-line": {
    minHeight: 20,

    width: 4,
    backgroundColor: "#fff",
    // marginLeft: 32,
    // marginTop: 10,
    // marginBottom: 10,
  },

  "shadow-1": {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },

  "text-title": {
    fontFamily: "font-family-1",
    letterSpacing: 0.7,
  },
  "text-modules": {
    fontFamily: "font-family-3",
    marginTop: 1,
    fontSize: 14,
  },
  "down-arrow-container": {
    position: "absolute",
    top: 12,
    right: 10,
  },

  "down-arrow": {
    width: 25,
    height: 25,
  },
  "progress-line": {
    height: 70,
    width: 4,
    backgroundColor: "gray",
    marginLeft: 32,
    marginTop: 10,
    marginBottom: 10,
  },

  "course-description": {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "lato-regular",
    letterSpacing: 0.7,
  },

  "course-description-topics-container": {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  "course-essential-topics": {
    marginLeft: 10,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: "lato-regular",
  },

  "button-container": {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Steps;
