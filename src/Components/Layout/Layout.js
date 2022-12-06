import React from "react";
import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const { isDark, setIsDark } = useAuth();
  return (
    <main className={isDark ? "App dark-theme" : "App light-theme"}>
      <Outlet />
    </main>
  );
};

export default Layout;
