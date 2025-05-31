import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Profile"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    verifyToken: build.mutation({
      query: ({ token }) => ({
        url: "/verifyUser", // or /verifyUser/check if you separate GET + POST
        method: "POST",
        body: token,
      }),
    }),
    verify: build.mutation({
      query: ({ token, pin }) => ({
        url: "/verify-user",
        method: "POST",
        body: { token, pin },
      }),
    }),
    resendPin: build.mutation({
      query: ({ token }) => ({
        url: "/resend-pin",
        method: "POST",
        body: { token },
      }),
    }),
    login: build.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    getProfile: build.query({
      query: () => "/me",
      providesTags: ["Profile"],
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
    forgotPassword: build.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
    }),
    update: build.mutation({
      query: ({ id, ...user }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["Profile"],
    }),
    changePassword: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/change-password/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteUserWorkouts: build.mutation({
      query: (id) => ({
        url: `/${id}/workouts`,
        method: "DELETE",
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyTokenMutation,
  useVerifyMutation,
  useResendPinMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateMutation,
  useChangePasswordMutation,
  useDeleteUserWorkoutsMutation,
  useDeleteUserMutation
} = usersApi;
