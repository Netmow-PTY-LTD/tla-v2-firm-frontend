import { baseApi } from "../../baseApi/baseApi";

const publicApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountryList: builder.query({
      query: () => ({
        url: `/country/list`,
        method: "GET",
        params: {},
      }),
      providesTags: ["Country-list"],
    }),
  }),
});

export const {
  useAddCountryMutation,
  useGetSingleCountryQuery,
  useEditCountryMutation,
  useGetCountryListQuery,
  useDeleteCountryMutation,
  useAddZipCodeMutation,
  useGetZipCodeListQuery,
  useGetSingleZipCodeQuery,
  useEditZipCodeMutation,
  useDeleteZipCodeMutation,
  useAddRangeMutation,
  useGetSingleRangeQuery,
  useGetRangeListQuery,
  useEditRangeMutation,
  useDeleteRangeMutation,
  useGetUserProfileListQuery,
  useGetUserProfileBySlugQuery,
  useGetAllRequestsFromClientQuery,
  useGetRequestFromClientByIdQuery,
  useCreateRatingMutation,
} = publicApiService;
