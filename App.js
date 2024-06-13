import { StyleSheet, Text, View } from "react-native";

import EntryScreen from "./screens/EntryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RoadmapScreen from "./screens/RoadmapScreen";
import TopicDetailScreen from "./screens/TopicDetailScreen";
import { useGetCoursesQuery } from "./services/course-services";

import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import LoginScreen from "./screens/LoginScreen";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import { useFocusEffect } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) return;

        const decodedToken = jwtDecode(storedToken);

        const expirationTime = decodedToken.exp * 1000;

        const expirationAfterOneHour = Date.now() + 5 * 60 * 1000;

        const isExpired = expirationAfterOneHour > expirationTime;

        if (isExpired) {
          await AsyncStorage.removeItem("token");
        } else {
          await AsyncStorage.removeItem("token");
          //setToken(storedToken);
          console.log("token deleted");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="RoadmapScreen" component={RoadmapScreen} />
            <Stack.Screen
              name="TopicDetailScreen"
              component={TopicDetailScreen}
            />

            <Stack.Screen name="EntryScreen" component={EntryScreen} />

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
