import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import RoadmapScreen from "../screens/RoadmapScreen";
import TopicDetailScreen from "../screens/TopicDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RoadmapScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        name="RoadmapScreen"
        component={RoadmapScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TopicDetailScreen"
        component={TopicDetailScreen}
      />
    </Stack.Navigator>
  );
};

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        name="RoadmapScreen"
        component={RoadmapScreenStack}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;
