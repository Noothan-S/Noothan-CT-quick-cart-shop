import { baseApi } from "../../api/base_api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),

    // update user after signup
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PUT",
        body: data,
      }),
    }),

    getLoggedInUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    requestForgotPassword: builder.mutation({
      query: (args: { email: string }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: args,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetLoggedInUserQuery,
  useRequestForgotPasswordMutation,
} = authApi;
