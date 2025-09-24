/* eslint-disable @typescript-eslint/no-explicit-any */
import { InviationRewardGetOutput } from "@/types/api/reward";
import { apiSlice } from "./apiSlice";

const rewardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findInvitationRewardData: builder.query<InviationRewardGetOutput, void>({
      query: () => ({
        url: "api/invitation-bonus",
        method: "GET",
      }),
      providesTags: ["invitationReward"],
    }),

    clamInvitationReward: builder.mutation<
      { success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `api/invitation-bonus/${id}`,
        body: {},
        method: "PUT",
      }),
      invalidatesTags: ["invitationReward"],
    }),

    findSigninBonusRewardsData: builder.query<any, void>({
      query: () => ({
        url: "api/signin-bonus",
        method: "GET",
      }),
      providesTags: ["signinReward"],
    }),

    claimSignReward: builder.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `api/signin-bonus/${id}`,
        body: {},
        method: "PUT",
      }),
      invalidatesTags: ["signinReward"],
    }),
  }),
});

export const {
  useFindInvitationRewardDataQuery,
  useClamInvitationRewardMutation,
  useFindSigninBonusRewardsDataQuery,
  useClaimSignRewardMutation,
} = rewardApiSlice;
