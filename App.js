import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RoadmapScreen from "./screens/RoadmapScreen";

export default function App() {
  return (
    <LinearGradient colors={["#0172B2", "#001645"]} style={styles.container}>
      <View>
        <RoadmapScreen />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
