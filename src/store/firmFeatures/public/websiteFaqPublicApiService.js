import { baseApi } from "@/store/baseApi/baseApi";


const websiteFaqPublicApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyPublicFaqs: builder.query({
      query: (category) => ({
        url: `/website-faq/company/public`,
        method: "GET",
        params: category ? { category } : undefined,
      }),
      providesTags: ["website-faq"],
    }),
  }),
});

export const { useGetCompanyPublicFaqsQuery } = websiteFaqPublicApiService;
