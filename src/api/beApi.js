import axios from "axios";
import { AxiosError, RedirectError } from "../utils/Error";

// export default axios.create({
//   baseURL: process.env.REACT_APP_SERVER_BASEURL,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("fintradeToken")}`,
//     "Content-Type": "application/json",
//   },
// });

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASEURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("fintradeToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data = {} } = await refreshToken();
          const { access_token = "" } = data;

          localStorage.setItem("optoAccessToken", access_token);
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;
          return instance(originalRequest);
        } catch (err) {
          // unable to refresh token, redirect user to login
          return Promise.reject(new RedirectError("/login"));
        }
      }

      return Promise.reject(new AxiosError(error));
    }
  );

  return instance;
};

async function refreshToken() {
  try {
    const refresh_token = localStorage.getItem("optoRefreshToken");
    const refreshInstance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_BASEURL,
      headers: {
        "Content-Type": "application/json",
        refresh_token: refresh_token,
      },
    });

    const res = await refreshInstance.post("/auth/refresh");
    return res.data;
  } catch (err) {
    throw err;
  }
}

export default createAxiosInstance();
