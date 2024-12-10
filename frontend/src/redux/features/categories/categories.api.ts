import { TApiResponse } from "../../../interfaces/api_response.types";
import { baseApi } from "../../api/base_api";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),

      transformResponse: (response: TApiResponse) => response.data,
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
