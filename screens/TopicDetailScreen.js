import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import ExpandableList from "../components/ExpandableList";
import CircularProgress from "../components/CircularProgress";

const TopicDetailScreen = ({ route }) => {
  const { params } = route;

  const { item } = params;

  return (
    <View
      id="topic-detail-screen"
      style={topicsDetailStyles["topic-detail-container"]}>
      <View
        style={{
          ...topicsDetailStyles["heading-container"],
          ...topicsDetailStyles["shadow-1"],
        }}>
        <Text style={topicsDetailStyles.heading}>{item?.title}</Text>
        <View style={topicsDetailStyles["progress-container"]}>
          <CircularProgress
            size={80}
            styles={{ fontSize: 10 }}
            tintColor="red"
            backgroundColor="#ddd"
          />
          <CircularProgress
            size={80}
            styles={{ fontSize: 10 }}
            tintColor="yellow"
            backgroundColor="#ddd"
          />
          <CircularProgress
            size={80}
            styles={{ fontSize: 10 }}
            tintColor="green"
            backgroundColor="#ddd"
          />
        </View>
        <View style={topicsDetailStyles["signs-container"]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                ...topicsDetailStyles.circle,
                backgroundColor: "red",

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
                backgroundColor: "green",
                marginRight: 3,
              }}></View>
            <Text style={{ fontSize: 12 }}>Least important</Text>
          </View>
        </View>
      </View>

      {item?.topics?.length > 0 &&
        item.topics.map((topic) => {
          return <ExpandableList topic={topic} />;
        })}
    </View>
  );
};

const topicsDetailStyles = StyleSheet.create({
  "topic-detail-container": {
    marginLeft: 10,
    marginRight: 10,
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
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
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
