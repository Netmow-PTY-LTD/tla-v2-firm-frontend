import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const firmApiService = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: `/lawyer-notifications`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationsQuery } = firmApiService;
