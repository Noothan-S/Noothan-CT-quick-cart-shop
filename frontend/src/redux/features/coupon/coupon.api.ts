import { TApiResponse } from "../../../interfaces/api_response.types";
import { baseApi } from "../../api/base_api";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all coupon
    getAllCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      transformErrorResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["coupons"],
    }),

    // update coupon
    updateCoupon: builder.mutation({
      query: (args: any) => ({
        url: "/coupons",
        method: "PATCH",
        body: args,
      }),
      invalidatesTags: ["coupons"],
    }),

    // delete coupon
    deleteCoupon: builder.mutation({
      query: (args: { productId: string; code: string }) => ({
        url: "/coupons",
        method: "DELETE",
        body: args,
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} = couponApi;
