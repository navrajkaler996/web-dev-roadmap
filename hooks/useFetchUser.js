import React, { useState } from "react";
import { useGetUserByEmailQuery } from "../services/user-services";

const useFetchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;

      const response = await fetch(
        `${API_URL}/users/get-user-by-email/${email}`
      );
      const data = await response.json();
      return data;
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
