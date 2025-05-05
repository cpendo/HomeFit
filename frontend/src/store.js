import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./features/users/usersApi";
import { categoriesApi } from "./features/categories/categoriesApi";
import { workoutsApi } from "./features/workouts/workoutsApi";
import { logsApi } from "./features/logs/logsApi";
import { profilesApi } from "./features/profiles/profilesApi";

export default configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [workoutsApi.reducerPath]: workoutsApi.reducer,
    [logsApi.reducerPath]: logsApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(workoutsApi.middleware)
      .concat(logsApi.middleware)
      .concat(profilesApi.middleware),
});
