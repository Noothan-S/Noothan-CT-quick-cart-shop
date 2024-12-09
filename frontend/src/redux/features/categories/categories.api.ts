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

    createNewProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateNewProductMutation } =
  categoryApi;
