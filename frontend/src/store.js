import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./features/users/usersApi";
import { categoriesApi } from "./features/categories/categoriesApi";

export default configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware),
});
