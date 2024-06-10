import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "./services/course-services";

export const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
});

setupListeners(store.dispatch);
