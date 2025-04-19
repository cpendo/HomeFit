import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/workouts";

export const workoutsApi = createApi({
  reducerPath: "workoutsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Workouts"],
  endpoints: (build) => ({
    getWorkouts: build.query({
      query: (filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else if (value !== undefined && value !== null &&  value !== "") {
            params.append(key, value);
          }
        });

        return `/?${params.toString()}`;
      },
      providesTags: ["Workouts"],
    }),
  }),
});

export const { useGetWorkoutsQuery } = workoutsApi;
