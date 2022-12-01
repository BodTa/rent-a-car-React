import axios from "../api/axios";
import jwt_decode from "jwt-decode";
import useGeneral from "./useGeneral";
const useRefreshToken = () => {
  const { setAuth } = useGeneral();

  try {
    const refresh = async () => {
      try {
      } catch (error) {}
      const response = await axios.get("/Auth/refresh", {
        withCredentials: true,
      });
      const decodedToken = await jwt_decode(response.data);
      const roles = [].concat(
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
      setAuth((prev) => {
        return {
          ...prev,
          roles: roles,
          email: decodedToken["email"],
          accessToken: response.data,
        };
      });
      return response.data;
    };
    return refresh;
  } catch (error) {
    setAuth();
    localStorage.removeItem("user");
  }
};

export default useRefreshToken;
