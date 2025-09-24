import { apiSlice } from "./apiSlice";
import { Prisma } from "@prisma/client";

const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWallet: builder.query<
      { payload: Prisma.WalletGetPayload<object> },
      void
    >({
      query: () => ({
        url: "/api/wallet",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        // Ensure we always return a consistent structure
        if (response && response.payload) {
          return response;
        }
        // Return a default structure if response is not as expected
        return { payload: null };
      },
      transformErrorResponse: (error: any) => {
        // Handle error responses gracefully
        console.error("Wallet API error:", error);
        return { payload: null };
      },
    }),
  }),
});

export const { useFetchWalletQuery } = walletApiSlice;
