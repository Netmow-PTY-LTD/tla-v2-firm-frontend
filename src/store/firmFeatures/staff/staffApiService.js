import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const staffApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaff: builder.mutation({
      query: (body) => ({
        url: "/staffs/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["staff"],
    }),
    getFirmWiseStaffList: builder.query({
      query: (params) => ({
        url: `/staffs/list`,
        method: "GET",
        params
      }),
      providesTags: ["staff-list", "staff"],
    }),
    getSingleStaffById: builder.query({
      query: ({ staffId }) => ({
        url: `/staffs/${staffId}`,
        method: "GET",
      }),
      providesTags: ["staff"],
    }),
    updateStaff: builder.mutation({
      query: (body) => ({
        url: `/staffs/${body?.staffId}/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["staff"],
    }),
    deleteStaff: builder.mutation({
      query: (body) => ({
        url: `/staffs/${body?.staffId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),
  }),
});

export const {
  useCreateStaffMutation,
  useGetFirmWiseStaffListQuery,
  useGetSingleStaffByIdQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApiService;
