import { TApiResponse } from "../../../interfaces/api_response.types";
import { baseApi } from "../../api/base_api";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get my profile
    getMyProfile: builder.query({
      query: (args: Record<string, string>) => {
        const params = new URLSearchParams();

        Object.entries(args).forEach(([key, value]) => {
          params.append(key, value);
        });

        return {
          url: "/users/me",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["profile"],
    }),

    // update profile
    updateProfile: builder.mutation({
      query: (args: any) => ({
        url: "/users",
        method: "PUT",
        body: args,
      }),
      invalidatesTags: ["profile"],
    }),

    // fetch all vendors (admin)
    getAllVendors: builder.query({
      query: (args: Record<string, unknown>) => {
        const params = new URLSearchParams();
        params.append("limit", "999");

        Object.entries(args).forEach(([key, value]) => {
          params.append(key, String(value));
        });

        return {
          url: "/users/vendors",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["users"],
    }),

    // fetch all customers (admin)
    getAllCustomers: builder.query({
      query: (args: Record<string, unknown>) => {
        const params = new URLSearchParams();
        params.append("limit", "999");

        Object.entries(args).forEach(([key, value]) => {
          params.append(key, String(value));
        });

        return {
          url: "/users/customers",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["users"],
    }),

    blockUser: builder.mutation({
      query: (args: { email: string }) => ({
        url: "/users/block-unblock",
        method: "PATCH",
        body: args,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useGetAllVendorsQuery,
  useBlockUserMutation,
  useGetAllCustomersQuery,
} = profileApi;
