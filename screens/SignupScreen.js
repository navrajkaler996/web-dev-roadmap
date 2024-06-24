import React, { useState } from "react";
import {
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { COLORS } from "../utils/constants";
import Button from "../components/Button";
import { useSignupMutation } from "../services/user-services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { login } from "../slices/loggedInSlice";

const BASE_HEADING_FONT_SIZE = 24;
const adjustedFontSize = PixelRatio.getFontScale() * BASE_HEADING_FONT_SIZE;

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    firstName: null,
    errors: {
      email: false,
      password: false,
      confirmPassword: false,
      firstName: false,
    },
  });

  const { width: screenWidth } = useWindowDimensions();

  const checkButtonDisabled = (signupData) => {
    if (
      signupData?.email?.includes("@") &&
      signupData.firstName?.length >= 3 &&
      signupData.password?.length >= 5 &&
      signupData?.password === signupData?.confirmPassword
    ) {
      return false;
    }

    return true;
  };

  const navigateHandler = (value) => {
    if (value === "login") {
      return navigation.navigate("LoginScreen", {
        noToken: true,
      });
    }
    setLoading(true);

    const body = {
      firstName: signupData.firstName,
      email: signupData.email,
      password: signupData.password,
    };

    signup(body)
      .then(async (response) => {
        await AsyncStorage.setItem("token", response?.data?.token);

        const token = await AsyncStorage.getItem("token");

        if (token) {
          setLoading(false);
          dispatch(login(signupData?.email));
          return navigation.navigate("RoadmapScreen", {
            token,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={signupScreenStyles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={signupScreenStyles["text-1"]}>Sign up</Text>
          <Text style={signupScreenStyles["text-2"]}>
            Welcome, use your email to sign up
          </Text>
          <SafeAreaView>
            <TextInput
              style={{
                ...signupScreenStyles.input,
                width: screenWidth - 40,
              }}
              value={signupData.email}
              onChangeText={(text) =>
                setSignupData((prev) => {
                  return { ...prev, email: text };
                })
              }
              placeholder="Enter your email"
            />

            <TextInput
              style={{
                ...signupScreenStyles.input,
                width: screenWidth - 40,
              }}
              value={signupData.firstName}
              onChangeText={(text) =>
                setSignupData((prev) => {
                  return { ...prev, firstName: text };
                })
              }
              placeholder="Enter your first name"
            />
            <TextInput
              style={{
                ...signupScreenStyles.input,
                width: screenWidth - 40,
              }}
              value={signupData.password}
              onChangeText={(text) =>
                setSignupData((prev) => {
                  return { ...prev, password: text };
                })
              }
              secureTextEntry={true}
              placeholder="Enter your password"
            />
            <TextInput
              style={{
                ...signupScreenStyles.input,
                width: screenWidth - 40,
              }}
              value={signupData.confirmPassword}
              onChangeText={(text) =>
                setSignupData((prev) => {
                  return { ...prev, confirmPassword: text };
                })
              }
              secureTextEntry={true}
              placeholder="Confirm your password"
            />
          </SafeAreaView>

          {signupData?.email && !signupData?.email?.includes("@") && (
            <Text style={signupScreenStyles.error}>
              Please enter a valid email
            </Text>
          )}
          {signupData?.firstName?.length < 3 && (
            <Text style={signupScreenStyles.error}>
              First name should have at least 3 characters
            </Text>
          )}
          {signupData?.password?.length < 5 && (
            <Text style={signupScreenStyles.error}>
              Password should have at least 5 characters
            </Text>
          )}
          {signupData?.confirmPassword !== signupData?.password && (
            <Text style={signupScreenStyles.error}>Passwords don't match</Text>
          )}

          <Button
            title="Sign up"
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
            onPress={() => navigateHandler("signup")}
            disabled={checkButtonDisabled(signupData)}
          />

          <View style={{ marginTop: 10 }}>
            <Text style={signupScreenStyles["text-2"]}>or</Text>
          </View>
          <Button
            title="Login"
            styles={{
              marginLeft: "auto",
              marginRight: "auto",

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
            onPress={() => navigateHandler("login")}
          />
        </View>
      )}
    </View>
  );
};

const signupScreenStyles = StyleSheet.create({
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

  error: {
    marginLeft: 10,
    marginTop: 5,
    color: COLORS.red,
  },
});

export default SignupScreen;
