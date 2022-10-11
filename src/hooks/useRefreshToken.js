import axios from "../api/axios";
import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/auth/refresh-token", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(prev);
      return {
        ...prev,
        email: "123",
        accessToken: response.data,
      };
    });
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
