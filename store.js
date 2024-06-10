import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "./services/course-services";
import { userApi } from "./services/user-services";

export const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);
