import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./features/users/usersApi";
import { categoriesApi } from "./features/categories/categoriesApi";
import { workoutsApi } from "./features/workouts/workoutsApi";

export default configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [workoutsApi.reducerPath]: workoutsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(workoutsApi.middleware),
});
