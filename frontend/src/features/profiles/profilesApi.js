import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/user-profiles";

export const profilesApi = createApi({
  reducerPath: "profilesApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Profile-Data", "Goals"],
  endpoints: (build) => ({
    getAllGoals: build.query({
      query: () => `/goals`,
      providesTags: ["Goals"],
    }),
    getProfileData: build.query({
      query: () => `/me`,
      providesTags: ["Profile-Data"],
    }),
    createProfile: build.mutation({
      query: (body) => ({
        url: "/me",
        method: "POST",
        body,
      }),
      providesTags: ["Profile-Data"],
    }),
    updateProfile: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/me/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile-Data"]
    }),
  }),
});

export const {
  useGetAllGoalsQuery,
  useGetProfileDataQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation
} = profilesApi;
