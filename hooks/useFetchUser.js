import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/users/get-user-by-email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data) return data;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUser, isLoading, error };
};

export default useFetchUser;
