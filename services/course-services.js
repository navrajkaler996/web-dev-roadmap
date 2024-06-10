import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.0.76:5000/api/v1/",
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => {
        return {
          url: "courses/all",
          method: "GET",
        };
      },
      cacheTime: 0,
    }),
  }),
});

export const { useGetCoursesQuery } = courseApi;
