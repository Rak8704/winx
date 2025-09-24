import { apiSlice } from "./apiSlice";
import {
  CardOutput,
  CreateCardInput,
  CreateCardOutput,
  CreateNewCardInput,
} from "@/types/api/card";

const depositApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCards: builder.query<CardOutput, { all?: boolean }>({
      query: ({ all } = { all: true }) => ({
        url: `api/card?all=${all}`,
        method: "GET",
      }),
      providesTags: ["card"],
    }),

    updateCard: builder.mutation<
      { message: string },
      { id: string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `api/card/${id}`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: ["card"],
    }),

    createCard: builder.mutation<CreateCardOutput, CreateCardInput>({
      query: (body) => ({
        url: "api/card",
        method: "POST",
        body,
      }),
      invalidatesTags: ["card"],
    }),
    newCreateCard: builder.mutation<CreateCardOutput, CreateNewCardInput>({
      query: (body) => ({
        url: "api/card/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["card"],
    }),
  }),
});

export const {
  useFetchCardsQuery,
  useUpdateCardMutation,
  useCreateCardMutation,
  useNewCreateCardMutation,
} = depositApiSlice;
