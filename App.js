import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import EntryScreen from "./screens/EntryScreen";
import LoginScreen from "./screens/LoginScreen";

import BottomNavigationBar from "./components/BottomNavigationBar";

import { store } from "./store";

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
            <Stack.Screen name="LoginScreen" component={LoginScreen} />

            <Stack.Screen
              screenOptions={{
                headerShown: false,
              }}
              name="RoadmapScreen"
              component={BottomNavigationBar}
            />
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
