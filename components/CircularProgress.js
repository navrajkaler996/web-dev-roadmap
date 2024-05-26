import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const CircularProgress = () => {
  return (
    <AnimatedCircularProgress
      size={110}
      width={10}
      fill={60}
      tintColor="green"
      backgroundColor="red">
      {() => <Text style={{ fontFamily: "font-family-1" }}>101/220</Text>}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
