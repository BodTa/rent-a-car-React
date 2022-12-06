import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 500 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshToken]);

  return axiosPrivate;
};
export default useAxiosPrivate;
