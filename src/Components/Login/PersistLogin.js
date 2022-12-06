import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const persist = useLocalStorage("persist", false);
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);
  return <>{!persist ? <Outlet /> : isLoading ? navigate("/") : <Outlet />}</>;
};
export default PersistLogin;
