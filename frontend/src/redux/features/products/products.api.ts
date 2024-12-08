import { baseApi } from "../../api/base_api";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      //   providesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = productApi;
