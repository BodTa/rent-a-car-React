import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import Loading from "../Load-Screen/Loading";
import useGeneral from "../../hooks/useGeneral";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useGeneral();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`auth : ${JSON.stringify(auth)}`);
  }, [isLoading]);
  return <>{isLoading ? navigate("/") : <Outlet />}</>;
};
export default PersistLogin;
