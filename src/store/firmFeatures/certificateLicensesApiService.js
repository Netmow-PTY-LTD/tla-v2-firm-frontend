import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const certificateLicensesApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFirmWiseLicenseAndCertification: builder.mutation({
      query: (body) => ({
        url: "/licenseAndCertificate/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["certificate", "license"],
    }),
    getLicensesAndCertificationsList: builder.query({
      query: () => ({
        url: `/licenseAndCertificate/list`,
        method: "GET",
      }),
      providesTags: ["certificate", "license"],
    }),
    getSingleLicenseAndCertificationById: builder.query({
      query: (licenseId) => ({
        url: `/licenseAndCertificate/${licenseId}`,
        method: "GET",
      }),
      providesTags: ["certificate", "license"],
    }),
    updateLicenseAndCertification: builder.mutation({
      query: ({ licenseId, body }) => ({
        url: `/licenseAndCertificate/${licenseId}/update`, // ✅ correct URL format
        method: "PUT",
        body,
      }),
      invalidatesTags: ["certificate", "license"],
    }),

    deleteLicenseAndCertification: builder.mutation({
      query: (licenseId) => ({
        url: `/licenseAndCertificate/${licenseId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["certificate", "license"],
    }),
  }),
});

export const {
  useAddFirmWiseLicenseAndCertificationMutation,
  useGetLicensesAndCertificationsListQuery,
  useGetSingleLicenseAndCertificationByIdQuery,
  useUpdateLicenseAndCertificationMutation,
  useDeleteLicenseAndCertificationMutation,
} = certificateLicensesApiService;
