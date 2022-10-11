import React from "react";
import "./Layout.css";
import useAuth from "../../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const auth = useAuth();
  const show = async () => {
    console.log(auth);
  };
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
