import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { toast } from "sonner";
import { logOut, setUser } from "../firmFeatures/firmAuth/firmAuthSlice";

// Basic baseQuery with auth header
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/firm`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

// Enhanced baseQuery with refresh token logic
const baseQueryWithRefreshToken = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);

  if (result.error?.status === 404 || result.error?.status === 403) {
    const errorData = result.error.data;
    const url = typeof arg === "string" ? arg : arg.url || "";

    // Check if the URL matches your change-password endpoint
    if (!url.includes("/auth/change-password")) {
      toast.error(errorData?.message || "Request failed", {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
    }
  }

  if (result.error?.status === 401) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/firm/auth/refresh-token`,
        {
          credentials: "include",
          method: "POST",
        }
      );
      const data = await res.json();
      if (data?.data?.accessToken) {
        const user = api.getState().auth.user;
        api.dispatch(setUser({ user, token: data.data.accessToken }));
        // Retry original request with new token
        result = await baseQuery(arg, api, extraOptions);
      } else {
        api.dispatch(logOut());
        //  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/firm/auth/logout`, {
        //     credentials: 'include',
        //     method: 'POST',
        //   }).catch(console.error);

        await api
          .dispatch(firmBaseApi.endpoints.authLogOut.initiate())
          .unwrap();
      }
    } catch (err) {
      api.dispatch(logOut());
      //  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logout`, {
      //     credentials: 'include',
      //     method: 'POST',
      //   }).catch(console.error);

      await api.dispatch(firmBaseApi.endpoints.authLogOut.initiate()).unwrap();
    }
  }

  return result;
};

// Create the API instance
export const firmBaseApi = createApi({
  reducerPath: "firmBaseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "firmInfo", // for individual firm info queries/mutations
    "all-firms", // for admin-level firm list updates
    "staff", // for individual staff member updates
    "staff-list", // for firm-wide staff list updates
    "partner", // for individual partner member updates
    "lawfirm-certification",
    "license",
    "certificate",
    "media",
    "photo",
    "video",
    "location",
    "firm",
    "certification",
    "city-list",
    "userInfo", // for current user info
    "companyProfile",
  ],
  endpoints: () => ({}),
});
