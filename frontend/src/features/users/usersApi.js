import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    verifyUser: build.mutation({
      query: ({token, pin}) => ({
        url: "/verify-user",
        method: "POST",
        body: {token, pin}
      })
    })
  }),
});

export const { useRegisterUserMutation, useVerifyUserMutation } = usersApi;
