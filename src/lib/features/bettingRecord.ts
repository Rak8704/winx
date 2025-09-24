import { apiSlice } from "./apiSlice";

const bettingRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBettingRecord: builder.query({
      query: () => ({
        url: "api/betting-records",
      }),
    }),
  }),
});

export const { useGetBettingRecordQuery } = bettingRecordApiSlice;
