/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiSlice } from "./apiSlice";
import { WithdrawPageData } from "@/types/api/withdraw";

const depositApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeWithdraw: builder.mutation<any, any>({
      query: (body) => ({
        url: "api/withdraw",
        method: "POST",
        body,
      }),
      invalidatesTags: ["withdraw"],
    }),
    fetchWithdrawPageData: builder.query<WithdrawPageData, void>({
      query: () => ({
        url: "api/withdraw/page",
        method: "GET",
      }),
      providesTags: ["withdraw"],
    }),
    fetchWithdrawWallet: builder.query<any, void>({
      query: () => ({
        url: "api/withdraw/withdraw/methods",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMakeWithdrawMutation,
  useFetchWithdrawPageDataQuery,
  useFetchWithdrawWalletQuery,
} = depositApiSlice;
