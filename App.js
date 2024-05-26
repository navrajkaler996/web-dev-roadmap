import { StyleSheet, Text, View } from "react-native";

import EntryScreen from "./screens/EntryScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <EntryScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
