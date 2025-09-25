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
      query: () => ({
        url: `/partner/list`,
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
      query: ({ partnerId, formData }) => ({
        url: `/partner/${partnerId}/update`, // ✅ correct URL format
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["partner"],
    }),

    deletePartner: builder.mutation({
      query: ({ partnerId }) => ({
        url: `/partner/${partnerId}/delete`,
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
