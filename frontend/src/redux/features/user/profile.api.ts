import { TApiResponse } from "../../../interfaces/api_response.types";
import { baseApi } from "../../api/base_api";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((arg: Record<string, string>) =>
            params.append(arg.key, arg.value)
          );
        }
        return {
          url: "/users/me",
          method: "GET",
          params,
        };
      },

      transformResponse: (response: TApiResponse) => response.data,
      providesTags: ["profile"],
    }),
  }),
});

export const { useGetMyProfileQuery } = profileApi;
