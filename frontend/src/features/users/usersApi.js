import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
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
    getStatus: build.query({
      query: () => "/status"
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    })
  }),
});

export const {
  useRegisterMutation,
  useVerifyMutation,
  useResendPinMutation,
  useLoginMutation,
  useGetStatusQuery,
  useLogoutMutation
} = usersApi;
