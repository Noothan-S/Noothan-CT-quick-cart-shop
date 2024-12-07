import { baseApi } from "../../api/base_api";

const authApi = baseApi.injectEndpoints({
    endpoints: ((builder) => ({
        createUser: builder.mutation({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                body: data
            })
        }),
    }))
})

export const { useCreateUserMutation } = authApi;