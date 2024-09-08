import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/constants";

import * as Progress from "react-native-progress";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const ProgressStepBar = () => {
  return (
    <View>
      <View>
        <Text
          style={{
            position: "absolute",
            left: -20,
            top: 15,
            fontFamily: "font-family-2",
          }}>
          Beginner
        </Text>
        <Progress.Bar
          progress={0.6}
          width={300}
          color={COLORS["btn-primary-1"]}
        />
        <Text
          style={{
            position: "absolute",
            right: -20,
            top: 15,
            fontFamily: "font-family-2",
          }}>
          Advanced
        </Text>
      </View>
    </View>
  );

  // return (
  //   <ProgressSteps
  //     activeStepIconBorderColor="#2BC0E4"
  //     //   progressBarColor="#2BC0E4"
  //     activeLabelColor="#000"
  //     labelFontFamily="font-family-1">
  //     <ProgressStep
  //       nextBtnStyle={{ display: "none" }}
  //       label="Beginner"></ProgressStep>
  //     <ProgressStep
  //       nextBtnStyle={{ display: "none" }}
  //       label="Intermediate"></ProgressStep>
  //     <ProgressStep
  //       nextBtnStyle={{ display: "none" }}
  //       label="Advanced"></ProgressStep>
  //   </ProgressSteps>
  // );
};

const progressStepBarStyles = StyleSheet.create({
  line: {
    height: 3,
    width: 250,

    borderRadius: 20,
    backgroundColor: COLORS["btn-primary-1"],
  },
  "text-1": {
    fontSize: 20,

    textAlign: "center",

    fontFamily: "font-family-1",
  },
  "text-2": {
    fontSize: 14,

    textAlign: "center",
    marginBottom: 10,
    fontFamily: "font-family-1",
    letterSpacing: 0.2,
  },
});

export default ProgressStepBar;
