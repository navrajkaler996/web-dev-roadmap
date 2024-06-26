import { useFonts } from "expo-font";
import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const data = [
  {
    text: "Learn where to start",
    images: [
      require("../assets/images/html-5.png"),
      require("../assets/images/css-3.png"),
      require("../assets/images/javascript.png"),
    ],
  },
  {
    text: "Choose the right technology",
    images: [
      require("../assets/images/react.png"),
      require("../assets/images/angular.png"),
      require("../assets/images/node.png"),
      require("../assets/images/java.png"),
      require("../assets/images/mongodb.png"),
      require("../assets/images/sql.png"),
    ],
  },
  {
    text: "Understand the market",
  },
  {
    text: "Where to go next",
  },
];

function Index() {
  const [fontsLoaded] = useFonts({
    "font-family-1": require("../assets/fonts/Jost-Black.ttf"),
    "font-family-2": require("../assets/fonts/Jost-Bold.ttf"),
  });

  const width = Dimensions.get("window").width;
  return (
    <View style={{ height: 100 }}>
      <Carousel
        loop
        width={width}
        height={"100"}
        autoPlay={true}
        data={[...data]}
        scrollAnimationDuration={2000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View>
            <Text style={carouselStyles["primary-text"]}>{item.text}</Text>
            <View style={carouselStyles["images-container-1"]}>
              {item?.images?.length > 0 &&
                item.images.map((image) => (
                  <Image
                    source={image}
                    style={carouselStyles["image-styles"]}
                  />
                ))}
            </View>
          </View>
        )}
        // customAnimation={animationStyle}
      />
    </View>
  );
}

const carouselStyles = StyleSheet.create({
  "images-container-1": {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  "image-styles": {
    width: 50,
    height: 50,
  },
  "primary-text": {
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#000",
    fontFamily: "font-family-2",
    marginBottom: 16,
  },
});

export default Index;
