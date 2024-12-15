import { TApiResponse } from "../../../interfaces/api_response.types";
import { INewOrderPayload } from "../../../interfaces/order.payload.type";
import { baseApi } from "../../api/base_api";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create payment intent
    createPaymentIntent: builder.mutation({
      query: (args: { amount: number }) => ({
        url: "/payout/stripe",
        method: "POST",
        body: args,
      }),
    }),

    // create new order (customer)
    createNewOrder: builder.mutation({
      query: (args: INewOrderPayload) => ({
        url: "/orders",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["orders", "users", "profile"],
    }),

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

export const {
  useGetAllOrdersQuery,
  useCreatePaymentIntentMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
