import { firmBaseApi } from "@/store/baseApi/firmBaseApi";


const publicApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkFirmName: builder.mutation({
      query: (body) => ({
        url: `/public/check-firm-name`,
        method: "POST",
        body,
       
      }),
     
    }),
  }),
});

export const {

  useCheckFirmNameMutation
 
} = publicApiService;
