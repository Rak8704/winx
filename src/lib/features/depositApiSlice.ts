/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetDepositDataOutput } from "@/types/api/deposit";
import { apiSlice } from "./apiSlice";

const depositApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepositPaymentData: builder.query<GetDepositDataOutput["payload"], void>(
      {
        query: () => ({
          url: "api/deposit/payment/methods",
          method: "GET",
        }),
        transformResponse: (response: GetDepositDataOutput) => response.payload,
      }
    ),
    makeDeposite: builder.mutation<any, any>({
      query: (body) => ({
        url: "api/deposit",
        method: "POST",
        body,
      }),
    }),

    hasCardContainer: builder.query<{ hasCardContainer: boolean }, void>({
      query: () => ({
        url: "api/card/has",
        method: "GET",
      }),
      providesTags: ["card"],
    }),
  }),
});

export const {
  useGetDepositPaymentDataQuery,
  useMakeDepositeMutation,
  useHasCardContainerQuery,
} = depositApiSlice;
