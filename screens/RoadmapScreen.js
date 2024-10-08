import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useFonts } from "expo-font";

import CircularProgress from "../components/CircularProgress";
import ProgressStepBar from "../components/ProgressStepBar";
import Steps, { getTopicsCompletedForCourse } from "../components/Steps";
import Loader from "../components/Loader";

import { useGetCoursesQuery } from "../services/course-services";

import useFetchUser from "../hooks/useFetchUser";

import { COLORS, STYLES } from "../utils/constants";
import { useSelector } from "react-redux";
import { Text } from "react-native";

const modifyList = (list, userData) => {
  return list.map((course) => {
    if (userData?.coursesStarted?.includes(course.id)) {
      const temp = {
        started: true,
        completed: false,
      };

      return {
        ...course,
        ...temp,
      };
    } else if (userData?.coursesCompleted?.includes(course.id)) {
      const temp = {
        started: true,
        completed: true,
      };
      return {
        ...course,
        ...temp,
      };
    }

    return course;
  });
};

const RoadmapScreen = ({ route, navigation }) => {
  const loggedIn = useSelector((state) => state.loggedIn);

  const { data, isLoading, isError, error } = useGetCoursesQuery();

  const [userData, setUserData] = useState(undefined);

  const {
    fetchUser,
    isLoading: userIsLoading,
    error: userError,
  } = useFetchUser();

  const [progressData, setProgressData] = useState({
    totalTopics: undefined,
    totalTopicsCompleted: undefined,
    totalCourses: undefined,
    totalCoursesCompleted: undefined,
  });

  const [coursesList, setCoursesList] = useState([]);

  const [coursesCompleted, setCoursesCompleted] = useState(0);

  const { params } = route;
  const { activeTabHandler, setTopicDetailTitle } = params;

  useEffect(() => {
    if (!isLoading && data?.length > 0 && userData != undefined) {
      //Finding total number of topics
      const totalTopics = data.reduce((total, item) => {
        return total + item.topics?.length;
      }, 0);

      //Finding total number of topics completed by user
      const totalTopicsCompleted = userData.topicsCompleted?.length;

      setProgressData((prev) => {
        return {
          totalTopics: totalTopics,
          totalTopicsCompleted: totalTopicsCompleted,
        };
      });
    }
  }, [isLoading, data, userData]);

  useEffect(() => {
    if (data && userData) {
      const list = modifyList(data, userData);
      // let c = 0;
      // const courses = list?.forEach((item) => {
      //   c = c + getTopicsCompletedForCourse(item, userData.topicsCompleted);
      // });

      // console.log("----", c);
      let coursesCompleted = 0;
      list.forEach((item) => {
        let count = 0;

        item?.topics?.forEach((topic) => {
          if (userData.topicsCompleted?.includes(topic.id)) count++;
        });
        if (count === item.topics.length) coursesCompleted++;
      });
      setCoursesCompleted(coursesCompleted);
      if (list?.length > 0) setCoursesList(list);
    }
  }, [data, userData]);

  useFocusEffect(
    React.useCallback(() => {
      const callFetchUser = async (loggedIn) => {
        const data = await fetchUser(loggedIn?.email);

        if (!data || data?.error) {
          navigation.navigate("ErrorScreen");
        } else if (data) {
          setUserData(data);
        }
      };

      if (activeTabHandler) {
        activeTabHandler("home");
      }

      callFetchUser(loggedIn);
    }, [loggedIn])
  );

  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Jost-Black.ttf"),
    "font-family-2": require("../assets/fonts/Jost-Bold.ttf"),
    "font-family-3": require("../assets/fonts/Jost-Italic.ttf"),
    "font-family-4": require("../assets/fonts/Jost-SemiBold.ttf"),
    "lato-regular": require("../assets/fonts/Lato-Regular.ttf"),
    "lato-black": require("../assets/fonts/Lato-Black.ttf"),
  });

  const onPress = (item) => {
    navigation.navigate("TopicDetailScreen", { item, userData });
  };

  return (
    <>
      {isLoading &&
      !progressData.totalTopics &&
      !progressData.totalTopicsCompleted ? (
        <Loader />
      ) : (
        <>
          <View>
            <View
              id="progress"
              style={{
                ...roadmapStyles["progress-container"],
                ...roadmapStyles["resusable-conatiner"],
                ...STYLES["shadow-2"],
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                  }}>
                  <View
                    style={{
                      ...roadmapStyles["circular-progress-text-container"],
                    }}>
                    <Text style={roadmapStyles["text-1"]}>
                      {coursesCompleted}/{coursesList?.length}{" "}
                    </Text>
                    <Text style={roadmapStyles["text-2"]}>courses</Text>
                    <Text style={roadmapStyles["text-2"]}>completed </Text>
                  </View>
                  <View
                    style={{
                      ...roadmapStyles["circular-progress-text-container"],
                    }}>
                    <Text style={roadmapStyles["text-1"]}>
                      {progressData.totalTopicsCompleted}/
                      {progressData.totalTopics}{" "}
                    </Text>
                    <Text style={roadmapStyles["text-2"]}>topics</Text>
                    <Text style={roadmapStyles["text-2"]}>completed </Text>
                  </View>
                  <View
                    style={{
                      ...roadmapStyles["circular-progress-text-container"],
                    }}>
                    <Text style={roadmapStyles["text-1"]}>0/0 </Text>
                    <Text style={roadmapStyles["text-2"]}>modules</Text>
                    <Text style={roadmapStyles["text-2"]}>completed </Text>
                  </View>
                </View>
                <ProgressStepBar />
              </View>
            </View>
          </View>
          {isLoading ? (
            <Loader />
          ) : (
            <ScrollView style={roadmapStyles.conatiner}>
              {coursesList &&
                coursesList?.length > 0 &&
                coursesList.map((item, i) => {
                  return (
                    <Steps
                      item={item}
                      index={i}
                      length={data.length}
                      onPress={onPress}
                      topicsCompleted={userData.topicsCompleted}
                      setTopicDetailTitle={setTopicDetailTitle}
                    />
                  );
                })}
            </ScrollView>
          )}
        </>
      )}
    </>
  );
};

const roadmapStyles = StyleSheet.create({
  conatiner: {
    flex: 1,

    backgroundColor: "#F5F5F5",
    paddingTop: 20,
  },

  "progress-container": {
    marginTop: 80,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 30,
  },

  "resusable-conatiner": {
    backgroundColor: "#fff",

    borderRadius: 0,
  },

  "steps-container": {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: "50%",
    height: 50,
    flex: 1,
    marginLeft: 20,
  },
  "steps-circle": {
    backgroundColor: "#fff",

    borderRadius: "50%",
    width: 50,
    height: 50,
  },

  "progress-line": {
    height: 60,
    width: 4,
    backgroundColor: "gray",
    marginLeft: 32,
    marginTop: 10,
    marginBottom: 10,
  },

  "shadow-1": {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },

  "circular-progress-text-container": {
    // backgroundColor: COLORS["btn-primary-1"],
    // justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    // paddingRight: 10,
    // paddingLeft: 10,
    width: 90,
  },

  "circular-progress-text": {
    fontSize: 12,

    textAlign: "center",

    fontFamily: "font-family-2",
    letterSpacing: 0.5,
  },
  "text-1": {
    fontSize: 20,

    textAlign: "center",

    fontFamily: "font-family-1",
  },
  "text-2": {
    fontSize: 12,

    textAlign: "center",

    fontFamily: "font-family-2",
    letterSpacing: 0.2,
  },
  "shadow-1": {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default RoadmapScreen;
