import { baseApi } from "../../api/base_api";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // follow || unfollow vendor
    followUnfollowVendor: builder.mutation({
      query: (args: { vendorId: string }) => ({
        url: `/follows/${args.vendorId}`,
        method: "POST",
      }),
      invalidatesTags: ["users", "follow", "profile"],
    }),
  }),
});

export const { useFollowUnfollowVendorMutation } = followApi;
