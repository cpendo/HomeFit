import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/workouts";

export const workoutsApi = createApi({
  reducerPath: "workoutsApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Workouts"],
  endpoints: (build) => ({
    getWorkouts: build.query({
      query: ({ page = 1, filters = {} }) => {
        const params = new URLSearchParams({ page });

        if (filters.search) params.append("search", filters.search);
        if (filters.category) params.append("category", filters.category);
        if (filters.difficulty) params.append("difficulty", filters.difficulty);

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
      providesTags: (result, error,  id) => [{ type: "Workouts", id }],
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
    updateWorkout: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Workouts", id }],
    }),
    deleteWorkout: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Workouts", id },
        { type: "Workouts", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useLazyGetWorkoutsQuery,
  useGetAllWorkoutsQuery,
  useGetWorkoutByIdQuery,
  useGetSimilarWorkoutsQuery,
  useAddWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
} = workoutsApi;
