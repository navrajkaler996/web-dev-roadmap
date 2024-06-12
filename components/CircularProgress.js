import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { COLORS } from "../utils/constants";

const CircularProgress = ({
  progressData,

  tintColor,
  backgroundColor,
  styles,
}) => {
  return (
    <AnimatedCircularProgress
      size={110}
      width={10}
      fill={Math.floor(
        (progressData.totalTopicsCompleted / progressData.totalTopics) * 100
      )}
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
