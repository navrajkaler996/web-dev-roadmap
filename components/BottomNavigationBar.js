import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import RoadmapScreen from "../screens/RoadmapScreen";
import TopicDetailScreen from "../screens/TopicDetailScreen";
import { COLORS } from "../utils/constants";
import { Text } from "react-native";
import MoreScreen from "../screens/MoreScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RoadmapScreenStack = ({ navigation, route }) => {
  const { params } = route;
  const { activeTabHandler } = params;

  const [topicDetailTitle, setTopicDetailTitle] = useState("");

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        name="RoadmapScreen"
        component={RoadmapScreen}
        initialParams={{ activeTabHandler, setTopicDetailTitle }}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: topicDetailTitle,
          headerBackTitle: "Home",
          headerTitleStyle: {
            fontFamily: "font-family-2",
            letterSpacing: 0.2,
          },
        }}
        name="TopicDetailScreen"
        component={TopicDetailScreen}
      />
    </Stack.Navigator>
  );
};

const BottomNavigationBar = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("home");

  const activeTabHandler = (active) => {
    if (active) setActiveTab(active);
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.setParams({ activeTabHandler });
    }, [])
  );
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarLabel: ({}) => (
            <Text style={{ color: COLORS["btn-primary-1"] }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={activeTab === "home" ? "home" : "home-outline"}
              color={COLORS["btn-primary-1"]}
              size={size}
            />
          ),
        }}
        name="RoadmapScreen"
        component={RoadmapScreenStack}
        navigation={navigation}
        initialParams={{ activeTabHandler }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarLabel: ({}) => (
            <Text style={{ color: COLORS["btn-primary-1"] }}>More</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={
                activeTab === "more"
                  ? "ellipsis-horizontal"
                  : "ellipsis-horizontal-outline"
              }
              color={COLORS["btn-primary-1"]}
              size={size}
            />
          ),
        }}
        name="MoreScreen"
        component={MoreScreen}
        navigation={navigation}
        initialParams={{ activeTabHandler }}

        // activeTabHandler={activeTabHandler}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;
