import { StyleSheet, Text, View } from "react-native";

import EntryScreen from "./screens/EntryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RoadmapScreen from "./screens/RoadmapScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="EntryScreen" component={EntryScreen} />
          <Stack.Screen name="RoadmapScreen" component={RoadmapScreen} />
          {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
