import { baseApi } from "../../api/base_api";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all coupon
    getAllCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCouponsQuery } = couponApi;
