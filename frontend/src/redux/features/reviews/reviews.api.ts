import { TApiResponse } from "../../../interfaces/api_response.types";
import { baseApi } from "../../api/base_api";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // retrieve all reviews
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["reviews"],
    }),

    // response reviews
    responseReview: builder.mutation({
      query: (args: { reviewId: string; description: string }) => ({
        url: `/reviews/response/${args.reviewId}`,
        method: "POST",
        body: { description: args.description },
      }),
      invalidatesTags: ["reviews"],
    }),

    // update response
    updateReviewResponse: builder.mutation({
      query: (args: { responseId: string; description: string }) => ({
        url: `/reviews/response/${args.responseId}`,
        method: "PATCH",
        body: { description: args.description },
      }),
      invalidatesTags: ["reviews"],
    }),

    // delete review response
    deleteReviewResponse: builder.mutation({
      query: (args: { responseId: string }) => ({
        url: `/reviews/response/${args.responseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useResponseReviewMutation,
  useUpdateReviewResponseMutation,
  useDeleteReviewResponseMutation,
} = reviewsApi;
