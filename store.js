import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "./services/course-services";
import { userApi } from "./services/user-services";
import loggedInSlice from "./slices/loggedInSlice";

export const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    loggedIn: loggedInSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);
