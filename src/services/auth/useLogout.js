import axios from "../../api/axios";
import useGeneral from "../../hooks/useGeneral";

const useLogout = () => {
  const { setAuth } = useGeneral();
  const logout = async () => {
    setAuth({});
    try {
      const response = await axios("/auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
