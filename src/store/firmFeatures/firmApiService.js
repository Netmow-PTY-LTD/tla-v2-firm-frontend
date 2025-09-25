import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const firmApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFirmsList: builder.query({
      query: () => ({
        url: `/firms`,
        method: "GET",
      }),
      providesTags: ["firm"],
    }),
    getFirmInfo: builder.query({
      query: () => ({
        url: `/firms/firmInfo`,
        method: "GET",
      }),
      providesTags: ["firmInfo", "firm"],
    }),
    updateFirmInfo: builder.mutation({
      query: (formData) => ({
        url: `/firms/firmInfo/update`, // ✅ correct URL format
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["firmInfo", "firm"],
    }),
  }),
});

export const {
  useGetFirmsListQuery,
  useGetFirmInfoQuery,
  useUpdateFirmInfoMutation,
} = firmApiService;
