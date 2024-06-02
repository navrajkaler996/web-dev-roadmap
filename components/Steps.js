import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const Steps = ({ item, index, length, onPress }) => {
  const [expand, setExpand] = useState(false);

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
            backgroundColor: item.started ? "green" : "red",
          }}>
          <Text style={{ color: "#fff", fontSize: "20" }}>{item.id + 1}</Text>
        </View>
        <View
          style={{
            ...stepsStyles["steps-container"],
            ...stepsStyles["resusable-conatiner"],
            ...stepsStyles["shadow-1"],
            marginBottom: !expand ? 100 : 20,
          }}>
          <Text style={stepsStyles["text-title"]}>{item.title}</Text>
          <Text style={stepsStyles["text-modules"]}>12/20</Text>
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
                    onPress(item);
                  }}
                  styles={{}}
                />
                {/* <Button
                  title="Start"
                  containerStyle={{
                    width: 300,
                    marginHorizontal: "auto",
                    marginVertical: 5,
                  }}
                  buttonStyle={{
                    color: "red",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                  }}
                  titleStyle={{
                    color: "#fff",
                    fontFamily: "Lato-regular",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                /> */}
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
              top: 50,
              left: -8,
              height: expand ? 130 : 70,
            }}></View>
        )}
      </View>
    </>
  );
};

const stepsStyles = StyleSheet.create({
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
    flexDirection: "column",
    borderRadius: "50%",
    height: "auto",
    flex: 1,
    marginLeft: 20,
    paddingTop: 2,

    paddingLeft: 8,
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
    minHeight: 80,

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
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },

  "text-title": {
    fontFamily: "font-family-2",
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
