import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.0.76:5000/api/v1/topics/",
  }),
  endpoints: (builder) => ({
    getTopicLinks: builder.query({
      query: (topicId) => {
        return {
          url: `links-by-topic-id/${topicId}`,
          method: "GET",
        };
      },
      cacheTime: 0,
    }),
  }),
});

export const { useGetTopicLinksQuery } = topicApi;
