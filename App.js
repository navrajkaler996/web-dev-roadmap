import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RoadmapScreen from "./screens/RoadmapScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RoadmapScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
