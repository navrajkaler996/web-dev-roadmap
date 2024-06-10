import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Image, PixelRatio, StyleSheet } from "react-native";
import { View } from "react-native";
import { COLORS, STYLES } from "../utils/constants";
import Button from "../components/Button";
import { useGetUserByEmailQuery } from "../services/user-services";
const BASE_HEADING_FONT_SIZE = 24;
const adjustedFontSize = PixelRatio.getFontScale() * BASE_HEADING_FONT_SIZE;

const LoginScreen = ({ navigation }) => {
  const {
    data: userData,
    isError,
    isLoading,
  } = useGetUserByEmailQuery("navrajkaler996@gmail.com");

  useEffect(() => {}, []);

  const { width: screenWidth } = useWindowDimensions();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigateHandler = () => {
    if (userData && !isLoading && !isError) {
      navigation.navigate("RoadmapScreen", { userData });
    }
  };

  return (
    <>
      <LinearGradient
        colors={["#fff", "#fff"]}
        style={loginScreenStyles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={loginScreenStyles["text-1"]}>Login</Text>
          <Text style={loginScreenStyles["text-2"]}>
            Welcome, use your email and password to continue your journey
          </Text>
          <SafeAreaView>
            <TextInput
              style={{
                ...loginScreenStyles.input,
                width: screenWidth - 40,
                // ...STYLES["shadow-2"],
              }}
              value={loginData.email}
              onChangeText={(text) =>
                setLoginData((prev) => {
                  return { ...prev, email: text };
                })
              }
              placeholder="Enter your email"
            />
            <TextInput
              style={{ ...loginScreenStyles.input, width: screenWidth - 40 }}
              value={loginData.password}
              onChangeText={(text) =>
                setLoginData((prev) => {
                  return { ...prev, password: text };
                })
              }
              secureTextEntry={true}
              placeholder="Enter your password"
            />
          </SafeAreaView>
          <Button
            title="Login"
            styles={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              paddingLeft: 25,
              paddingRight: 25,
              paddingTop: 12,
              paddingBottom: 12,
              backgroundColor: COLORS["btn-primary-1"],
              borderRadius: 20,
              width: screenWidth - 40,
              justifyContent: "center",
            }}
            titleStyles={{
              fontSize: 14,
              letterSpacing: 1,
              fontFamily: "font-family-2",
            }}
            onPress={() => navigateHandler()}
          />
          <View style={{ marginTop: 10 }}>
            <Text style={loginScreenStyles["text-2"]}>or</Text>
          </View>
        </View>
        <Button
          title="Sign up"
          styles={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 10,
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 12,
            paddingBottom: 12,
            backgroundColor: COLORS["btn-primary-1"],
            borderRadius: 20,
            width: screenWidth - 40,
            justifyContent: "center",
          }}
          titleStyles={{
            fontSize: 14,
            letterSpacing: 1,
            fontFamily: "font-family-2",
          }}
        />
        <Image
          source={require("../assets/images/logo-demo.png")}
          style={{
            width: "100%",
            height: 300,
            marginLeft: "auto",
            marginRight: "auto",
            position: "absolute",
            bottom: 0,
          }}
        />
      </LinearGradient>
    </>
  );
};

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 130,
    alignItems: "center",
  },
  "text-1": {
    color: "#000",
    fontSize: adjustedFontSize + 2,
    letterSpacing: "1.5",
    marginBottom: 10,
    fontFamily: "font-family-1",
    textTransform: "uppercase",
    color: COLORS["btn-primary-1"],
  },
  "text-2": {
    color: "#000",
    fontSize: adjustedFontSize - 8,
    letterSpacing: "1.5",
    marginBottom: 10,
    fontFamily: "Lato-regular",

    textAlign: "center",
  },
  input: {
    height: 40,
    marginTop: 30,
    borderWidth: 2,
    borderColor: COLORS["btn-primary-1"],
    borderRadius: 20,
    paddingLeft: 10,
    fontFamily: "font-family-4",
  },
});

export default LoginScreen;
