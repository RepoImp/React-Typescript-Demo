import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";

export const gmtCsvApi = createApi({
  reducerPath: "gmtCsvApi",
  baseQuery: baseQueryWithAuthInterceptor({
    baseUrl: "/api/",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["GMTCsv"],
  endpoints: (builder) => ({
    getGmtCsvFiles: builder.query({
      query: () => "ftp/listfiles",
      providesTags: ["GMTCsv"],
    }),
  }),
});

export const {
  useGetGmtCsvFilesQuery
} = gmtCsvApi;
