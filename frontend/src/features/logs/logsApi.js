import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/workout-logs";

export const logsApi = createApi({
  reducerPath: "logsApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Logs"],
  endpoints: (build) => ({
    getWorkoutLogs: build.query({
      query: ({ page = 1 }) => `/?page=${page}`,

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
  }),
});

export const { useGetWorkoutLogsQuery, useAddWorkoutLogMutation } = logsApi;
