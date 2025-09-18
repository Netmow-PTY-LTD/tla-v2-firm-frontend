import { baseApi } from "@/store/baseApi/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),

    authFirmRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register/firm",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),

    authStaffRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register/staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),
    authLogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["userInfo"],
    }),
    authUserInfo: builder.query({
      query: () => ({
        url: "/auth/user/userInfo",
        method: "GET",
      }),
      providesTags: ["userInfo"],
    }),
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),
    forgotPassowrd: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),
    resetPassowrd: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: data,
      }),
    }),
    changeUserAccountStats: builder.mutation({
      query: (payload) => ({
        url: `/auth/users/${payload.userId}/status`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["all-users"],
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    changeEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/change-email",
        method: "POST",
        body: data,
      }),
    }),

    updateUserDefalultPic: builder.mutation({
      query: (data) => ({
        url: `/user/update/default/${data.userId}`,
        method: "PATCH",
        body: data?.data,
      }),
      invalidatesTags: ["lead-list-admin"],
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useAuthFirmRegisterMutation,
  useAuthStaffRegisterMutation,
  useAuthUserInfoQuery,
  useAuthLogOutMutation,
  useUpdateUserDataMutation,
  useChangePasswordMutation,
  useResetPassowrdMutation,
  useForgotPassowrdMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useChangeUserAccountStatsMutation,
  useChangeEmailMutation,
  useVerifyOtpMutation,
  useSendOtpMutation,
  useUpdateUserDefalultPicMutation,
} = authApi;
