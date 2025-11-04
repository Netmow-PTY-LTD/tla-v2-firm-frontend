import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const firmApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: (params) => ({
        url: `/lawyer-notifications`,
        method: "GET",
        params,
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationsQuery } = firmApiService;
