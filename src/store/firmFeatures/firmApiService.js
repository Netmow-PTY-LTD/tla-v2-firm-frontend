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
    getFirmMedia: builder.query({
      query: () => ({
        url: `/firm-media`,
        method: "GET",
      }),
      providesTags: ["media"],
    }),
    updateFirmMedia: builder.mutation({
      query: (formData) => ({
        url: `/firm-media/update`, // ✅ correct URL format
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["media"],
    }),
    deleteFirmMedia: builder.mutation({
      query: (body) => ({
        url: `/firm-media/remove`, // ✅ correct URL format
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["media"],
    }),
    addOfficeLocation: builder.mutation({
      query: (body) => ({
        url: `/firmLocation/add`, // ✅ correct URL format
        method: "POST",
        body,
      }),
      invalidatesTags: ["location"],
    }),
    getOfficeLocations: builder.query({
      query: () => ({
        url: `/firmLocation/list`, // ✅ correct URL format
        method: "GET",
      }),
      providesTags: ["location"],
    }),
    getSingleOfficeLocation: builder.query({
      query: (locationId) => ({
        url: `/firmLocation/${locationId}`, // ✅ correct URL format
        method: "GET",
      }),
      providesTags: ["location"],
    }),
    updateOfficeLocation: builder.mutation({
      query: ({ locationId, body }) => ({
        url: `/firmLocation/${locationId}/update`, // ✅ correct URL format
        method: "PUT",
        body,
      }),
      invalidatesTags: ["location"],
    }),
    deleteOfficeLocation: builder.mutation({
      query: (locationId) => ({
        url: `/firmLocation/${locationId}/delete`, // ✅ correct URL format
        method: "DELETE",
      }),
      invalidatesTags: ["location"],
    }),
    getCompanyProfileBySlug: builder.query({
      query: (slug) => ({
        url: `/public/firm/by-slug/${slug}`, // ✅ correct URL format
        method: "GET",
      }),
      providesTags: ["companyProfile"],
    }),
  }),
});

export const {
  useGetFirmsListQuery,
  useGetFirmInfoQuery,
  useUpdateFirmInfoMutation,
  useGetFirmMediaQuery,
  useUpdateFirmMediaMutation,
  useDeleteFirmMediaMutation,
  useAddOfficeLocationMutation,
  useGetOfficeLocationsQuery,
  useGetSingleOfficeLocationQuery,
  useUpdateOfficeLocationMutation,
  useDeleteOfficeLocationMutation,
  useGetCompanyProfileBySlugQuery,
} = firmApiService;
