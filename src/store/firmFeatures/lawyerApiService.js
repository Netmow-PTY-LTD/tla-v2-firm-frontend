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
  }),
});

export const { useCreateLawyerMutation } = lawyerApiService;
