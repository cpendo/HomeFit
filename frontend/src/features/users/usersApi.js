import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Profile"] ,
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
      providesTags: ["Profile"]
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
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
} = usersApi;
