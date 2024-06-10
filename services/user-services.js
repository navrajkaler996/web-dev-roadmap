import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.0.76:5000/api/v1/",
  }),
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => {
        return {
          url: `users/get-user-by-email/${email}`,
          method: "GET",
        };
      },
      cacheTime: 0,
    }),
  }),
});

export const { useGetUserByEmailQuery } = userApi;
