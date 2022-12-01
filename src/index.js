import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GeneralProvider } from "./Context/GeneralProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.js";
import PersistLogin from "./Components/Login/PersistLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralProvider>
        <PersistLogin />
        <Navbar />

        <App />
      </GeneralProvider>
    </BrowserRouter>
  </React.StrictMode>
);
