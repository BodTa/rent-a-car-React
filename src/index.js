import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Context/AuthProvider";
import { CarsProvider } from "./Context/CarsProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarsProvider>
          <Navbar />
          <App />
        </CarsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
