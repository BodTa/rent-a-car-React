import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Context/AuthProvider";
import { GeneralProvider } from "./Context/GeneralProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GeneralProvider>
          <Navbar />
          <App />
        </GeneralProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
