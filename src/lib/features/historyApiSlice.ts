import { apiSlice } from "./apiSlice";
interface HistoryParams {
  type: string;
  status: string;
  page: number;
}
const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: ({ type, status, page }: HistoryParams) => {
        const params = new URLSearchParams();
        params.append("type", type);
        params.append("status", status);
        params.append("page", page.toString());

        return `/api/history?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetHistoryQuery } = historyApiSlice;
