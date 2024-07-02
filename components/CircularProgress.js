import { View, Text, useWindowDimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { COLORS } from "../utils/constants";
import { useEffect, useState } from "react";

const CircularProgress = ({
  progressData,

  tintColor,
  backgroundColor,
  styles,
}) => {
  const windowWidth = useWindowDimensions().width;

  // const progressFill = Math.floor(
  //   (progressData.totalTopicsCompleted / progressData.totalTopics) * 100
  // );

  const [progressFill, setProgressFill] = useState(0);

  const progressSize = windowWidth * 0.25;

  useEffect(() => {
    const progressFillValue = Math.floor(
      (progressData.totalTopicsCompleted / progressData.totalTopics) * 100
    );

    setProgressFill(progressFillValue);
  });

  return (
    <AnimatedCircularProgress
      size={progressSize}
      width={10}
      fill={progressFill}
      tintColor={tintColor ? tintColor : COLORS.green}
      backgroundColor={backgroundColor ? backgroundColor : COLORS.red}
      delay={100}>
      {() => (
        <Text style={{ fontFamily: "font-family-2" }}>
          {progressData?.totalTopicsCompleted}/{progressData?.totalTopics}
        </Text>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
