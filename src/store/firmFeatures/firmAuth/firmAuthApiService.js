import { firmBaseApi } from "@/store/baseApi/firmBaseApi";

const firmAuthApi = firmBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------------------------
    // Firm Authentication
    // ----------------------------
    loginFirm: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["firmInfo"],
    }),

    registerFirm: builder.mutation({
      query: (data) => ({
        url: "/auth/register/firm",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["firmInfo"],
    }),

    registerStaff: builder.mutation({
      query: (data) => ({
        url: "/auth/register/staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["firmInfo"],
    }),

    authLogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["firmInfo"],
    }),

    getFirmUserInfo: builder.query({
      query: () => ({
        url: "/firms/firmInfo",
        method: "GET",
      }),
      providesTags: ["firmInfo"],
    }),

    updateFirmData: builder.mutation({
      query: (data) => ({
        url: "/firms/firmInfo/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["firmInfo"],
    }),

    changeFirmPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["firmInfo"],
    }),

    forgotFirmPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["firmInfo"],
    }),

    resetFirmPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["firmInfo"],
    }),

    verifyFirmEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    resendFirmVerificationEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: data,
      }),
    }),

    changeFirmAccountStatus: builder.mutation({
      query: (payload) => ({
        url: `/auth/users/${payload.userId}/status`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["all-firms"],
    }),

    sendFirmOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyFirmOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    changeFirmEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/change-email",
        method: "POST",
        body: data,
      }),
    }),

    updateCurrentUserInfo: builder.mutation({
      query: (data) => ({
        url: "/auth/user/me",
        method: "PATCH",
        body: data,
        invalidatesTags: ["userInfo"],
      }),
    }),
    currentUserInfo: builder.query({
      query: () => ({
        url: "/auth/user/me",
        method: "GET",
      }),
      providesTags: ["userInfo"],
    }),

  
  }),
});

export const {
  useLoginFirmMutation,
  useRegisterFirmMutation,
  useRegisterStaffMutation,
  useAuthLogOutMutation,
  useGetFirmUserInfoQuery,
  useUpdateFirmDataMutation,
  useChangeFirmPasswordMutation,
  useForgotFirmPasswordMutation,
  useResetFirmPasswordMutation,
  useVerifyFirmEmailMutation,
  useResendFirmVerificationEmailMutation,
  useChangeFirmAccountStatusMutation,
  useSendFirmOtpMutation,
  useVerifyFirmOtpMutation,
  useChangeFirmEmailMutation,
  useUpdateCurrentUserInfoMutation,
  useCurrentUserInfoQuery,
} = firmAuthApi;
