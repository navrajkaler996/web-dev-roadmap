import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout as logoutAction } from "../slices/loggedInSlice";
export const logout = async (navigation, dispatch) => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch(logoutAction());
    navigation.navigate("LoginScreen");
  } catch (error) {
    console.log("Error while logging out: ", error);
  }
};
