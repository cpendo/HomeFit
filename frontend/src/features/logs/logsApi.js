import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/workout-logs";

export const logsApi = createApi({
  reducerPath: "logsApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Logs"],
  endpoints: (build) => ({
    getWorkoutLogs: build.query({
      query: ({ page = 1, filters = {} }) => {
        const params = new URLSearchParams({ page });

        if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
        if (filters.dateTo) params.append("dateTo", filters.dateTo);
        if (filters.category) params.append("category", filters.category);
        if (filters.difficulty) params.append("difficulty", filters.difficulty);

        return `/?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Logs", id: "ALL" },
              ...result.data.map((workout) => ({
                type: "Logs",
                id: workout.id,
              })),
            ]
          : [{ type: "Logs", id: "ALL" }],
    }),
    addWorkoutLog: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Logs", id: "ALL" }],
    }),
    deleteWorkoutLog: build.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Logs", id: "ALL" }],
    }),
    getStreakDates: build.query({
      query: () => "/streak-dates"
    })
  }),
});

export const {
  useGetWorkoutLogsQuery,
  useLazyGetWorkoutLogsQuery,
  useAddWorkoutLogMutation,
  useDeleteWorkoutLogMutation,
  useGetStreakDatesQuery,
} = logsApi;
