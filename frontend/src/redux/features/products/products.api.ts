import { baseApi } from "../../api/base_api";
import {
  GetCategoriesResponse,
  Category,
} from "../../../interfaces/api_response.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),

      transformResponse: (response: GetCategoriesResponse) => response.data,
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = productApi;
