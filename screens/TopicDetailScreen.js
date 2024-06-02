import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import ExpandableList from "../components/ExpandableList";

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
    // marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  "heading-container": {
    backgroundColor: "#fff",
    marginTop: 90,
    marginBottom: 30,

    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default TopicDetailScreen;
