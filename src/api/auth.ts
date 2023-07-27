import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuthInterceptor({
    baseUrl: "/api/user",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["CurrentUser"],
  endpoints: (builder) => ({
    user: builder.query({
      query: () => {
        return "customer";
      },
      providesTags: ["CurrentUser"],
    }),
    getInvitationCode: builder.query({
      query: () => "invitationCode",
    }),
    setInvitationCode: builder.mutation({
      query: (body) => ({
        url: "invitationCode",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (post) => {
        return {
          url: "login",
          method: "POST",
          body: post,
        };
      },
      invalidatesTags: ["CurrentUser"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "forgotPassword",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `resetPassword/${body.hash}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CurrentUser"],
    }),
  }),
});

export const {
  useUserQuery,
  useGetInvitationCodeQuery,
  useSetInvitationCodeMutation,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
