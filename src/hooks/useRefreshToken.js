import axios from "../api/axios";
import useGeneral from "./useGeneral";
const useRefreshToken = () => {
  const { setAuth } = useGeneral();

  const refresh = async () => {
    const response = await axios.get("/Auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(`Refresh Token: ${response.data}`);
      return {
        ...prev,
        accessToken: response.data,
      };
    });
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
