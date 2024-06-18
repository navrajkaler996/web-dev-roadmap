import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { COLORS } from "../utils/constants";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const ErrorScreen = () => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={errorScreenStyles.container}>
      <View style={errorScreenStyles["headings-container"]}>
        <Text style={errorScreenStyles["heading-1"]} adjustsFontSizeToFit>
          Something went wrong!
        </Text>
        {/* <Text style={errorScreenStyles["heading-refresh"]}>Please refresh</Text>
        <Text style={{ marginTop: 5 }}>or</Text>
        <Text style={errorScreenStyles["heading-login"]}> try login</Text> */}

        <Ionicons
          style={{ marginTop: 30 }}
          name="refresh"
          color={COLORS["btn-primary-1"]}
          size={44}
        />

        <Button
          title="Try login again"
          styles={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 12,
            paddingBottom: 12,
            backgroundColor: COLORS["btn-primary-1"],

            width: screenWidth - 40,
            justifyContent: "center",
          }}
          titleStyles={{
            fontSize: 14,
            letterSpacing: 1,
            fontFamily: "font-family-2",
          }}
          // onPress={() => navigateHandler()}
        />
      </View>
      <Image
        style={errorScreenStyles.image}
        source={require("../assets/images/yellow-signal.png")}
      />
    </View>
  );
};

const errorScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  "headings-container": {
    marginTop: 200,
    alignItems: "center",
  },
  "heading-1": {
    fontFamily: "font-family-1",
    fontSize: 28,
    letterSpacing: 0.1,
    textTransform: "capitalize",
    color: COLORS["btn-primary-1"],
  },
  "heading-refresh": {
    fontFamily: "Lato-regular",
    fontSize: 20,
    letterSpacing: 0.2,

    marginTop: 50,
  },
  "heading-login": {
    fontFamily: "Lato-regular",
    fontSize: 20,
    letterSpacing: 0.2,

    marginTop: 5,
  },
});

export default ErrorScreen;
