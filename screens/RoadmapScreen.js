import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useFonts } from "expo-font";

import CircularProgress from "../components/CircularProgress";
import ProgressStepBar from "../components/ProgressStepBar";
import Steps from "../components/Steps";
import Loader from "../components/Loader";

import { useGetCoursesQuery } from "../services/course-services";

import useFetchUser from "../hooks/useFetchUser";

import { COLORS, STYLES } from "../utils/constants";
import { useSelector } from "react-redux";

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
  });

  const [coursesList, setCoursesList] = useState([]);

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
              <CircularProgress
                progressData={progressData}
                tintColor={COLORS.green}
                backgroundColor={COLORS.red}
              />
              <ProgressStepBar />
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
});

export default RoadmapScreen;
