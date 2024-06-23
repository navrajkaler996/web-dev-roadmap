import React, { useEffect, useState } from "react";

import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  useWindowDimensions,
  Image,
  PixelRatio,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import Button from "../components/Button";
import Loader from "../components/Loader";

import { login as loginAction } from "../slices/loggedInSlice";

import {
  useGetUserByEmailQuery,
  useLoginMutation,
} from "../services/user-services";

import { COLORS } from "../utils/constants";
import { useDispatch } from "react-redux";

const BASE_HEADING_FONT_SIZE = 24;
const adjustedFontSize = PixelRatio.getFontScale() * BASE_HEADING_FONT_SIZE;

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const [loading, setLoading] = useState(false);
  const [loadingForToken, setLoadingForToken] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      setLoadingForToken(true);
      const checkToken = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");

          if (!storedToken) {
            setLoadingForToken(false);
          }

          const decodedToken = jwtDecode(storedToken);

          const currentTimestamp = Date.now() / 1000;

          console.log(decodedToken.exp, currentTimestamp);
          if (decodedToken.exp < currentTimestamp) {
            setLoadingForToken(false);
          } else {
            return navigation.navigate("RoadmapScreen");
          }
        } catch (error) {
          console.error("Error checking token:", error);
        }
      };

      const noToken = route?.params?.noToken;

      if (!noToken) checkToken();
      else {
        setLoadingForToken(false);
        setLoading(false);
      }
    }, [route])
  );

  const navigateHandler = (value) => {
    if (value === "signup") {
      return navigation.navigate("SignupScreen");
    }

    setLoading(true);
    if (loginData.email?.length > 2 && loginData.password?.length > 2) {
      login(loginData)
        .then(async (response) => {
          await AsyncStorage.setItem("token", response?.data?.token);

          const token = await AsyncStorage.getItem("token");
          setLoading(false);
          if (token) {
            dispatch(loginAction(loginData.email));
            navigation.navigate("RoadmapScreen", {
              token,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <LinearGradient
        colors={["#fff", "#fff"]}
        style={loginScreenStyles.container}>
        {loading || loadingForToken ? (
          <Loader />
        ) : (
          <>
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
                  style={{
                    ...loginScreenStyles.input,
                    width: screenWidth - 40,
                  }}
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
              onPress={() => navigateHandler("signup")}
            />
          </>
        )}
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
