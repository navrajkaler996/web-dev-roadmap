import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { COLORS } from "../utils/constants";

const CircularProgress = ({
  progressData,
  size,
  tintColor,
  backgroundColor,
  styles,
}) => {
  console.log(progressData);
  return (
    <AnimatedCircularProgress
      size={size ? size : 110}
      width={10}
      fill={60}
      tintColor={tintColor ? tintColor : COLORS.green}
      backgroundColor={backgroundColor ? backgroundColor : COLORS.red}>
      {() => (
        <Text style={{ ...styles, fontFamily: "font-family-2" }}>
          {progressData?.totalTopicsCompleted}/{progressData?.totalTopics}
        </Text>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
