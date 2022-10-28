import React from "react";
import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";

const Layout = () => {
  const { isDark, setIsDark } = useGeneral();
  return (
    <main className={isDark ? "App dark-theme" : "App light-theme"}>
      <Outlet />
    </main>
  );
};

export default Layout;
