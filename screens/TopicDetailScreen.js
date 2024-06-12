import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import ExpandableList from "../components/ExpandableList";
import CircularProgress from "../components/CircularProgress";
import { COLORS, STYLES } from "../utils/constants";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const TopicDetailScreen = ({ route }) => {
  const { params } = route;

  const { item, userData } = params;

  const [topicsCount, setTopicsCount] = useState({
    red: 0,
    yellow: 0,
    green: 0,
    redCompleted: 0,
    yellowCompleted: 0,
    greenCompleted: 0,
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (item) {
        let red = (yellow = green = 0);
        let redCompleted = (yellowCompleted = greenCompleted = 0);

        item?.topics?.forEach((topic) => {
          if (topic.level === "red") red++;
          if (topic.level === "yellow") yellow++;
          if (topic.level === "green") green++;

          if (userData?.topicsCompleted?.includes(topic.id)) {
            if (topic.level === "red") redCompleted++;
            if (topic.level === "yellow") yellowCompleted++;
            if (topic.level === "green") greenCompleted++;
          }
        });

        setTopicsCount((prev) => {
          return {
            ...prev,
            red,
            yellow,
            green,
            redCompleted,
            yellowCompleted,
            greenCompleted,
          };
        });
      }
    }
  }, [isFocused]);

  const createProgressData = (totalCount, totalCompletedCount) => {
    return {
      totalTopicsCompleted: totalCompletedCount,
      totalTopics: totalCount,
    };
  };

  //This function updates the count on UI
  const updateProgressInUI = (topic, isCompleted) => {
    let redCompleted = topicsCount.redCompleted;

    let yellowCompleted = topicsCount.yellowCompleted;
    let greenCompleted = topicsCount.greenCompleted;

    if (topic.level === "red") isCompleted ? redCompleted++ : redCompleted--;
    if (topic.level === "yellow")
      isCompleted ? yellowCompleted++ : yellowCompleted--;
    if (topic.level === "green")
      isCompleted ? greenCompleted++ : greenCompleted--;

    setTopicsCount((prev) => {
      return {
        ...prev,

        redCompleted,
        yellowCompleted,
        greenCompleted,
      };
    });
  };

  return (
    <ScrollView
      id="topic-detail-screen"
      style={topicsDetailStyles["topic-detail-container"]}>
      <View
        style={{
          ...topicsDetailStyles["heading-container"],
          ...STYLES["shadow-2"],
          borderRadius: 10,
        }}>
        <Text style={topicsDetailStyles.heading}>{item?.title}</Text>
        <View style={topicsDetailStyles["progress-container"]}>
          <CircularProgress
            progressData={createProgressData(
              topicsCount.red,
              topicsCount.redCompleted
            )}
            styles={{ fontSize: 10 }}
            tintColor={COLORS.red}
            backgroundColor="#ddd"
          />
          <CircularProgress
            progressData={createProgressData(
              topicsCount.yellow,
              topicsCount.yellowCompleted
            )}
            size={80}
            styles={{ fontSize: 10 }}
            tintColor="yellow"
            backgroundColor="#ddd"
          />
          <CircularProgress
            progressData={createProgressData(
              topicsCount.green,
              topicsCount.greenCompleted
            )}
            size={80}
            styles={{ fontSize: 10 }}
            tintColor={COLORS.green}
            backgroundColor="#ddd"
          />
        </View>
        <View style={topicsDetailStyles["signs-container"]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                ...topicsDetailStyles.circle,
                backgroundColor: COLORS.red,

                marginRight: 3,
              }}></View>
            <Text style={{ fontSize: 12 }}>Very Important</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                ...topicsDetailStyles.circle,
                backgroundColor: "yellow",

                marginRight: 3,
              }}></View>
            <Text style={{ fontSize: 12 }}>Moderately important</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                ...topicsDetailStyles.circle,
                backgroundColor: COLORS.green,
                marginRight: 3,
              }}></View>
            <Text style={{ fontSize: 12 }}>Least important</Text>
          </View>
        </View>
      </View>

      {item?.topics?.length > 0 &&
        item.topics.map((topic) => {
          return (
            <ExpandableList
              topic={topic}
              topicsCompleted={userData?.topicsCompleted}
              userId={userData?.userId}
              updateProgressInUI={updateProgressInUI}
            />
          );
        })}
    </ScrollView>
  );
};

const topicsDetailStyles = StyleSheet.create({
  "topic-detail-container": {
    paddingLeft: 10,
    paddingRight: 10,
  },
  "heading-container": {
    backgroundColor: "#fff",
    marginTop: 90,
    marginBottom: 30,

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  "signs-container": {
    flexDirection: "row",

    marginTop: 10,
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
  heading: {
    fontFamily: "lato-black",
    fontSize: 20,
    letterSpacing: 1,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "green",
    marginRight: 10,
    marginLeft: 10,
  },
  "progress-container": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default TopicDetailScreen;
