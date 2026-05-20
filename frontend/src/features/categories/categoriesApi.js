import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/categories`;

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => "/",
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Categories", id: "LIST" },
              ...result.data.map((workout) => ({
                type: "Categories",
                id: workout.id,
              })),
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
