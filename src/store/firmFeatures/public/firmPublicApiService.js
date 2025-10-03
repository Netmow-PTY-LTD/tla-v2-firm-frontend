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
    checkFirmName: builder.mutation({
      query: (body) => ({
        url: `/country/list`,
        method: "POST",
        body,
       
      }),
     
    }),
  }),
});

export const {
  useGetCountryListQuery,
  useCheckFirmNameMutation
 
} = publicApiService;
