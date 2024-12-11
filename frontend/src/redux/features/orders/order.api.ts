import { TApiResponse } from "../../../interfaces/api_response.types";
import { baseApi } from "../../api/base_api";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all orders
    getAllOrders: builder.query({
      query: (args: Record<string, unknown>) => {
        const params = new URLSearchParams();

        Object.entries(args).forEach(([key, value]) => {
          params.append(key, String(value));
        });

        return {
          url: "/orders",
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
      providesTags: ["orders"],
    }),

    // update order status
    updateOrderStatus: builder.mutation({
      query: (args: {
        orderId: string;
        actionType: "PROCESSING" | "DELIVERED" | "CANCELLED";
      }) => ({
        url: `/orders/${args.orderId}`,
        method: "PATCH",
        body: { status: args.actionType },
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
