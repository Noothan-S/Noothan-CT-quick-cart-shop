import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut } from "../features/auth/auth.slice";
import { toast } from "sonner";
import { decrypt } from "../../utils/text_encryption";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${decrypt(token)}`);
    }
    return headers;
  },
});

const baseQueryWithAdditionalFeatures: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Access token invalid or expired");
    // TODO: Call "/api/auth/refresh-token" to get a new access token
    api.dispatch(logOut());
  }

  if (result.error) {
    // @ts-expect-error: message will sometime maybe undefined
    const errorMessage = result.error.data?.message || "An error occurred.";
    toast.error(errorMessage);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAdditionalFeatures,
  tagTypes: ["categories", "profile", "products"],
  endpoints: () => ({}),
});
