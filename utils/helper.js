import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async (navigation) => {
  try {
    await AsyncStorage.removeItem("token");
    navigation.navigate("LoginScreen");
  } catch (error) {
    console.log("Error while logging out: ", error);
  }
};
