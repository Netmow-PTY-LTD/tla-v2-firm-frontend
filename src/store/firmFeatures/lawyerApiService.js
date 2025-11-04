import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const lawyerApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLawyer: builder.mutation({
      query: (body) => ({
        url: `/lawyer/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["lawyer"],
    }),

    lawyerLoginRequest: builder.mutation({
      query: (data) => ({
        url: "/lawyer/request-lawyer-access",
        method: "POST",
        body: data,
      }),
    }),
    //lawyer remove from firm
    removeLawyerFromFirm: builder.mutation({
      query: (body) => ({
        url: `/lawyer/lawyer-remove-from-firm`,
        method: "POST",
        body: { lawyerProfileId: body.lawyerProfileId },
      }),
      invalidatesTags: ["lawyer-remove"],
    }),
  }),
});

export const {
   useCreateLawyerMutation ,
    useLawyerLoginRequestMutation,
    useRemoveLawyerFromFirmMutation
  } = lawyerApiService;
