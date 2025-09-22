import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const partnerApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPartner: builder.mutation({
      query: (body) => ({
        url: "/partner/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["partner"],
    }),
    getPartnersList: builder.query({
      query: (firmId) => ({
        url: `/partner/${firmId}/list`,
        method: "GET",
      }),
      providesTags: ["partner"],
    }),
    getSinglePartner: builder.query({
      query: (firmId, partnerId) => ({
        url: `/partner/${firmId}/${partnerId}`,
        method: "GET",
      }),
      providesTags: ["partner"],
    }),
    updatePartner: builder.mutation({
      query: ({ firmId, partnerId, formData }) => ({
        url: `/partner/${firmId}/${partnerId}/update`, // ✅ correct URL format
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["partner"],
    }),

    deletePartner: builder.mutation({
      query: ({ firmId, partnerId }) => ({
        url: `/partner/${firmId}/${partnerId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["partner"],
    }),
  }),
});

export const {
  useCreatePartnerMutation,
  useGetPartnersListQuery,
  useGetSinglePartnerQuery,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApiService;
