import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "../redux/slices/authSlice";

export const baseQueryWithAuthInterceptor = (args: any) => {
  const baseQuery = fetchBaseQuery(args);
  return async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);
    if (
      result.error &&
      result.error.status === 401
      // || result.error.originalStatus === 401
    ) {
      api.dispatch(setCurrentUser(null));
    }
    return result;
  };
};

export const prepareHeaders = (headers: any, { getState }: any) => {
  const token = getState().auth.token || localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};
