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
  }),
});

export const { useGetAllCouponsQuery } = couponApi;
