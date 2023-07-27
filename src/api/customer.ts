import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: baseQueryWithAuthInterceptor({
    baseUrl: "/api/",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "customer",
      providesTags: ["customer"],
    }),
    importCreateCustomer: builder.mutation({
      query: () => ({
        url: "customer",
        method: "POST",
      }),
      invalidatesTags: ["customer"],
    }),
    createCustomer: builder.mutation({
      query: (body) => ({
        url: "customer/create",
        method: "POST",
        body : body
      }),
      invalidatesTags: ["customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
    getSingleCustomer : builder.query({
      query: (id) => ({
        url: `customer/${id}`,
      }),
    }),
    updateCustomer: builder.mutation({
      query: ({id, body}) => ({
        url: `customer/${id}`,
        method: "PUT",
        body : body
      }),
      invalidatesTags: ["customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useImportCreateCustomerMutation,
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation
} = customerApi;