import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const useLogout = () => {
  const { setAuth, setPersist } = useAuth();
  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("persist");
    setPersist(false);
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
