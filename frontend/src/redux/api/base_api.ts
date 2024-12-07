import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
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
    if (token) return headers.set("authorization", `Bearer ${decrypt(token)}`);
    if (!token) return headers;
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithAdditionalFeatures: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  //   switch (result?.error?.status) {
  //     case 401:
  //       console.log("access token invalid or expired");
  //       toast.error(result?.error?.data?.message);
  //       // TODO: call "/api/auth/refresh-token" (POST) for getting new access token.
  //       api.dispatch(logOut());
  //       break;

  //     case 400:
  //       // @ts-expect-error: Type mismatch
  //       toast.error(result?.error?.data?.message);
  //       break;

  //     default:
  //       break;
  //   }

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
  }

  if (result.error) {
    toast.error(result?.error?.data?.message);
  } else if (result.data) {
    toast.success(result.data.message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAdditionalFeatures,
  tagTypes: [],
  endpoints: () => ({}),
});
