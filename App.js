import { StyleSheet, Text, View } from "react-native";

import EntryScreen from "./screens/EntryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RoadmapScreen from "./screens/RoadmapScreen";
import TopicDetailScreen from "./screens/TopicDetailScreen";
import { useGetCoursesQuery } from "./services/course-services";

import { Provider } from "react-redux";
import { store } from "./store";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="EntryScreen" component={EntryScreen} />
            <Stack.Screen name="RoadmapScreen" component={RoadmapScreen} />
            <Stack.Screen
              name="TopicDetailScreen"
              component={TopicDetailScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
