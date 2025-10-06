import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

export const lawyerRequestApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new lawyer membership request
    createLawyerRequest: builder.mutation({
      query: (body) => ({
        url: "/lawyer-request/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LawyerRequest"],
    }),

    // Get all lawyer membership requests for the firm
    getLawyerRequestsList: builder.query({
      query: () => ({
        url: "/lawyer-request/list",
        method: "GET",
      }),
      providesTags: ["LawyerRequest-list"],
    }),

    // Get a single lawyer request by ID
    getSingleLawyerRequest: builder.query({
      query: (requestId) => ({
        url: `/lawyer-request/${requestId}`,
        method: "GET",
      }),
      providesTags: ["LawyerRequest"],
    }),

    // Update a lawyer request
    updateLawyerRequest: builder.mutation({
      query: ({ requestId, formData }) => ({
        url: `/lawyer-request/${requestId}/update`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["LawyerRequest"],
    }),

    // Delete a lawyer request
    deleteLawyerRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: `/lawyer-request/${requestId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["LawyerRequest"],
    }),
  }),
});

export const {
  useCreateLawyerRequestMutation,
  useGetLawyerRequestsListQuery,
  useGetSingleLawyerRequestQuery,
  useUpdateLawyerRequestMutation,
  useDeleteLawyerRequestMutation,
} = lawyerRequestApiService;
