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
  useGetCountryListQuery,
 
} = publicApiService;
