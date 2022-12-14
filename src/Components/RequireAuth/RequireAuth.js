import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet /> // Email varsa istenilen yere gidicek
  ) : !auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace /> // Yoksa login page'a göndericek state te from ile geri dönüş yapabilicek
  );
};

export default RequireAuth;
