import { Prisma } from "@prisma/client";
import { apiSlice } from "./apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWallets: builder.query<
      { paymentWallets: Prisma.PaymentWalletGetPayload<object>[] },
      void
    >({
      query: () => ({
        url: "api/payment-wallets",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchWalletsQuery } = paymentApiSlice;
