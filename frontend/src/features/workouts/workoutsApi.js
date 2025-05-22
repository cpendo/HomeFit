import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/workouts";

export const workoutsApi = createApi({
  reducerPath: "workoutsApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Workouts"],
  endpoints: (build) => ({
    getWorkouts: build.query({
      query: (filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else if (value !== undefined && value !== null && value !== "") {
            params.append(key, value);
          }
        });

        return `/?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Workouts", id: "LIST" },
              ...result.data.map((workout) => ({
                type: "Workouts",
                id: workout.id,
              })),
            ]
          : [{ type: "Workouts", id: "LIST" }],
    }),
    getAllWorkouts: build.query({
      query: () => `/all`,
      providesTags: [{ type: "Workouts", id: "ALL" }],
    }),
    getWorkoutById: build.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Workouts", id }],
    }),
    getSimilarWorkouts: build.query({
      query: ({ id, difficulty }) =>
        `/similar?id=${id}&difficulty=${difficulty}`,
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Workouts", id: "LIST" },
              ...result.data.map((workout) => ({
                type: "Workouts",
                id: workout.id,
              })),
            ]
          : [{ type: "Workouts", id: "LIST" }],
    }),
    addWorkout: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Workouts", id: "ALL" }],
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetAllWorkoutsQuery,
  useGetWorkoutByIdQuery,
  useGetSimilarWorkoutsQuery,
  useAddWorkoutMutation,
} = workoutsApi;
