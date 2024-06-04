import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { COLORS } from "../utils/constants";

const CircularProgress = ({ size, tintColor, backgroundColor, styles }) => {
  return (
    <AnimatedCircularProgress
      size={size ? size : 110}
      width={10}
      fill={60}
      tintColor={tintColor ? tintColor : COLORS.green}
      backgroundColor={backgroundColor ? backgroundColor : COLORS.red}>
      {() => (
        <Text style={{ ...styles, fontFamily: "font-family-2" }}>101/220</Text>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
