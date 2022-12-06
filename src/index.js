import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GeneralProvider } from "./Context/GeneralProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.js";
import PersistLogin from "./Components/Login/PersistLogin";
import { OptionsProvider } from "./Context/OptionsProvider";
import { AuthProvider } from "./Context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GeneralProvider>
          <PersistLogin />
          <Navbar />
          <OptionsProvider>
            <App />
          </OptionsProvider>
        </GeneralProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
